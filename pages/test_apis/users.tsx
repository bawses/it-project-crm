import {
	userSignUp,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	searchUsersByName,
} from "../../api_client/UserQueries";
import { DataType, IUser } from "../../lib/DataTypes";
import { RequestType } from "../../lib/DataTypes";

export default function TestUserApis() {
	var testGet = {};
	var testUpdate = {};

	var user = {
		firstName: "Test",
		lastName: "User",
		email: "test_tony_oop24@user.com",
		password: "testing_user",
	};

	async function test() {
		try {
			console.log("Testing sign up");
			const testSignUp: IUser = await userSignUp(
				user.firstName,
				user.lastName,
				user.email,
				user.password
			);
			console.log(testSignUp);
			console.log(
				"------------------------------------------------------------------"
			);

			const id = testSignUp._id || "";

			console.log("Testing get all");
			const users = await getAllUsers();
			console.log(users);
			console.log(
				"------------------------------------------------------------------"
			);
			console.log("Testing global fetch on users");
			const usersGlobal = await searchUsersByName("Dang");
			console.log(usersGlobal);
			console.log(
				"------------------------------------------------------------------"
			);
			console.log("Testing get");

			testGet = await getUserById(id);
			console.log(testGet);
			console.log(
				"------------------------------------------------------------------"
			);

			console.log("Testing update");
			testUpdate = await updateUser(id, {
				name: {
					firstName: user.firstName,
					lastName: user.lastName,
				},
				email: [user.email + "_testSucceeded"],
			});
			console.log(testUpdate);
			console.log(
				"------------------------------------------------------------------"
			);

			console.log("Testing delete");
			await deleteUser(id);
			console.log("Delete success");
			console.log(
				"------------------------------------------------------------------"
			);

			console.log("Testing regex");
			const search = await searchUsersByName("tony");
			console.log(search);
			console.log(
				"------------------------------------------------------------------"
			);

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
