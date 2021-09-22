import { IContact } from "../lib/DataTypes";
import { getAllManualContacts } from "./ManualContactQueries";
import { getAllAddedContacts } from "./AddedContactQueries";

export const getAllContacts = async (): Promise<IContact[]> => {
  const manualContacts = await getAllManualContacts();
  const addedContacts = await getAllAddedContacts();
  return [];
};
