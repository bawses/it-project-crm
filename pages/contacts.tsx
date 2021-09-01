import { useMediaQuery } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ContactsTable from '../components/contactsTable';
import ContactsTableCategory from '../components/contactsTableCategory';
import { ContactsTableRowProps } from '../components/contactsTableRow';
import ContactsTableSort from '../components/contactsTableSort';
import theme from '../src/theme';

const tempContacts: ContactsTableRowProps[] = [
  { name: "John Appleseed", role: "Engineer at F", isStarred: false },
  { name: "Ron Arrowspeed", role: "Store manager at PizzaShack", isStarred: false },
  { name: "Bob", role: "Unemployed", isStarred: true }
]

export default function Contacts() {
  //console.log(useMediaQuery(theme.breakpoints.up("lg")))

  return (
    <Box>
      <Box display="flex" flexDirection="column" justifyContent="centre" mx="10%" my="5%">
        {/* Entire table, including filters and tags */}
        <Box>
          {/* Tags */}
        </Box>
        <Box display="flex">
          {/* Sort and filtering elements */}
          <ContactsTableCategory allIsPressed={true} starredIsPressed={false} archivedIsPressed={false} />
          <ContactsTableSort />
        </Box>
        {/* List of contacts */}
        <ContactsTable contacts={tempContacts} />
      </Box>
    </Box>
  );
}