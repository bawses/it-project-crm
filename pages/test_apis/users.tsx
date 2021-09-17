import {
  userSignUp,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsersByName,
} from "../../api_client/UserQueries";

export default function TestUserApis() {
  var testSignUp = {};
  var testGet = {};
  var testUpdate = {};

  var user = {
    firstName: "Test",
    lastName: "User",
    email: "test_tony_oop@user.com",
    password: "testing_user",
  };

  async function test() {
    try {
      console.log("Testing sign up");
      testSignUp = await userSignUp(user.firstName, user.lastName, user.email, user.password);
      console.log(testSignUp);

      console.log("Testing get all");
      const users = await getAllUsers();
      console.log(users);

      console.log("Testing get");
      const id = users[users.length - 1]._id || "";
      testGet = await getUserById(id);
      console.log(testGet);

      console.log("Testing update");
      testUpdate = await updateUser(id, {
        name: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
        email: [user.email + "_testSucceeded"],
      });
      console.log(testUpdate);

      console.log("Testing delete");
      await deleteUser(id);
      console.log("Delete success");

      console.log("Testing regex");
      const search = await searchUsersByName("tony");
      console.log(search);

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
