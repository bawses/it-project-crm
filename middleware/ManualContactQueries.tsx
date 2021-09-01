import { DataType, IManualContact } from "../components/DataTypes";
import { createDbRecord, getAllDbRecords, getDbRecordById, updateDbRecord, deletedDbRecord } from "./Queries";

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
  return deletedDbRecord(DataType.ManualContact, id);
};
