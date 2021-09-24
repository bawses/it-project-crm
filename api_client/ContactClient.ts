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
  let addedContact = await getAddedContact(id);
  if (addedContact) {
    return convert_AddedUser_to_Contact(addedContact, user);
  } else {
    return convert_User_to_Contact(user);
  }
};

const getContact_Manual = async (id: string): Promise<IContact> => {
  const manualContact = await getManualContactById(id);
  return convert_ManualContact_to_Contact(manualContact);
};

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
  return manualContacts.map(convert_ManualContact_to_Contact);
};

export const searchContacts_User = async (searchObj: Object): Promise<IContact[]> => {
  // Get all the user IDs that this user has added
  let addedContacts = await getAddedContacts();
  let addedUserIds = addedContacts.map((addedContact) => addedContact.toUserId);
  let users = await searchUsers(searchObj);
  let addedUserObjs = users.filter((user) => addedUserIds.includes(user._id));
  users = users.filter((user) => !addedUserIds.includes(user._id));

  let userContacts = users.map(convert_User_to_Contact);
  let addedUsers = await Promise.all(
    addedUserObjs.map(async (addedUser) => {
      let addedContactObj = await getAddedContact(addedUser._id);
      return convert_AddedUser_to_Contact(addedContactObj, addedUser);
    })
  );
  return userContacts.concat(addedUsers);
};

export const searchContacts = async (searchObj: Object): Promise<IContact[]> => {
  let search_User = await searchContacts_User(searchObj);
  let search_Manual = await searchContacts_Manual(searchObj);
  return search_Manual.concat(search_User);
};

export const searchContactsByName = async (name: string): Promise<IContact[]> => {
  let result = await searchContacts({ fullName: { $regex: name, $options: "i" } });
  return result.sort(compare);
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
