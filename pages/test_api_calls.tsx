import {
  userSignUp,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../api_client/UserQueries";
import { IManualContact, IUser } from "../lib/DataTypes";

export default async function TestApiCalls() {
  const user = {
    firstName: "Test",
    lastName: "User",
    email: "testtttttt@user.com",
    password: "testing_user",
  };

  var testSignUp = {};
  var testGet = {};
  var testUpdate = {};
  var testDelete = {};

  try {
    testSignUp = await userSignUp(user.firstName, user.lastName, user.email, user.password);
    const users: IUser[] = await getAllUsers();
    const id = users[0]._id || "";
    testGet = await getUserById(id);
    testUpdate = await updateUser(id, {
      name: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      email: [user.email + "_testSucceeded"],
    });
    testDelete = await deleteUser(id);
  } catch (err) {
    console.error(err);
  }

  console.log("Testing sign up");
  console.log(testSignUp);
  console.log("Testing get");
  console.log(testGet);
  console.log("Testing update");
  console.log(testUpdate);
  console.log("Testing delete");
  console.log(testDelete);

  return (
    <div>
      See console for tests
    </div>
  );
}
