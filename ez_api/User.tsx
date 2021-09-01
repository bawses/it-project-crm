import { DataType, IUser } from "../components/DataTypes";
import { createDbRecord, getDbRecordById, updateDbRecord } from "./Queries";

/* The POST method adds a new entry in the mongodb database. */
export const createUser = async (userObj: IUser) => {
  createDbRecord(DataType.User, userObj);
};

export const getUserById = async (userId: string) => {
  getDbRecordById(DataType.User, userId);
};

/* The PUT method edits an existing entry in the mongodb database. */
export const updateUser = async (userId: string, userObj: IUser) => {
  updateDbRecord(DataType.User, userId, userObj);
};
