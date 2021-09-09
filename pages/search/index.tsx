import { Box, Typography } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import { getAllManualContacts } from "../../api_client/ManualContactQueries";
import Layout from "../../components/navLayout/Layout";
import ContactsTable from "../../components/tables/contactsTable";
import ContactsTableSort, { SortType } from "../../components/tables/contactsTableSort";
import SearchCreateContactButton from "../../components/tables/SearchCreateContactButton";
import { IManualContact } from '../../lib/DataTypes';

async function getData(setAllContacts: (contacts: IManualContact[]) => void) {
  try {
    const data = await getAllManualContacts()
    if (data) {
      // Save all contacts
      setAllContacts(data as IManualContact[])
    } else {
      console.error("Error: Could not fetch contact data")
    }
  } catch (error) {
    console.error(error)
  }
}

export default function SearchPage() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [contacts, setContacts] = useState<IManualContact[]>([])

  // Get contacts data
  useEffect(() => {
    getData(setContacts)
  }, [])

  function handleNewSortVal(event: ChangeEvent<{ value: unknown }>) {
    setSortValue(event.target.value as SortType)
  }

  return (
    <Layout>
      <Box display="flex" flexDirection="row" justifyContent="centre" mx={{ sm: 0, md: 8, lg: 20 }} mt={5}>
        {/* Entire table, including sort and search results */}
        <Box display="flex" flexDirection="column" mr={2} width="90%">
          <Box fontSize={26}>
            Search results for:
          </Box>
          <Box display="flex" flexDirection="row-reverse" py={2}>
            {/* Sort component */}
            <Box width="50%">
              <ContactsTableSort sortValue={sortValue} handleChange={handleNewSortVal} />
            </Box>
          </Box>
          {/* Search results */}
          <Box boxShadow={3}>
            <ContactsTable contacts={contacts} searchResultVariant={true} />
          </Box>
        </Box>
        <Box mt={18}>
          <SearchCreateContactButton />
        </Box>
      </Box>
    </Layout>
  )
}