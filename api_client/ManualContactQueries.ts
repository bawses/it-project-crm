import { DataType, IManualContact } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

export const createManualContact = (dataObj: IManualContact) => {
  return createDbRecord(DataType.ManualContact, dataObj);
};

export const getAllManualContacts = () => {
  return searchDb(DataType.ManualContact, undefined);
};

export const searchManualContacts = (dataObj: IManualContact) => {
  return searchDb(DataType.ManualContact, dataObj);
}

export const getManualContactById = (id: string) => {
  return getDbRecordById(DataType.ManualContact, id);
};

export const updateManualContact = (id: string, dataObj: IManualContact) => {
  return updateDbRecord(DataType.ManualContact, id, dataObj);
};

export const deleteManualContact = (id: string) => {
  return deleteDbRecord(DataType.ManualContact, id);
};
