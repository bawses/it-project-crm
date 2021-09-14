import {
  createAddedContact,
  getAllAddedContacts,
  getAddedContactById,
  updateAddedContact,
  deleteAddedContact,
} from "../../api_client/AddedContactQueries";

export default function TestAddedContactApis() {
  var testSignUp = {};
  var testGet = {};
  var testUpdate = {};

  var addedContact = {
    fromUserId: "adlfkjasldfj10394",
    toUserId: "19084759083475hf",
  };

  async function test() {
    try {
      console.log("Testing create");
      testSignUp = await createAddedContact(addedContact);
      console.log(testSignUp);

      console.log("Testing get all");
      const addedContacts = await getAllAddedContacts();
      console.log(addedContacts);

      console.log("Testing get");
      const id = addedContacts[addedContacts.length - 1]._id || "";
      testGet = await getAddedContactById(id);
      console.log(testGet);

      console.log("Testing update");
      addedContact.toUserId = "abcdefghijklmnop";
      testUpdate = await updateAddedContact(id, addedContact);
      console.log(testUpdate);

      console.log("Testing delete");
      await deleteAddedContact, id;
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
