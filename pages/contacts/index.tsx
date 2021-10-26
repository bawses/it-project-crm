import Box from '@material-ui/core/Box';
import { useEffect, useState } from 'react';
import { OnChangeValue } from 'react-select';
import ContactsTable from '../../components/tables/contactsTable';
import ContactsTableCategory, { CategoryButton } from '../../components/tables/contactsTableCategory';
import ContactsTableSort, { SortType } from '../../components/tables/contactsTableSort';
import ContactsTableTags, { SelectValue } from '../../components/tables/contactsTableTags';
import Layout from "../../components/navLayout/Layout";
import PageLoadingBar from "../../components/PageLoadingBar";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useTheme } from "@material-ui/core/styles";
import { Typography, useMediaQuery } from "@material-ui/core";
import SearchBar from '../../components/input/SearchBar';
import { getContacts, updateContact } from '../../api_client/ContactClient';
import { IContact } from '../../lib/UnifiedDataType';
import ErrorMessage, { AlertSeverity } from '../../components/errors/ErrorMessage';

export const sortFunctions = {
  [SortType.FirstName]: (a: IContact, b: IContact) =>
    a.name.firstName > b.name.firstName ? 1 : -1,
  [SortType.LastName]: (a: IContact, b: IContact) =>
    a.name.lastName > b.name.lastName ? 1 : -1,
  [SortType.Role]: (a: IContact, b: IContact) => {
    if (!a.job) {
      return 1;
    }
    if (!b.job) {
      return -1;
    }
    if (a.job > b.job) {
      return 1;
    }
    return -1;
  },
};

// Swaps the given contact in the given contact list if it can find it, and then returns the list
function swapContactInList(
  contactList: IContact[],
  contact: IContact
) {
  if (contact._id === undefined) {
    return contactList;
  }

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i]._id) {
      if (contactList[i]._id === contact._id) {
        contactList[i] = contact;
        break;
      }
    }
  }

  return contactList;
}

export default function Contacts() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [categoryButton, setCategoryButton] = useState<CategoryButton>("all")
  const [tags, setTags] = useState<OnChangeValue<SelectValue, true>>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [allContacts, setAllContacts] = useState<IContact[]>([])
  const [displayContacts, setDisplayContacts] = useState<IContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [displayError, setDisplayError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [errorTitle, setErrorTitle] = useState<string>()
  const [errorSeverity, setErrorSeverity] = useState<AlertSeverity>()
  const router = useRouter()

  // Adjust components based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  async function getData(setAllContacts: (contacts: IContact[]) => void, setDisplayContacts: (contacts: IContact[]) => void) {
    try {
      setIsLoading(true)
      const data = await getContacts()
      // Save all contacts
      setAllContacts(data)
      // Make the display contacts initially just a copy of all contacts
      setDisplayContacts(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)

      // Display error message
      setErrorMessage(undefined)
      setErrorTitle(undefined)
      setErrorSeverity(undefined)
      setDisplayError(true)

      setIsLoading(false)
    }
  }

  // Get contacts data
  useEffect(() => {
    getData(setAllContacts, setDisplayContacts)
  }, [])

  // Change the displayed list of contacts depending on various filter changes
  useEffect(() => {
    // Starts with all contacts
    let toDisplay = [...allContacts]

    // Remove contacts which are not in the right category
    if (categoryButton !== "all") {
      toDisplay = toDisplay.filter(contact => contact[categoryButton])
    }

    // Remove contacts which do not match the given search value in the local search bar
    // Note that local search is case-insensitive
    if (searchValue !== "") {
      toDisplay = toDisplay.filter((contact) => {
        const fullName = (contact.name.firstName + " " + contact.name.lastName).toLowerCase()
        return fullName.includes(searchValue.toLowerCase())
      })
    }

    // Remove contacts which do not have all selected tags
    for (const tag of tags) {
      toDisplay = toDisplay.filter(contact => (contact.tags && contact.tags.includes(tag.value)))
    }

    // Now sort the contacts based on the chosen sort value
    if (sortValue !== SortType.None) {
      toDisplay.sort(sortFunctions[sortValue])
    }

    setDisplayContacts(toDisplay)
  }, [allContacts, categoryButton, searchValue, tags, sortValue])

  function handleNewSortVal(newSortVal: SortType) {
    setSortValue(newSortVal)
  }

  function handleButtonPress(button: CategoryButton) {
    setCategoryButton(button)
  }

  function handleTagChange(newTags: OnChangeValue<SelectValue, true>) {
    setTags(newTags)
  }

  async function handleStarClick(target: IContact) {
    if (!target._id) {
      return false
    }

    try {
      if (target.starred === undefined) {
        target.starred = true
      } else {
        target.starred = !(target.starred)
      }

      const newContactList = [...allContacts]
      // Optimistically set the state of the starred status to change the star color of the component
      setAllContacts(swapContactInList(newContactList, target))

      const response = await updateContact(target, { starred: target.starred })
      // Now reset the starred based on the actual database response
      setAllContacts(swapContactInList(newContactList, response))
      return true
    } catch (error) {
      console.error("Error updating user starred status", error)

      // Display the error message
      setErrorMessage("Failed to update starred status - Please refresh the page and try again")
      setErrorTitle("Warning")
      setErrorSeverity("warning")
      setDisplayError(true)

      return false
    }
  }

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    getSession().then((session) => {
      if (session && session.user.type == "personal") {
        setIsLoading(false);
      } else if (session) {
        router.replace("/organisations/profile");
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  if (isLoading) {
    return <PageLoadingBar />;
  }

  // If there are no contacts to show, display a message
  let displayContactsComponent: JSX.Element = (
    <Box boxShadow={3} borderRadius={8} display="flex" justifyContent="center" py="6%">
      {
        bigScreen ? <Typography variant="h4">No contacts to display...</Typography>
          : <Typography component="p"><strong>No contacts to display...</strong></Typography>
      }
    </Box>
  )

  // Otherwise show the list of contacts
  if (displayContacts.length > 0) {
    displayContactsComponent = (
      <Box boxShadow={3} borderRadius={8}>
        <ContactsTable
          setLoadingState={setIsLoading}
          contacts={displayContacts}
          handleStarClick={handleStarClick}
        />
      </Box>
    )
  }

  return (
    <Layout>
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="centre" mx={{ xs: 1, sm: 2, md: 8, lg: 20 }} mt={bigScreen ? 4 : 1} mb={6}>
          {/* Entire table, including filters and tags */}
          <Box boxShadow={3}>
            {/* Tags */}
            <ContactsTableTags instanceId="1" handleTagChange={handleTagChange} />
          </Box>
          <Box display="flex" paddingTop={2} paddingBottom={1}>
            {/* Sort and filtering elements */}
            <ContactsTableCategory pressedButton={categoryButton} handleButtonPress={handleButtonPress} />
            <ContactsTableSort sortValue={sortValue} handleChange={handleNewSortVal} />
          </Box>
          <Box>
            {/* Local search bar */}
            <SearchBar value={searchValue} handleChange={setSearchValue} />
          </Box>
          {/* List of contacts */}
          {displayContactsComponent}
        </Box>
      </Box>
      <ErrorMessage
        open={displayError}
        alertMessage={errorMessage}
        alertTitle={errorTitle}
        severity={errorSeverity}
      />
    </Layout>
  );
}
