import {
  createManualContact,
  getAllManualContacts,
  getManualContactById,
  updateManualContact,
  deleteManualContact,
} from "../../api_client/ManualContactQueries";

export default function TestManualContactApis() {
  var testSignUp = {};
  var testGet = {};
  var testUpdate = {};

  var manualContact = {
    ownerId: "09813h4ajdhohadfa",
    name: {
      firstName: "Test",
      lastName: "ManualContact",
    },
    email: ["test_tony_oop@ManualContact.com"],
  };

  async function test() {
    try {
      console.log("Testing create");
      testSignUp = await createManualContact(manualContact);
      console.log(testSignUp);

      console.log("Testing get all");
      const manualContacts = await getAllManualContacts();
      console.log(manualContacts);

      console.log("Testing get");
      const id = manualContacts[manualContacts.length - 1]._id || "";
      testGet = await getManualContactById(id);
      console.log(testGet);

      console.log("Testing update");
      manualContact.name.firstName = "Tony";
      testUpdate = await updateManualContact(id, manualContact);
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
