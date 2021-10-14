import { IUser } from "../lib/DataTypes";
import { IUser_Create } from "../lib/DataTypes_Create";
import { IUser_Update } from "../lib/DataTypes_Update";
import { DataType } from "../lib/EnumTypes";

import {
  getSessionId,
  createDbRecord,
  searchDb,
  getDbRecordById,
  updateDbRecord,
  deleteDbRecord,
  doUploadImage,
} from "./Client";
import { compare, hash as hashPassword } from "bcryptjs";
import { getOrganisationById } from "./OrganisationClient";

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
  var createObj = {
    name: {
      firstName: firstName,
      lastName: lastName,
    },
    fullName: firstName + " " + lastName,
    email: [email],
    passwordHash: await hashPassword(String(password), 10),
  };
  return createUser(createObj);
};

/* Do NOT use this method in production, this is only for testing! 
   Creates a User object in the database.
*/
const createUser = async (createObj: IUser_Create) => {
  return createDbRecord<IUser>(DataType.User, createObj);
};

export const getUser = async () => {
  const id = await getSessionId();
  if (!id) {
    throw new Error("No Valid Session Id!");
  }
  return getUserById(id);
};

export const getUserById = async (id: string) => {
  return getDbRecordById<IUser>(DataType.User, id);
};

export const getAllUsers = async () => {
  return searchUsers({});
};

export const getAllTags = async (): Promise<string[]> => {
  return (await getUser()).allTags || [];
};

export const updateUser = async (updateObj: IUser_Update) => {
  const id = await getSessionId();
  if (!id) {
    throw new Error("No Valid Session Id!");
  }
  return updateUserById(id, updateObj);
};

export const updateUserById = async (id: string, updateObj: IUser_Update) => {
  var updateObj_ = updateObj as any;
  if (updateObj.name) {
    updateObj_.fullName = updateObj.name.firstName + " " + updateObj.name.lastName;
  }

  if (updateObj.imageFile){
    // Insert in image upload operation here
    const imageUrl = await updateImageForUser(updateObj.imageFile);
    console.log("Image Url: " + imageUrl);
    
    updateObj_.imageUrl = imageUrl;
    console.log(updateObj);
  }

  delete updateObj_.imageFile;
  return updateDbRecord<IUser>(DataType.User, id, updateObj_);
};

const updateImageForUser = async (imageFile: File) => {
  const imageUrl = await doUploadImage(imageFile);
  return imageUrl;
};

export const updatePasswordForUser = async (currentPassword: string, newPassword: string) => {
  const user = await getUser();
  if ((await compare(currentPassword, user.passwordHash)) !== true) {
    throw new Error("Incorrect current password");
  }
  const id = await getSessionId();
  if (!id) throw new Error("No valid session");
  const newPasswordHash = await hashPassword(String(newPassword), 10);
  return updateDbRecord<IUser>(DataType.User, id, { passwordHash: newPasswordHash });
};

export const updateOrganisationForUser = async (orgId: string) => {
  const org = await getOrganisationById(orgId);
  if (!org) throw new Error("No organisation found");
  return updateUser({ organisation: { _id: orgId, name: org.name, imageUrl: org.imageUrl } });
};

export const removeOrganisationForUser = async () => {
  return updateUser({ organisation: { _id: "delete", name: "" } });
}


export const deleteUser = async () => {
  const id = await getSessionId();
  if (!id) {
    throw new Error("No Valid Session Id!");
  }
  deleteUserById(id);
};

export const deleteUserById = async (id: string) => {
  deleteDbRecord<IUser>(DataType.User, id);
};

export const searchUsers = async (searchObj: Object) => {
  return searchDb<IUser>(DataType.User, searchObj);
};

export const searchUsersByName = async (name: string) => {
  let searchObj = {
    fullName: {
      $regex: name,
      $options: "i",
    },
  };
  return searchUsers(searchObj);
};
