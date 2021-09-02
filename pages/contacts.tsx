import Box from '@material-ui/core/Box';
import ContactsTable from '../components/contactsTable';
import ContactsTableCategory from '../components/contactsTableCategory';
import { ContactsTableRowProps } from '../components/contactsTableRow';
import ContactsTableSort from '../components/contactsTableSort';
import ContactsTableTags from '../components/contactsTableTags';

const tempContacts: ContactsTableRowProps[] = [
  { name: "John Appleseed", role: "Engineer at F", isStarred: false },
  { name: "Ron Arrowspeed", role: "Store manager at PizzaShack", isStarred: false },
  { name: "Bob", role: "Unemployed", isStarred: true }
]

export default function Contacts() {
  return (
    <Box>
      <Box display="flex" flexDirection="column" justifyContent="centre" mx={{ sm: 0, md: 8, lg: 20 }} mt={5}>
        {/* Entire table, including filters and tags */}
        <Box boxShadow={3}>
          {/* Tags */}
          <ContactsTableTags />
        </Box>
        <Box display="flex" py={2}>
          {/* Sort and filtering elements */}
          <ContactsTableCategory allIsPressed={true} starredIsPressed={false} archivedIsPressed={false} />
          <ContactsTableSort />
        </Box>
        <Box boxShadow={3}>
          {/* List of contacts */}
          <ContactsTable contacts={tempContacts} />
        </Box>
      </Box>
    </Box>
  );
}