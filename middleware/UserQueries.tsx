import { DataType, IUser } from "../components/DataTypes";
import { createDbRecord, getAllDbRecords, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Queries";

export const createUser = (newObj: IUser) => {
  return createDbRecord(DataType.User, newObj);
};

export const getAllUsers = () => {
  return getAllDbRecords(DataType.User);
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
