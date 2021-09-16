import { Box, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getAllManualContacts } from "../../api_client/ManualContactQueries";
import Layout from "../../components/navLayout/Layout";
import ContactsTable, { IdToContactMap } from "../../components/tables/contactsTable";
import ContactsTableSort, { SortType } from "../../components/tables/contactsTableSort";
import { sortFunctions } from "../contacts";
import CreateContactButtonLarge from "../../components/buttons/CreateContactButtonLarge";
import CreateContactButtonSmall from "../../components/buttons/CreateContactButtonSmall";
import { IManualContact } from '../../lib/DataTypes';
import PageLoadingBar from "../../components/pageLoadingBar";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

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
    // Save all search results
    setSearchResults(data)
  } catch (error) {
    console.error("Error: Could not fetch search result data", error)
  }
}

async function getAddedContacts(setAddedContacts: (contacts: IdToContactMap) => void) {
  try {
    const data = await getAllManualContacts()
    // Save all added contacts as a map to their respective ids
    setAddedContacts(contactListToMap(data))
  } catch (error) {
    console.error("Error: Could not fetch contact data", error)
  }
}

export default function SearchPage() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [searchResults, setSearchResults] = useState<IManualContact[]>([])
  const [addedContacts, setAddedContacts] = useState<IdToContactMap>({})
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  // Get contacts data
  useEffect(() => {
    setIsLoading(true)
    // Placeholder for search results
    getSearchResults(setSearchResults)

    // Get contacts already added
    getAddedContacts(setAddedContacts)
    setIsLoading(false)
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

  function handleNewSortVal(newSortVal: SortType) {
    setSortValue(newSortVal)
  }

  async function handleContactAdd(target: IManualContact) {
    if (target._id) {
      //TODO: Send add request
      // Database request code here

      const newMap = { ...addedContacts }
      newMap[target._id] = target
      setAddedContacts(newMap)

      return true
    }

    return false
  }

  // Adjust components based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

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
            <ContactsTable contacts={displayData} handleRowButtonClick={handleContactAdd} idToContactMap={addedContacts} />
          </Box>
        </Box>
        {bigScreen && <Box mt={18}><CreateContactButtonLarge /></Box>}
      </Box>
    </Layout>
  )
}