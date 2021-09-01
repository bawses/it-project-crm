import { DataType, IOrganisation } from "../components/DataTypes";
import { createDbRecord, getAllDbRecords, getDbRecordById, updateDbRecord, deletedDbRecord } from "./Queries";

export const createOrganisation = (newObj: IOrganisation) => {
  return createDbRecord(DataType.Organisation, newObj);
};

export const getAllOrganisations = () => {
  return getAllDbRecords(DataType.Organisation);
};

export const getOrganisationById = (id: string) => {
  return getDbRecordById(DataType.Organisation, id);
};

export const updateOrganisation = (id: string, newObj: IOrganisation) => {
  return updateDbRecord(DataType.Organisation, id, newObj);
};

export const deleteOrganisation = (id: string) => {
  return deletedDbRecord(DataType.Organisation, id);
};