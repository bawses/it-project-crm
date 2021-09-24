import { IAddedContact } from "../lib/DataTypes_Get";
import { IAddedContact_Create } from "../lib/DataTypes_Create";
import { IAddedContact_Update } from "../lib/DataTypes_Update";
import { DataType } from "../lib/EnumTypes";
import {
  createDbRecord,
  searchDb,
  getDbRecordById,
  updateDbRecord,
  deleteDbRecord,
  getSessionId,
} from "./Client";

export const createAddedContact = async (toUserId: string) => {
  const authId = await getSessionId();
  if (!authId) {
    throw new Error("No Valid Session Id!");
  }
  let createObj = {
    fromUserId: authId,
    toUserId: toUserId,
    archived: false,
    starred: false,
  };
  return createDbRecord<IAddedContact>(DataType.AddedContact, createObj);
};

export const getAddedContacts = async () => {
  return searchDb<IAddedContact>(DataType.AddedContact, {});
};

export const searchAddedContacts = async (searchObj: Object) => {
  return searchDb<IAddedContact>(DataType.AddedContact, searchObj);
};

export const getAddedContactById = async (id: string) => {
  return getDbRecordById<IAddedContact>(DataType.AddedContact, id);
};

export const getAddedContact = async (toUserId: string) => {
  const authId = await getSessionId();
  if (!authId) {
    throw new Error("No Valid Session Id!");
  }
  let searchObj = {
    fromUserId: authId,
    toUserId: toUserId,
  };
  const addedContact_list = await searchAddedContacts(searchObj);
  if (!addedContact_list) {
    throw new Error("Couldn't find any added contacts for given toUserId.");
  }
  const addedContact = addedContact_list[0];
  return addedContact;
};

export const updateAddedContactById = async (id: string, updateObj: IAddedContact_Update) => {
  return updateDbRecord<IAddedContact>(DataType.AddedContact, id, updateObj);
};

// Assumes the user is logged in
export const updateAddedContact = async (
  toUserId: string,
  updateObj: IAddedContact_Update
) => {
  const addedContact = await getAddedContact(toUserId);
  const id = addedContact._id;
  return updateAddedContactById(id, updateObj);
};

export const deleteAddedContactById = async (id: string) => {
  deleteDbRecord<IAddedContact>(DataType.AddedContact, id);
};

export const deleteAddedContact = async (toUserId: string) => {
  const addedContact = await getAddedContact(toUserId);
  const id = addedContact._id;
  deleteAddedContactById(id);
};
