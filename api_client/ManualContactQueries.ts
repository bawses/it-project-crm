import { DataType, IManualContact } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

export const createManualContact = (dataObj: IManualContact) => {
  return createDbRecord(DataType.ManualContact, dataObj);
};

export const getAllManualContacts = () => {
  return searchDb<IManualContact[]>(DataType.ManualContact, undefined);
};

export const searchManualContacts = (dataObj: IManualContact) => {
  return searchDb<IManualContact[]>(DataType.ManualContact, dataObj);
}

export const getManualContactById = (id: string) => {
  return getDbRecordById<IManualContact>(DataType.ManualContact, id);
};

export const updateManualContact = (id: string, dataObj: IManualContact) => {
  return updateDbRecord<IManualContact>(DataType.ManualContact, id, dataObj);
};

export const deleteManualContact = (id: string) => {
  return deleteDbRecord(DataType.ManualContact, id);
};
