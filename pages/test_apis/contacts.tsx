import {
  createContact_Manual,
  addContact_User,
  getContact,
  updateContact,
  deleteContact,
  getContacts,
  starContact,
  archiveContact,
  searchContactsByName,
} from "../../api_client/ContactClient";

export default function TestContactApis() {
  async function test() {
    try {
      let manualContact = {
        name: {
          firstName: "Tony Test",
          lastName: "Dang",
        },
        email: ["test_tony_oop@ManualContact.com"],
      };

      console.log("Testing create manual contact");
      let testCreateManual = await createContact_Manual(manualContact);
      console.log(testCreateManual);

      const id: string = "614c7d7ce45a3d36b09a6a5a";
      console.log("Testing add user contact");
      let testAddContact = await addContact_User(id);
      console.log(testAddContact);

      console.log("Testing get all contacts");
      const contacts = await getContacts();
      console.log(contacts);

      console.log("Testing get added user");
      let testGetAddedUser = await getContact(id, false);
      console.log(testGetAddedUser);

      console.log("Testing update added user");
      let testUpdateAddedUser = await updateContact(id, false, {
        notes: "THIS IS UPDATED KABOOP",
      });
      console.log(testUpdateAddedUser);

      console.log("Testing star added user");
      let testStarredAddedUser = await starContact(testUpdateAddedUser);
      console.log(testStarredAddedUser);

      console.log("Testing search contacts");
      const testSearch = await searchContactsByName("Dang");
      console.log(testSearch);

      console.log("Testing delete");
      await deleteContact(id, false);
      await deleteContact(testCreateManual._id, true);
      console.log("Delete success");

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