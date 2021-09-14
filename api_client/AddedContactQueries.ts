import { DataType, IAddedContact } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

export const createAddedContact = async (dataObj: IAddedContact) => {
  return createDbRecord<IAddedContact>(DataType.AddedContact, dataObj);
};

export const getAllAddedContacts = async () => {
  return searchDb<IAddedContact>(DataType.AddedContact, undefined);
};

export const searchAddedContacts = async (dataObj: IAddedContact) => {
  return searchDb<IAddedContact>(DataType.AddedContact, dataObj);
}

export const getAddedContactById = async (id: string) => {
  return getDbRecordById<IAddedContact>(DataType.AddedContact, id);
};

export const updateAddedContact = async (id: string, dataObj: IAddedContact) => {
  return updateDbRecord<IAddedContact>(DataType.AddedContact, id, dataObj);
};

export const deleteAddedContact = async (id: string) => {
  return deleteDbRecord<IAddedContact>(DataType.AddedContact, id);
};
