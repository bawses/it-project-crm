import { DataType, IAddedContact } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

export const createAddedContact = async (dataObj: IAddedContact) => {
  return createDbRecord<IAddedContact>(DataType.AddedContact, false, dataObj);
};

export const getAllAddedContacts = async () => {
  return searchDb<IAddedContact>(DataType.AddedContact, false, undefined);
};

export const searchAddedContacts = async (dataObj: IAddedContact) => {
  return searchDb<IAddedContact>(DataType.AddedContact, false, dataObj);
}

export const getAddedContactById = async (id: string) => {
  return getDbRecordById<IAddedContact>(DataType.AddedContact, false, id);
};

export const updateAddedContact = async (id: string, dataObj: IAddedContact) => {
  return updateDbRecord<IAddedContact>(DataType.AddedContact, false, id, dataObj);
};

export const deleteAddedContact = async (id: string) => {
  deleteDbRecord<IAddedContact>(DataType.AddedContact, false, id);
};
