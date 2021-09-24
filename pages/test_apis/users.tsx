import {
  userSignUp,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUsersByName,
} from "../../api_client/UserQueries";

export default function TestUserApis() {
  async function test() {
    try {
      let user = {
        firstName: "Tony",
        lastName: "Dang",
        email: "test_tony_oop24@user.com",
        password: "testing_user",
      };

      console.log("Testing sign up create call");
      const testSignUp = await userSignUp(user.firstName, user.lastName, user.email, user.password);
      console.log(testSignUp);

      console.log("--------------------------");
      let id = testSignUp._id;
      console.log("Testing get all");
      let users = await getUsers();
      console.log(users);

      console.log("--------------------------");
      console.log("Testing search");
      let testSearch = await searchUsersByName("Dang");
      console.log(testSearch);

      console.log("--------------------------");
      console.log("Testing get");
      let testGet = await getUserById(id);
      console.log(testGet);
      console.log("--------------------------");

      console.log("Testing update");
      let testUpdate = await updateUserById(id, {
        email: ["_THIS IS UPDATED INFO. WOOO"],
      });
      console.log(testUpdate);
      console.log("--------------------------");

      console.log("Testing delete");
      await deleteUserById(id);
      console.log("Delete success");
      console.log("--------------------------");

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
