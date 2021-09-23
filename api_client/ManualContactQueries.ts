import { DataType, IManualContact } from "../lib/DataTypes";
import {
  createDbRecord,
  searchDb,
  getDbRecordById,
  updateDbRecord,
  deleteDbRecord,
  doSearch,
  getSessionId
} from "./Client";

export const createManualContact = async (dataObj: IManualContact) => {
  return createDbRecord<IManualContact>(DataType.ManualContact, dataObj);
};

export const getManualContacts = async () => {
  // Get authentication Id
  const authId = await getSessionId();
  if (authId){
    let dataObj: Object = {ownerId: authId}
    return searchDb<IManualContact>(DataType.ManualContact, dataObj);
  }

  throw new Error ("No Valid Session Id!");
};

export const searchManualContacts = async (dataObj: Object) => {
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
  
  let dataObjFirst: Object = {
    "fullName": {
        "$regex": name,
        "$options": "i"
    }
  }
  return await doSearch<IManualContact>(DataType.ManualContact, dataObjFirst);
};
