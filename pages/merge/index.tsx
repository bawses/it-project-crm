// Page for mergin manual contacts with existing profiles

import Layout from "../../components/navLayout/Layout";
import Box from '@material-ui/core/Box';
import ContactsTableCategory, { CategoryButton } from "../../components/tables/contactsTableCategory";
import ContactsTableSort, { SortType } from "../../components/tables/contactsTableSort";
import SearchBar from "../../components/input/SearchBar";
import ContactsTable from "../../components/tables/contactsTable";
import { useEffect, useState } from "react";
import { IContact } from "../../lib/UnifiedDataType";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import { addFieldToContact, deleteContact, getContact, getContacts_Manual, updateContact } from "../../api_client/ContactClient";
import { sortFunctions } from "../contacts";
import { getSession } from 'next-auth/client';
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/PageLoadingBar";
import { COLORS } from "../../lib/Colors";
import MergeConfirmation from "../../components/merge/MergeConfirmation";
import ErrorMessage, { AlertSeverity } from '../../components/errors/ErrorMessage';
import { DataType } from "../../lib/EnumTypes";

// Get all manual contact data for this user
async function getData(
  setAllContacts: (contacts: IContact[]) => void,
  setDisplayContacts: (contacts: IContact[]) => void,
  setIsLoading: (loading: boolean) => void,
  userId: string,
  setCurrentUser: (user: IContact) => void,
  setDisplayError: (displayError: boolean) => void,
  setErrorMessage: (message: string | undefined) => void,
  setErrorTitle: (title: string | undefined) => void,
  setErrorSeverity: (severity: AlertSeverity | undefined) => void
) {
  try {
    setIsLoading(true)
    const manualContacts = await getContacts_Manual()
    const user = await getContact(userId, false)
    // Set all contacts
    setAllContacts(manualContacts)
    // Set all display contacts to just be the full manual contacts list initially
    setDisplayContacts(manualContacts)
    // Set the current user profile being merged
    setCurrentUser(user)
    setIsLoading(false)
  } catch (error) {
    console.error("Error getting merge page data", error)
    setErrorMessage(undefined)
    setErrorTitle(undefined)
    setErrorSeverity(undefined)
    setDisplayError(true)
    setIsLoading(false)
  }
}

const useStyles = makeStyles({
  contactName: {
    color: COLORS.primaryBlueDark
  }
});


export default function MergePage() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [categoryButton, setCategoryButton] = useState<CategoryButton>("all")
  const [searchValue, setSearchValue] = useState<string>("")
  const [allContacts, setAllContacts] = useState<IContact[]>([])
  const [displayContacts, setDisplayContacts] = useState<IContact[]>([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedManualContact, setSelectedManualContact] = useState<IContact>()
  const [selectedUser, setSelectedUser] = useState<IContact>()
  const [isLoading, setIsLoading] = useState(true)
  const [displayError, setDisplayError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [errorTitle, setErrorTitle] = useState<string>()
  const [errorSeverity, setErrorSeverity] = useState<AlertSeverity>()

  const router = useRouter()
  const classes = useStyles()

  // Adjust components based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  // Get the user ID
  const userId = router.query.userid as string

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    getSession().then((session) => {
      if (session && session.user.type == DataType.User) {
        setIsLoading(false);
      } else if (session) {
        router.replace("/organisations/profile");
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  // Get all manual contact data, as well as information for the current selected user profile
  useEffect(() => {
    if (userId) {
      getData(
        setAllContacts,
        setDisplayContacts,
        setIsLoading,
        userId,
        setSelectedUser,
        setDisplayError,
        setErrorMessage,
        setErrorTitle,
        setErrorSeverity
      )
    }
  }, [userId])

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

    // Now sort the contacts based on the chosen sort value
    if (sortValue !== SortType.None) {
      toDisplay.sort(sortFunctions[sortValue])
    }

    setDisplayContacts(toDisplay)
  }, [allContacts, categoryButton, searchValue, sortValue])

  // If the page is loading, display the loading bar
  if (isLoading) {
    return <PageLoadingBar />;
  }

  function handleNewSortVal(newSortVal: SortType) {
    setSortValue(newSortVal)
  }

  function handleButtonPress(button: CategoryButton) {
    setCategoryButton(button)
  }

  // Handles what happens when the Select button on a table row is pressed. Opens the merge popup
  function handleSelectButtonPress(manualContact: IContact) {
    setPopupOpen(true)
    setSelectedManualContact(manualContact)
  }

  // Handles what happens when the merge confirmation button is pressed on the merge popup
  async function handleMergeButtonPress() {
    // Migrate information over
    let notes = ""
    if (selectedUser && selectedManualContact) {
      // Migrate notes over
      if (selectedUser.notes) {
        notes += selectedUser.notes + "\n"
      }

      if (selectedManualContact.notes) {
        notes += selectedManualContact.notes
      }

      // Migrate tags over
      const tags: string[] = []
      if (selectedManualContact.tags !== undefined) {
        if (selectedUser.tags !== undefined) {
          tags.push(...selectedUser.tags, ...selectedManualContact.tags)
        } else {
          tags.push(...selectedManualContact.tags)
        }
      }

      try {
        setIsLoading(true)
        await Promise.all([
          // Update the notes
          updateContact(selectedUser, { notes: notes }),
          // Update the user tags
          addFieldToContact(selectedUser, { tags: tags }),
          // Now delete the manual contact
          deleteContact(selectedManualContact)
        ])

        // Redirect to the new merged profile
        router.push("/contacts/" + selectedUser._id)
      } catch (error) {
        console.error("Error merging profile", error)
        setErrorMessage("Could not merge profile - Please refresh the page and try again")
        setErrorTitle("Warning")
        setErrorSeverity("warning")
        setDisplayError(true)
        setIsLoading(false)
      }
    }

    setPopupOpen(false)
  }

  // If there are no manual contacts to show, display a message
  let displayContactsComponent: JSX.Element = (
    <Box boxShadow={3} borderRadius={8} display="flex" justifyContent="center" py="6%">
      {
        bigScreen ? <Typography variant="h4">No manual contacts found...</Typography>
          : <Typography component="p"><strong>No manual contacts found...</strong></Typography>
      }
    </Box>
  )

  // Otherwise show the list of manual contacts
  if (displayContacts.length > 0) {
    displayContactsComponent = (
      <Box boxShadow={3} borderRadius={8}>
        <ContactsTable
          setLoadingState={setIsLoading}
          contacts={displayContacts}
          handleSelectClick={handleSelectButtonPress}
        />
        <MergeConfirmation
          open={popupOpen}
          setOpen={setPopupOpen}
          manualContact={selectedManualContact}
          handleMergeButtonPress={handleMergeButtonPress}
        />
      </Box>
    )
  }

  return (
    <Layout>
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="centre" mx={{ xs: 1, sm: 2, md: 8, lg: 20 }} mt={bigScreen ? 4 : 1} mb={6}>
          {/* Entire table, including filters and tags */}
          <Box>
            {/* Instructions */}
            {bigScreen
              ?
              <Typography variant="h4">
                <strong>Select one of these contact entries </strong>
                to merge with the CataLog profile of:
                <strong className={classes.contactName}> {selectedUser?.fullName}</strong>
              </Typography>
              :
              <>
                <Typography component="p">
                  <strong>Select</strong> the entry to merge with:
                </Typography>
                <Typography>
                  <strong className={classes.contactName}> {selectedUser?.fullName}</strong>
                </Typography>
              </>
            }
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
        handleClose={() => setDisplayError(false)}
      />
    </Layout>
  )
}