import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/navLayout/Layout";
import ContactsTable from "../../components/tables/contactsTable";
import ContactsTableSort, {
  SortType,
} from "../../components/tables/contactsTableSort";
import { sortFunctions } from "../contacts";
import CreateContactButtonLarge from "../../components/buttons/CreateContactButtonLarge";
import PageLoadingBar from "../../components/PageLoadingBar";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { IContact } from "../../lib/UnifiedDataType";
import { addContact_User, searchContactsByName } from "../../api_client/ContactClient";

type IdToContactMap = Record<string, IContact>

// Creates a map of contact ids to the respective contact
function contactListToMap(contactList: IContact[]) {
  const contactMap: IdToContactMap = {};
  for (const contact of contactList) {
    if (contact._id) {
      contactMap[contact._id] = contact;
    }
  }

  return contactMap;
}

// Returns an IdToContactMap of the search results for the given searchName if successful
async function getSearchResults(
  searchName: string,
  setSearchResults: (contacts: IdToContactMap) => void
) {
  try {
    const data = await searchContactsByName(searchName)
    // Save all search results
    setSearchResults(contactListToMap(data));
  } catch (error) {
    console.error("Error: Could not fetch search result data", error);
  }
}

export default function SearchPage() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [searchResults, setSearchResults] = useState<IdToContactMap>({})
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  // Get the search string
  const searchParam = router.query

  // Get contacts data
  useEffect(() => {
    (async () => {
      // Do a global search for the given name and store the results
      if (searchParam.name !== undefined) {
        setIsLoading(true)
        await getSearchResults(searchParam.name as string, setSearchResults)
        setIsLoading(false)
      }
    })()
  }, [searchParam])

  // Sort the contacts table based on changes to the sort value
  const displayData = useMemo(() => {
    if (sortValue !== SortType.None) {
      return [...(Object.values(searchResults))].sort(sortFunctions[sortValue])
    }
    return Object.values(searchResults)
  },
    [searchResults, sortValue]
  )

  function handleNewSortVal(newSortVal: SortType) {
    setSortValue(newSortVal)
  }

  async function handleContactAdd(target: IContact, rowSetter: (isLoading: boolean) => void) {
    try {
      // Set the button on the table row to be loading
      rowSetter(true)

      // Add the new contact
      const newContact = await addContact_User(target._id)
      // Now modify current user id to contact map to reflect the change
      const newMap = { ...searchResults }
      newMap[newContact._id] = newContact
      setSearchResults(newMap)

      // Success. Revert table button state
      rowSetter(false)
      return true
    } catch (error) {
      console.error("Error: Failed to add contact", error)
      return false
    }
  }

  // Adjust components based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/login");
      }
    });
  }, [router]);

  if (isLoading) {
    return <PageLoadingBar />;
  }

  // If no search results are found, display a message
  let displayResultsComponent: JSX.Element = (
    <Box boxShadow={3} borderRadius={8} display="flex" justifyContent="center" py="6%">
      {
        bigScreen ? <Typography variant="h4">No results found...</Typography>
          : <Typography component="p"><strong>No results found...</strong></Typography>
      }
    </Box>
  )

  // Otherwise display the results
  if (Object.keys(searchResults).length > 0) {
    displayResultsComponent = (
      <Box boxShadow={3} borderRadius={8}>
        <ContactsTable
          setLoadingState={setIsLoading}
          contacts={displayData}
          handleAddClick={handleContactAdd}
        />
      </Box>
    )
  }

  return (
    <Layout>
      <Box display="flex" flexDirection="row" justifyContent="centre" mx={{ xs: 1, sm: 2, md: 8, lg: 20 }} mt={{ sm: 1, md: 5 }} mb={6}>
        {/* Entire table, including sort and search results */}
        <Box display="flex" flexDirection="column" mr={bigScreen ? 2 : 0} width="100%">
          {
            bigScreen &&
            <Box fontSize={bigScreen ? 26 : 18} ml={bigScreen ? 0 : 1}>
              Search results for: <strong>{searchParam.name as string}</strong>
            </Box>
          }
          <Box display="flex" py={2}>
            <Box flexGrow={1} flexDirection="column" ml={bigScreen ? 0 : 1}>
              {
                !bigScreen &&
                <>
                  <Typography component="p">Search results for:</Typography>
                  <Typography component="p"><strong>{searchParam.name as string}</strong></Typography>
                </>
              }
            </Box>
            {/* Sort component */}
            <Box flexGrow={1}>
              <ContactsTableSort sortValue={sortValue} handleChange={handleNewSortVal} />
            </Box>
          </Box>
          {/* Search results to display */}
          {displayResultsComponent}
        </Box>
        {bigScreen && <Box mt={18}><CreateContactButtonLarge setLoadingState={setIsLoading} /></Box>}
      </Box>
    </Layout>
  )
}
