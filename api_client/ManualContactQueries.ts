import { IManualContact } from "../lib/DataTypes";
import { IManualContact_Create } from "../lib/DataTypes_Create";
import { IManualContact_Update } from "../lib/DataTypes_Update";
import { DataType } from "../lib/EnumTypes";

import {
  createDbRecord,
  searchDb,
  getDbRecordById,
  updateDbRecord,
  deleteDbRecord,
  getSessionId,
} from "./Client";

export const createManualContact = async (createObj: IManualContact_Create) => {
  const authId = await getSessionId();
  if (!authId) {
    throw new Error("No Valid Session Id!");
  }
  let createObj_ = createObj as any;
  createObj_.ownerId = authId;
  createObj_.archived = false;
  createObj_.starred = false;
  createObj_.fullName = createObj.name.firstName + " " + createObj.name.lastName;
  return createDbRecord<IManualContact>(DataType.ManualContact, createObj_);
};

export const getManualContactById = async (id: string) => {
  return getDbRecordById<IManualContact>(DataType.ManualContact, id);
};

export const updateManualContact = async (id: string, updateObj: IManualContact_Update) => {
  var updateObj_ = updateObj as any;
  if (updateObj.name) {
    updateObj_.fullName = updateObj.name.firstName + " " + updateObj.name.lastName;
  }
  return updateDbRecord<IManualContact>(DataType.ManualContact, id, updateObj_);
};

export const deleteManualContact = async (id: string) => {
  deleteDbRecord<IManualContact>(DataType.ManualContact, id);
};

export const searchManualContacts = async (searchObj: Object) => {
  // Only search for un-archived manual contacts
  let searchObj_ = searchObj as any;
  searchObj_.archived = { $in: [false, null] };
  return searchDb<IManualContact>(DataType.ManualContact, searchObj_);
};

export const getManualContacts = async () => {
  return searchManualContacts({});
};

export const searchManualContactsByName = async (name: string) => {
  let searchObj = { fullName: { $regex: name, $options: "i" } };
  return await searchManualContacts(searchObj);
};
