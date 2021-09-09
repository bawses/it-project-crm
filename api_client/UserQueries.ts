import { DataType, IUser } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";
import { hash as hashPassword } from "bcryptjs";

function validateCreateObject(dataObj: IUser) : boolean{
  let {email, passwordHash} = dataObj;
  let emailString = email[0];
  console.log("----------")
  console.log(emailString);
  console.log(passwordHash);
  console.log("----------")

  if (!emailString || !emailString.includes("@") || !passwordHash || passwordHash.trim().length < 7) {
    return false;
  }
  return true;
}

export const createUser = async (dataObj: IUser) => {
  // Don't forget to hash the password!
  if (!validateCreateObject(dataObj)){
    return new Error("Credentials entered in invalid format!");
  }
  var hashedPassword, response;
  hashedPassword = await hashPassword(String(dataObj.passwordHash), 10)
  dataObj.passwordHash = hashedPassword;  
  console.log("Data after hashing password!");
  console.log(dataObj);


  console.log("Creating DbRecord and returning response...")
  response = await createDbRecord(DataType.User, dataObj);
  console.log("In create user!")

  return response;
};

export const getAllUsers = () => {
  return searchDb(DataType.User, undefined);
};

export const searchUsers = (dataObj: IUser) => {
  return searchDb(DataType.User, dataObj);
};

export const getUserById = (id: string) => {
  return getDbRecordById(DataType.User, id);
};

export const updateUser = (id: string, dataObj: IUser) => {
  return updateDbRecord(DataType.User, id, dataObj);
};

export const deleteUser = (id: string) => {
  return deleteDbRecord(DataType.User, id);
};
