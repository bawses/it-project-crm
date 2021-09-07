import { DataType, IManualContact } from "../lib/DataTypes";
import { createDbRecord, getAllDbRecords, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Queries";

export const createManualContact = (newObj: IManualContact) => {
  return createDbRecord(DataType.ManualContact, newObj);
};

export const getAllManualContacts = () => {
  return getAllDbRecords(DataType.ManualContact);
};

export const getManualContactById = (id: string) => {
  return getDbRecordById(DataType.ManualContact, id);
};

export const updateManualContact = (id: string, newObj: IManualContact) => {
  return updateDbRecord(DataType.ManualContact, id, newObj);
};

export const deleteManualContact = (id: string) => {
  return deleteDbRecord(DataType.ManualContact, id);
};
