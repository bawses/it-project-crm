import Box from '@material-ui/core/Box';
import { ChangeEvent, useEffect, useState } from 'react';
import { OnChangeValue } from 'react-select';
import ContactsTable from '../../components/tables/contactsTable';
import ContactsTableCategory, { CategoryButton } from '../../components/tables/contactsTableCategory';
import ContactsTableSort, { SortType } from '../../components/tables/contactsTableSort';
import ContactsTableTags, { SelectValue } from '../../components/tables/contactsTableTags';
import { IManualContact } from '../../components/DataTypes';
import { getAllManualContacts } from '../../middleware/ManualContactQueries';
import Layout from "../../components/navLayout/Layout";

async function getData(setAllContacts: (contacts: IManualContact[]) => void, setDisplayContacts: (contacts: IManualContact[]) => void) {
  try {
    const data = await getAllManualContacts()
    if (data) {
      // Save all contacts
      setAllContacts(data as IManualContact[])
      // Make the display contacts initially just a copy of all contacts
      setDisplayContacts([...data] as IManualContact[])
    } else {
      console.error("Error: Could not fetch contact data")
    }
  } catch (error) {
    console.error(error)
  }
}

const sortFunctions = {
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

export default function Contacts() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [categoryButton, setCategoryButton] = useState<CategoryButton>("all")
  const [tags, setTags] = useState<OnChangeValue<SelectValue, true>>([])
  const [allContacts, setAllContacts] = useState<IManualContact[]>([])
  const [displayContacts, setDisplayContacts] = useState<IManualContact[]>([])

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

  function handleNewSortVal(event: ChangeEvent<{ value: unknown }>) {
    setSortValue(event.target.value as SortType)
  }

  function handleButtonPress(button: CategoryButton) {
    setCategoryButton(button)
  }

  function handleTagChange(newTags: OnChangeValue<SelectValue, true>) {
    setTags(newTags)
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
            <ContactsTable contacts={displayContacts} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}