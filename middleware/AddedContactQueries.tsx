import { DataType, IAddedContact } from "../components/DataTypes";
import { createDbRecord, getAllDbRecords, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Queries";

export const createAddedContact = (newObj: IAddedContact) => {
  return createDbRecord(DataType.AddedContact, newObj);
};

export const getAllAddedContacts = () => {
  return getAllDbRecords(DataType.AddedContact);
}

export const getAddedContactById = (id: string) => {
  return getDbRecordById(DataType.AddedContact, id);
};

export const updateAddedContact = (id: string, newObj: IAddedContact) => {
  return updateDbRecord(DataType.AddedContact, id, newObj);
};

export const deleteAddedContact = (id: string) => {
  return deleteDbRecord(DataType.AddedContact, id);
};
