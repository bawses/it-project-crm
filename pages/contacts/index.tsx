import Box from '@material-ui/core/Box';
import { ChangeEvent, useEffect, useState } from 'react';
import { OnChangeValue } from 'react-select';
import ContactsTable from '../../components/tables/contactsTable';
import ContactsTableCategory, { CategoryButton } from '../../components/tables/contactsTableCategory';
import ContactsTableSort, { SortType } from '../../components/tables/contactsTableSort';
import ContactsTableTags, { SelectValue } from '../../components/tables/contactsTableTags';
import { IManualContact } from '../../lib/DataTypes';
import { getAllManualContacts, updateManualContact } from '../../api_client/ManualContactQueries';
import Layout from "../../components/navLayout/Layout";
import PageLoadingBar from "../../components/PageLoadingBar";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { Session, User as authUser} from "next-auth";

export const sortFunctions = {
  [SortType.FirstName]: (a: IManualContact, b: IManualContact) => (a.name.firstName > b.name.firstName) ? 1 : -1,
  [SortType.LastName]: (a: IManualContact, b: IManualContact) => (a.name.lastName > b.name.lastName) ? 1 : -1,
  [SortType.Role]: (a: IManualContact, b: IManualContact) => {
    if (!a.job) {
      return 1
    }
    if (!b.job) {
      return -1
    }
    if (a.job > b.job) {
      return 1
    }
    return -1
  }
}

// Swaps the given contact in the given contact list if it can find it, and then returns the list
function swapContactInList(contactList: IManualContact[], contact: IManualContact) {
  console.log("starting list", contactList)
  if (contact._id === undefined) {
    return contactList
  }

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i]._id) {
      if (contactList[i]._id === contact._id) {
        contactList[i] = contact
        console.log("Swapped element", contact)
        break
      }
    }
  }

  console.log("Final element")
  return contactList
}

export default function Contacts() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [categoryButton, setCategoryButton] = useState<CategoryButton>("all")
  const [tags, setTags] = useState<OnChangeValue<SelectValue, true>>([])
  const [allContacts, setAllContacts] = useState<IManualContact[]>([])
  const [displayContacts, setDisplayContacts] = useState<IManualContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  async function getData(setAllContacts: (contacts: IManualContact[]) => void, setDisplayContacts: (contacts: IManualContact[]) => void) {
    try {
      setIsLoading(true)
      // Get session which contains the user's Id
      const session : Session = await getSession();
      console.log(session)
      let userId : string = session?.user.sub; // accesses the userId
      let data;
      if (userId){
        data = await getAllManualContacts();
        console.log(data);
      }
      else{
        throw new Error("Invalid Request. No User Session!")
      }
      // Save all contacts
      setAllContacts(data)
      // Make the display contacts initially just a copy of all contacts
      setDisplayContacts(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
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

    // Remove contacts which do not have all selected tags
    for (const tag of tags) {
      toDisplay = toDisplay.filter(contact => (contact.tags && contact.tags.includes(tag.value)))
    }

    // Now sort the contacts based on the chosen sort value
    if (sortValue !== SortType.None) {
      toDisplay.sort(sortFunctions[sortValue])
    }

    setDisplayContacts(toDisplay)
  }, [allContacts, categoryButton, tags, sortValue])

  function handleNewSortVal(newSortVal: SortType) {
    setSortValue(newSortVal)
  }

  function handleButtonPress(button: CategoryButton) {
    setCategoryButton(button)
  }

  function handleTagChange(newTags: OnChangeValue<SelectValue, true>) {
    setTags(newTags)
  }

  async function handleStarClick(target: IManualContact) {
    if (!target._id) {
      return false
    }

    try {
      if (target.starred === undefined) {
        target.starred = true
      } else {
        target.starred = !(target.starred)
      }

      const response = await updateManualContact(target._id, target)
      const newContactList = [...allContacts]
      setAllContacts(swapContactInList(newContactList, response))
      return true
    } catch (error) {
      console.error("Error updating user starred status", error)
      return false
    }
  }

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  if (isLoading) {
    return <PageLoadingBar />;
  }

  return (
    <Layout>
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="centre" mx={{ sm: 0, md: 8, lg: 20 }} mt={5}>
          {/* Entire table, including filters and tags */}
          <Box boxShadow={3}>
            {/* Tags */}
            <ContactsTableTags instanceId="1" handleTagChange={handleTagChange} />
          </Box>
          <Box display="flex" py={2}>
            {/* Sort and filtering elements */}
            <ContactsTableCategory pressedButton={categoryButton} handleButtonPress={handleButtonPress} />
            <ContactsTableSort sortValue={sortValue} handleChange={handleNewSortVal} />
          </Box>
          <Box boxShadow={3}>
            {/* List of contacts */}
            <ContactsTable contacts={displayContacts} handleRowButtonClick={handleStarClick} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}