import Layout from "../../components/navLayout/Layout";
import Box from '@material-ui/core/Box';
import ContactsTableCategory, { CategoryButton } from "../../components/tables/contactsTableCategory";
import ContactsTableSort, { SortType } from "../../components/tables/contactsTableSort";
import SearchBar from "../../components/input/SearchBar";
import ContactsTable from "../../components/tables/contactsTable";
import { useEffect, useState } from "react";
import { IContact } from "../../lib/UnifiedDataType";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { getContacts_Manual } from "../../api_client/ContactClient";
import { sortFunctions } from "../contacts";
import { getSession } from 'next-auth/client';
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/PageLoadingBar";

// Get all manual contact data for this user
async function getData(
  setAllContacts: (contacts: IContact[]) => void,
  setDisplayContacts: (contacts: IContact[]) => void,
  setIsLoading: (loading: boolean) => void
) {
  try {
    setIsLoading(true)
    const data = await getContacts_Manual()
    // Set all contacts
    setAllContacts(data)
    // Set all display contacts to just be the full manual contacts list initially
    setDisplayContacts(data)
    setIsLoading(false)
  } catch (error) {
    console.error("Error getting merge page data", error)
    setIsLoading(false)
  }
}


export default function MergePage() {
  const [sortValue, setSortValue] = useState<SortType>(SortType.None)
  const [categoryButton, setCategoryButton] = useState<CategoryButton>("all")
  const [searchValue, setSearchValue] = useState<string>("")
  const [allContacts, setAllContacts] = useState<IContact[]>([])
  const [displayContacts, setDisplayContacts] = useState<IContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Adjust components based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  // Get all manual contact data
  useEffect(() => {
    getData(setAllContacts, setDisplayContacts, setIsLoading)
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

  return (
    <Layout>
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="centre" mx={{ sm: 0, md: 8, lg: 20 }} mt={bigScreen ? 4 : 1} mb={6}>
          {/* Entire table, including filters and tags */}
          <Box boxShadow={3}>
            {/* Tags */}
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
          <Box boxShadow={3} borderRadius={8}>
            {/* List of contacts */}
            <ContactsTable isAddVariant={false} contacts={displayContacts} handleRowButtonClick={handleStarClick} />
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}