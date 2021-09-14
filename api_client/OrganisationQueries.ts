import { DataType, IOrganisation } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

export const createOrganisation = (dataObj: IOrganisation) => {
  return createDbRecord(DataType.Organisation, dataObj);
};

export const getAllOrganisations = () => {
  return searchDb(DataType.Organisation, undefined);
};

export const searchAllOrganisations = (dataObj: IOrganisation) => {
  return searchDb(DataType.Organisation, dataObj);
}

export const getOrganisationById = (id: string) => {
  return getDbRecordById(DataType.Organisation, id);
};

export const updateOrganisation = (id: string, dataObj: IOrganisation) => {
  return updateDbRecord(DataType.Organisation, id, dataObj);
};

export const deleteOrganisation = (id: string) => {
  return deleteDbRecord(DataType.Organisation, id);
};
