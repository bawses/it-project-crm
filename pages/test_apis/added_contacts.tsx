import {
  createAddedContact,
  getAddedContacts,
  getAddedContact,
  updateAddedContact,
  deleteAddedContact,
} from "../../api_client/AddedContactQueries";

export default function TestAddedContactApis() {
  async function test() {
    try {
      let toUserId = "6132318dcdb5a11c5d2e82a7";

      console.log("Testing create");
      let testSignUp = await createAddedContact(toUserId);
      console.log(testSignUp);

      console.log("Testing get all");
      const addedContacts = await getAddedContacts();
      console.log(addedContacts);

      console.log("Testing get");
      let testGet = await getAddedContact(toUserId);
      console.log(testGet);

      let updateObj = {
        notes: "THIS IS THE UPDATED INFO. DANG THIS IS HOT.",
      };
      console.log("Testing update");
      let testUpdate = await updateAddedContact(toUserId, updateObj);
      console.log(testUpdate);

      console.log("Testing delete");
      await deleteAddedContact(toUserId);
      console.log("Delete success");
      console.log("Test success");
    } catch (err) {
      console.error(err);
      console.log("Test failure");
    }
  }

  return (
    <div>
      See console for test
      <button onClick={() => test()}>Test</button>
    </div>
  );
}
