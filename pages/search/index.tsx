import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { getAllManualContacts } from "../../api_client/ManualContactQueries";
import Layout from "../../components/navLayout/Layout";
import ContactsTable from "../../components/tables/contactsTable";
import ContactsTableSort, { SortType } from "../../components/tables/contactsTableSort";
import CreateContactButtonLarge from "../../components/tables/CreateContactButtonLarge";
import CreateContactButtonSmall from "../../components/tables/CreateContactButtonSmall";
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

  // Adjust components based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <Layout>
      <Box display="flex" flexDirection="row" justifyContent="centre" mx={{ sm: 0, md: 8, lg: 20 }} mt={5}>
        {/* Entire table, including sort and search results */}
        <Box display="flex" flexDirection="column" mr={bigScreen ? 2 : 0} width="100%">
          <Box fontSize={bigScreen ? 26 : 18} ml={bigScreen ? 0 : 1}>
            Search results for:
          </Box>
          <Box display="flex" py={2}>
            <Box flexGrow={1} ml={bigScreen ? 0 : 1}>
              {!bigScreen && <CreateContactButtonSmall />}
            </Box>
            {/* Sort component */}
            <Box flexGrow={1}>
              <ContactsTableSort sortValue={sortValue} handleChange={handleNewSortVal} />
            </Box>
          </Box>
          {/* Search results */}
          <Box boxShadow={3}>
            <ContactsTable contacts={contacts} searchResultVariant={true} />
          </Box>
        </Box>
        {bigScreen && <Box mt={18}><CreateContactButtonLarge /></Box>}
      </Box>
    </Layout>
  )
}