import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getAllManualContacts } from "../../api_client/ManualContactQueries";
import { updateUser } from "../../api_client/UserQueries";
import Layout from "../../components/navLayout/Layout";
import ContactsTable, { IdToContactMap } from "../../components/tables/contactsTable";
import ContactsTableSort, { SortType } from "../../components/tables/contactsTableSort";
import CreateContactButtonLarge from "../../components/tables/CreateContactButtonLarge";
import CreateContactButtonSmall from "../../components/tables/CreateContactButtonSmall";
import { IManualContact, IUser } from '../../lib/DataTypes';
import { sortFunctions } from "../contacts/contacts";

// Creates a map of contact ids to the respective contact
function contactListToMap(contactList: IManualContact[]) {
  const contactMap: IdToContactMap = {}
  for (const contact of contactList) {
    if (contact._id) {
      contactMap[contact._id] = contact
    }
  }

  return contactMap
}

async function getSearchResults(setSearchResults: (contacts: IManualContact[]) => void) {
  try {
    const data = await getAllManualContacts()
    if (data) {
      // Save all search results
      setSearchResults(data as IManualContact[])
    } else {
      console.error("Error: Could not fetch search result data")
    }
  } catch (error) {
    console.error(error)
  }
}

async function getAddedContacts(setAddedContacts: (contacts: IdToContactMap) => void) {
  try {
    const data = await getAllManualContacts()
    if (data) {
      // Save all added contacts as a map to their respective ids
      setAddedContacts(contactListToMap(data as IManualContact[]))
    } else {
      console.error("Error: Could not fetch contact data")
    }
  } catch (error) {
    console.error(error)
  }
}

async function handleAdd(target: IManualContact) {
  return true
}

export default function SearchPage() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [searchResults, setSearchResults] = useState<IManualContact[]>([])
  const [addedContacts, setAddedContacts] = useState<IdToContactMap>({})

  // Get contacts data
  useEffect(() => {
    // Placeholder for search results
    getSearchResults(setSearchResults)

    // Get contacts already added
    getAddedContacts(setAddedContacts)
  }, [])

  // Sort the contacts table based on changes to the sort value
  const displayData = useMemo(() => {
    if (sortValue !== SortType.None) {
      return [...searchResults].sort(sortFunctions[sortValue])
    }
    return searchResults
  },
    [searchResults, sortValue]
  )

  function handleNewSortVal(event: ChangeEvent<{ value: unknown }>) {
    setSortValue(event.target.value as SortType)
  }

  function handleContactAdd(target: IManualContact) {
    if (target._id) {
      const newMap = { ...addedContacts }
      newMap[target._id] = target
      setAddedContacts(newMap)
    }
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
            <ContactsTable contacts={displayData} handleRowButtonClick={handleAdd} idToContactMap={addedContacts} />
          </Box>
        </Box>
        {bigScreen && <Box mt={18}><CreateContactButtonLarge /></Box>}
      </Box>
    </Layout>
  )
}