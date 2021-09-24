import { IOrganisation } from "../lib/DataTypes_Get";
import { IOrganisation_Create } from "../lib/DataTypes_Create";
import { IOrganisation_Update } from "../lib/DataTypes_Update";
import { DataType } from "../lib/EnumTypes";
import { createDbRecord, searchDb, getDbRecordById, updateDbRecord, deleteDbRecord } from "./Client";

/* TODO: CLarify here which of these are global operations and which these are user specific */
export const createOrganisation = async (createObj: IOrganisation_Create) => {
  return createDbRecord<IOrganisation>(DataType.Organisation, createObj);
};

export const getOrganisations = async () => {
  return searchDb<IOrganisation>(DataType.Organisation, {});
};

export const searchOrganisations = async (searchObj: Object) => {
  return searchDb<IOrganisation>(DataType.Organisation, searchObj);
};

export const getOrganisationById = async (id: string) => {
  return getDbRecordById<IOrganisation>(DataType.Organisation, id);
};

export const updateOrganisation = async (id: string, updateObj: IOrganisation_Update) => {
  return updateDbRecord<IOrganisation>(DataType.Organisation, id, updateObj);
};

export const deleteOrganisation = async (id: string) => {
  deleteDbRecord<IOrganisation>(DataType.Organisation, id);
};
