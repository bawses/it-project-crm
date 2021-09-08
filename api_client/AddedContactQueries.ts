import { DataType, IAddedContact } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

export const createAddedContact = (dataObj: IAddedContact) => {
  return createDbRecord(DataType.AddedContact, dataObj);
};

export const getAllAddedContacts = () => {
  return searchDb(DataType.AddedContact, undefined);
};

export const searchAddedContacts = (dataObj: IAddedContact) => {
  return searchDb(DataType.AddedContact, dataObj);
}

export const getAddedContactById = (id: string) => {
  return getDbRecordById(DataType.AddedContact, id);
};

export const updateAddedContact = (id: string, dataObj: IAddedContact) => {
  return updateDbRecord(DataType.AddedContact, id, dataObj);
};

export const deleteAddedContact = (id: string) => {
  return deleteDbRecord(DataType.AddedContact, id);
};
