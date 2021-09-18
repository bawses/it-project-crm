import { DataType, IManualContact } from "../lib/DataTypes";
import {
  createDbRecord,
  searchDb,
  getDbRecordById,
  updateDbRecord,
  deleteDbRecord,
  doRegexSearch,
} from "./Client";

export const createManualContact = async (dataObj: IManualContact) => {
  return createDbRecord<IManualContact>(DataType.ManualContact, dataObj);
};

export const getAllManualContacts = async (ownerId: string) => {
  return searchDb<IManualContact>(DataType.ManualContact, undefined, ownerId);
};

export const searchManualContacts = async (dataObj: IManualContact) => {
  return searchDb<IManualContact>(DataType.ManualContact, dataObj);
};

export const getManualContactById = async (recordId: string) => {
  return getDbRecordById<IManualContact>(DataType.ManualContact, recordId);
};

export const updateManualContact = async (id: string, dataObj: IManualContact) => {
  return updateDbRecord<IManualContact>(DataType.ManualContact, id, dataObj);
};

export const deleteManualContact = async (id: string) => {
  deleteDbRecord<IManualContact>(DataType.ManualContact, id);
};

export const searchManualContactsByName = async (name: string) => {
  return doRegexSearch<IManualContact>(DataType.ManualContact, name);
};
