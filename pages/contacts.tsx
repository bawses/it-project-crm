import Box from "@material-ui/core/Box";
import { ChangeEvent, useState } from "react";
import { OnChangeValue } from "react-select";
import ContactsTable from "../components/contactsTable";
import ContactsTableCategory, { CategoryButton } from "../components/contactsTableCategory";
import { ContactsTableRowProps } from "../components/contactsTableRow";
import ContactsTableSort from "../components/contactsTableSort";
import ContactsTableTags, { SelectValue } from "../components/contactsTableTags";

const tempContacts: ContactsTableRowProps[] = [
  { name: "John Appleseed", role: "Engineer at F", isStarred: false },
  { name: "Ron Arrowspeed", role: "Store manager at PizzaShack", isStarred: false },
  { name: "Bob", role: "Unemployed", isStarred: true },
];

export default function Contacts() {
  const [sortValue, setSortValue] = useState<string>("");
  const [categoryButton, setCategoryButton] = useState<CategoryButton>("all");
  const [tags, setTags] = useState<OnChangeValue<SelectValue, true>>([]);

  function handleNewSortVal(event: ChangeEvent<{ value: unknown }>) {
    setSortValue(event.target.value as string);
  }

  function handleButtonPress(button: CategoryButton) {
    setCategoryButton(button);
  }

  function handleTagChange(newTags: OnChangeValue<SelectValue, true>) {
    setTags(newTags);
  }

  return (
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
          <ContactsTable contacts={tempContacts} />
        </Box>
      </Box>
    </Box>
  );
}
