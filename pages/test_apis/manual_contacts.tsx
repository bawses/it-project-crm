import {
  createManualContact,
  getManualContacts,
  getManualContact,
  updateManualContact,
  updateOrganisationForManualContact,
  removeOrganisationForManualContact,
  deleteManualContact,
  searchManualContactsByName,
} from "../../api_client/ManualContactClient";

export default function TestManualContactApis() {
  async function test() {
    try {
      let manualContact = {
        name: {
          firstName: "Tony Test",
          lastName: "Dang",
        },
        email: ["testest@ManualContact.com"],
      };

      console.log("Testing create");
      let testSignUp = await createManualContact(manualContact);
      console.log(testSignUp);

      console.log("Testing get all");
      const manualContacts = await getManualContacts();
      console.log(manualContacts);

      console.log("Testing get");
      const id = testSignUp._id;
      let testGet = await getManualContact(id);
      console.log(testGet);

      console.log("Testing search");
      const testSearch = await searchManualContactsByName("Dang");
      console.log(testSearch);

      console.log("Testing update");
      let updateObj = {
        name: { firstName: "SOME RANDOM UPDATE", lastName: "Dang" },
        manualOrganisation: "Test Manual Org"
      };
      let testUpdate = await updateManualContact(id, updateObj);
      console.log(testUpdate);

      console.log("Testing update organisation fields");
      testUpdate = await updateOrganisationForManualContact(id, "614c31968a987c85e0003234");
      console.log(testUpdate);
      testUpdate = await removeOrganisationForManualContact(id);
      console.log(testUpdate);

      console.log("Testing delete");
      await deleteManualContact(id);
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
