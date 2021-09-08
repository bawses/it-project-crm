import { DataType, IUser } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

export const createUser = (newObj: IUser) => {
  return createDbRecord(DataType.User, newObj);
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

export const updateUser = (id: string, newObj: IUser) => {
  return updateDbRecord(DataType.User, id, newObj);
};

export const deleteUser = (id: string) => {
  return deleteDbRecord(DataType.User, id);
};
