import {
  createContact_Manual,
  addContact_User,
  getContact,
  updateContact,
  deleteContact,
  getContacts,
  toggleStarContact,
  toggleArchiveContact,
  searchContactsByName,
  addTagToContact,
  removeTagFromContact,
} from "../../api_client/ContactClient";
import { getAllTags } from "../../api_client/UserClient";

export default function TestContactApis() {
  async function test() {
    try {
      let mContact = {
        name: {
          firstName: "Tony Test",
          lastName: "Dang",
        },
        email: ["test_tony_oop@ManualContact.com"],
      };

      console.log("Testing create manual contact");
      let manualContact = await createContact_Manual(mContact);
      console.log(manualContact);

      const id: string = "614c7d7ce45a3d36b09a6a5a";
      console.log("Testing add user contact");
      let addedUser = await addContact_User(id);
      console.log(addedUser);

      console.log("Testing get all contacts");
      let contacts = await getContacts();
      console.log(contacts);

      console.log("Testing get added user");
      addedUser = await getContact(id, false);
      console.log(addedUser);

      console.log("Testing update added user");
      addedUser = await updateContact(addedUser, {
        notes: "THIS IS UPDATED KABOOP",
      });
      console.log(addedUser);

      console.log("Testing star added user");
      addedUser = await toggleStarContact(addedUser);
      console.log(addedUser);
      addedUser = await toggleStarContact(addedUser);
      console.log(addedUser);

      console.log("Testing archive manual contact");
      manualContact = await toggleArchiveContact(manualContact);
      console.log(manualContact);
      manualContact = await toggleArchiveContact(manualContact);
      console.log(manualContact);

      console.log("Testing search contacts");
      let searchResult = await searchContactsByName("Dang");
      console.log(searchResult);

      console.log("Testing tags");
      let allTags;
      manualContact = await addTagToContact(manualContact, "TEST TAG");
      console.log(manualContact);
      allTags = await getAllTags();
      console.assert(allTags.length > 0);
      addedUser = await addTagToContact(addedUser, "TEST TAG");
      console.log(addedUser);
      allTags = await getAllTags();
      console.assert(allTags.length > 0);
      manualContact = await removeTagFromContact(manualContact, "TEST TAG");
      console.log(manualContact);
      allTags = await getAllTags();
      console.assert(allTags.length > 0);
      addedUser = await removeTagFromContact(addedUser, "TEST TAG");
      console.log(addedUser);
      allTags = await getAllTags();
      console.assert(allTags.length === 0);

      console.log("Testing delete");
      await deleteContact(manualContact);
      await deleteContact(addedUser);
      console.log("Delete success");

      console.log(await getAllTags());

      console.log("Test success");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      See console for test
      <button onClick={() => test()}>Test</button>
    </div>
  );
}
