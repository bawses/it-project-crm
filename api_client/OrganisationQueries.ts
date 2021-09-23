import { DataType, IOrganisation } from "../lib/DataTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

/* TODO: CLarify here which of these are global operations and which these are user specific */
export const createOrganisation = async (dataObj: IOrganisation) => {
  return createDbRecord<IOrganisation>(DataType.Organisation, dataObj);
};

export const getAllOrganisations = async () => {
  return searchDb<IOrganisation>(DataType.Organisation, undefined);
};

export const searchAllOrganisations = async (dataObj: IOrganisation) => {
  return searchDb<IOrganisation>(DataType.Organisation, dataObj);
};

export const getOrganisationById = async (id: string) => {
  return getDbRecordById<IOrganisation>(DataType.Organisation, id);
};

export const updateOrganisation = async (id: string, dataObj: IOrganisation) => {
  return updateDbRecord<IOrganisation>(DataType.Organisation, id, dataObj);
};

export const deleteOrganisation = async (id: string) => {
  deleteDbRecord<IOrganisation>(DataType.Organisation, id);
};
