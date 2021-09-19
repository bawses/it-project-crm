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
  return createDbRecord<IManualContact>(DataType.ManualContact, false, dataObj);
};

export const getAllManualContacts = async () => {
  return searchDb<IManualContact>(DataType.ManualContact, false, undefined);
};

export const searchManualContacts = async (dataObj: IManualContact) => {
  return searchDb<IManualContact>(DataType.ManualContact, false, dataObj);
};

export const getManualContactById = async (recordId: string) => {
  return getDbRecordById<IManualContact>(DataType.ManualContact, false, recordId);
};

export const updateManualContact = async (id: string, dataObj: IManualContact) => {
  return updateDbRecord<IManualContact>(DataType.ManualContact, false, id, dataObj);
};

export const deleteManualContact = async (id: string) => {
  deleteDbRecord<IManualContact>(DataType.ManualContact, false, id);
};

export const searchManualContactsByName = async (name: string) => {
  return doRegexSearch<IManualContact>(DataType.ManualContact, name);
};
