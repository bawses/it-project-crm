import Box from '@material-ui/core/Box';
import { ChangeEvent, useEffect, useState } from 'react';
import { OnChangeValue } from 'react-select';
import ContactsTable from '../components/contactsTable';
import ContactsTableCategory, { CategoryButton } from '../components/contactsTableCategory';
import ContactsTableSort from '../components/contactsTableSort';
import ContactsTableTags, { SelectValue } from '../components/contactsTableTags';
import { IManualContact } from '../components/DataTypes';
import { getAllManualContacts } from '../middleware/ManualContactQueries';
import Layout from "../components/navLayout/Layout";

async function getData(setContacts: (contacts: IManualContact[]) => void) {
  try {
    const data = await getAllManualContacts()
    if (data) {
      setContacts(data as IManualContact[])
    } else {
      console.error("Error: Could not fetch contact data")
    }
  } catch (error) {
    console.error(error)
  }
}

export default function Contacts() {
  const [sortValue, setSortValue] = useState<string>("")
  const [categoryButton, setCategoryButton] = useState<CategoryButton>("all")
  const [tags, setTags] = useState<OnChangeValue<SelectValue, true>>([])
  const [contacts, setContacts] = useState<IManualContact[]>([])

  // Get contacts data
  useEffect(() => {
    getData(setContacts)
  }, [])

  function handleNewSortVal(event: ChangeEvent<{ value: unknown }>) {
    setSortValue(event.target.value as string)
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
            <ContactsTable contacts={contacts} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}