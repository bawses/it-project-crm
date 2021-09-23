import { IContact } from "../lib/DataTypes";
import { getManualContacts } from "./ManualContactQueries";
import { getAllAddedContacts } from "./AddedContactQueries";

export const getAllContacts = async (): Promise<IContact[]> => {
  const manualContacts = await getManualContacts();
  const addedContacts = await getAllAddedContacts();
  return [];
};
