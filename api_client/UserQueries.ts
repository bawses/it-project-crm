import { DataType, IUser } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

export const createUser = (dataObj: IUser) => {
  return createDbRecord(DataType.User, dataObj);
};

export const getAllUsers = () => {
  return searchDb(DataType.User, undefined);
};

export const searchUsers = (dataObj: IUser) => {
  return searchDb(DataType.User, dataObj);
};

export const getUserById = (id: string) => {
  return getDbRecordById(DataType.User, id);
};

export const updateUser = (id: string, dataObj: IUser) => {
  return updateDbRecord(DataType.User, id, dataObj);
};

export const deleteUser = (id: string) => {
  return deleteDbRecord(DataType.User, id);
};
