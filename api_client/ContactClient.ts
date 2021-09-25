import {
  createManualContact,
  getManualContactById,
  getManualContacts,
  updateManualContact,
  deleteManualContact,
  searchManualContacts,
} from "./ManualContactQueries";
import {
  createAddedContact,
  getAddedContact,
  getAddedContacts,
  updateAddedContact,
  deleteAddedContact,
} from "./AddedContactQueries";
import { searchUsers, getUserById } from "./UserQueries";

// Data types
import { IManualContact_Create } from "../lib/DataTypes_Create";
import { IManualContact_Update, IAddedContact_Update } from "../lib/DataTypes_Update";
import {
  IContact,
  convert_ManualContact_to_Contact,
  convert_User_to_Contact,
  convert_AddedUser_to_Contact,
} from "../lib/UnifiedDataType";

export const createContact_Manual = async (createObj: IManualContact_Create): Promise<IContact> => {
  let manualContact = await createManualContact(createObj);
  return convert_ManualContact_to_Contact(manualContact);
};

export const addContact_User = async (id: string): Promise<IContact> => {
  let addedContactObj = await createAddedContact(id);
  let userObj = await getUserById(id);
  return convert_AddedUser_to_Contact(addedContactObj, userObj);
};

const getContact_User = async (id: string): Promise<IContact> => {
  let user = await getUserById(id);
  try {
    let addedContact = await getAddedContact(id);
    return convert_AddedUser_to_Contact(addedContact, user);
  } catch (err) {
    return convert_User_to_Contact(user);
  }
};

const getContact_Manual = async (id: string): Promise<IContact> => {
  const manualContact = await getManualContactById(id);
  return convert_ManualContact_to_Contact(manualContact);
};

// id - objectId in case of manual contacts
// id - userId in case of not manual contacts
export const getContact = async (id: string, isManualContact: boolean): Promise<IContact> => {
  if (isManualContact) {
    return getContact_Manual(id);
  } else {
    return getContact_User(id);
  }
};

const updateContact_Manual = async (
  id: string,
  updateObj: IManualContact_Update
): Promise<IContact> => {
  let manualContact = await updateManualContact(id, updateObj);
  return convert_ManualContact_to_Contact(manualContact);
};

const updateContact_AddedUser = async (
  id: string,
  updateObj: IAddedContact_Update
): Promise<IContact> => {
  let addedContact = await updateAddedContact(id, updateObj);
  let user = await getUserById(id);
  return convert_AddedUser_to_Contact(addedContact, user);
};

// id : object ID for manual contact OR user ID (toUserId) for added user.
export const updateContact = async (
  id: string,
  isManualContact: boolean,
  updateObj: IManualContact_Update | IAddedContact_Update
): Promise<IContact> => {
  if (isManualContact) {
    return updateContact_Manual(id, updateObj);
  } else {
    return updateContact_AddedUser(id, updateObj);
  }
};

export const deleteContact = async (id: string, isManualContact: boolean): Promise<void> => {
  if (isManualContact) {
    deleteManualContact(id);
  } else {
    deleteAddedContact(id);
  }
};

export const getContacts_AddedUser = async (): Promise<IContact[]> => {
  const addedContacts = await getAddedContacts();
  const addedUserIds = addedContacts.map((addedContact) => addedContact.toUserId);
  const addedUserObjects = await searchUsers({ _id: { $in: addedUserIds } });
  var addedUsers: IContact[] = [];
  for (let addedContact of addedContacts) {
    for (let addedUserObject of addedUserObjects) {
      if (addedContact.toUserId === addedUserObject._id) {
        addedUsers.push(convert_AddedUser_to_Contact(addedContact, addedUserObject));
      }
    }
  }
  return addedUsers;
};

export const getContacts_Manual = async (): Promise<IContact[]> => {
  const manualContacts = await getManualContacts();
  return manualContacts.map(convert_ManualContact_to_Contact);
};

export const getContacts = async (): Promise<IContact[]> => {
  var contacts: IContact[] = [];
  contacts = contacts.concat(await getContacts_Manual());
  contacts = contacts.concat(await getContacts_AddedUser());
  return contacts;
};

export const starContact = async (contact: IContact): Promise<IContact> => {
  if (contact.isManualContact) {
    let manualContact = await updateManualContact(contact._id, { starred: true });
    return convert_ManualContact_to_Contact(manualContact);
  } else if (contact.isAddedContact) {
    let addedContact = await updateAddedContact(contact._id, { starred: true });
    let user = await getUserById(contact._id);
    return convert_AddedUser_to_Contact(addedContact, user);
  } else {
    throw new Error("Not a manual contact or added contact. Cannot star.");
  }
};

export const archiveContact = async (contact: IContact): Promise<IContact> => {
  if (contact.isManualContact) {
    let manualContact = await updateManualContact(contact._id, { archived: true });
    return convert_ManualContact_to_Contact(manualContact);
  } else {
    throw new Error("Not a manual contact. Cannot archive.");
  }
};

export const searchContacts_Manual = async (searchObj: Object): Promise<IContact[]> => {
  let manualContacts = await searchManualContacts(searchObj);
  let contacts = manualContacts.map(convert_ManualContact_to_Contact);
  return contacts.sort(compare);
};

export const searchContacts_User = async (searchObj: Object): Promise<IContact[]> => {
  // Get all the user IDs that this user has added
  let addedContacts = await getAddedContacts();
  let addedUserIds = addedContacts.map((a) => a.toUserId);
  let searchResult = await searchUsers(searchObj);
  let addedUsers = searchResult.filter((user) => addedUserIds.includes(user._id));
  let otherUsers = searchResult.filter((user) => !addedUserIds.includes(user._id));

  let otherUserContacts = otherUsers.map(convert_User_to_Contact);
  let addedUserContacts = await Promise.all(
    addedUsers.map(async (user) => {
      let addedContact = await getAddedContact(user._id);
      return convert_AddedUser_to_Contact(addedContact, user);
    })
  );
  let allContacts = addedUserContacts.concat(otherUserContacts);
  return allContacts.sort(compare);
};

export const searchContacts = async (searchObj: Object): Promise<IContact[]> => {
  let searchResult_User = await searchContacts_User(searchObj);
  let searchResult_Manual = await searchContacts_Manual(searchObj);
  let searchResult = searchResult_Manual.concat(searchResult_User);
  return searchResult.sort(compare);
};

export const searchContactsByName = async (name: string): Promise<IContact[]> => {
  return searchContacts({ fullName: { $regex: name, $options: "i" } });
};

function strcmp(a: string, b: string) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function compare(a: IContact, b: IContact) {
  if (a.isManualContact && !b.isManualContact) {
    return -1;
  }
  if (!a.isManualContact && b.isManualContact) {
    return 1;
  }
  if (a.isAddedContact && !b.isAddedContact) {
    return -1;
  }
  if (!a.isAddedContact && b.isAddedContact) {
    return 1;
  }
  if (a.starred && !b.starred) {
    return -1;
  }
  if (!a.starred && b.starred) {
    return 1;
  }
  return strcmp(a.fullName, b.fullName);
}
