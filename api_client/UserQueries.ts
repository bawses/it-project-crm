import { DataType, IUser } from "../lib/DataTypes";
import {
  createDbRecord,
  searchDb,
  getDbRecordById,
  updateDbRecord,
  deleteDbRecord,
} from "./Client";
import { hash as hashPassword } from "bcryptjs";

function validateSignUpObject(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): boolean {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return false;
  }
  return true;
}

export const userSignUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  // Don't forget to hash the password!
  if (!validateSignUpObject(firstName, lastName, email, password)) {
    throw Error("Credentials entered are of invalid format!");
  }
  var dataObj: IUser = {
    name: {
      firstName: firstName,
      lastName: lastName,
    },
    email: [email],
    passwordHash: await hashPassword(String(password), 10),
  };
  return createDbRecord<IUser>(DataType.User, dataObj);
};

/* Do NOT use this method in production, this is only for testing! 
   Creates a User object in the database.
*/
export const createUser = async (dataObj: IUser) => {
  return createDbRecord<IUser>(DataType.User, dataObj);
};

export const getAllUsers = async () => {
  return searchDb<IUser>(DataType.User, undefined);
};

export const searchUsers = async (dataObj: IUser) => {
  return searchDb<IUser>(DataType.User, dataObj);
};

export const getUserById = async (id: string) => {
  return getDbRecordById<IUser>(DataType.User, id);
};

export const updateUser = async (id: string, dataObj: IUser) => {
  return updateDbRecord<IUser>(DataType.User, id, dataObj);
};

export const deleteUser = async (id: string) => {
  deleteDbRecord<IUser>(DataType.User, id);
};
