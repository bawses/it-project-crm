import {
  createManualContact,
  getManualContactById,
  getManualContacts,
  updateManualContact,
  deleteManualContact,
  searchManualContacts,
} from "./ManualContactClient";
import {
  createAddedContact,
  getAddedContact,
  getAddedContacts,
  updateAddedContact,
  deleteAddedContact,
  searchAddedContacts,
} from "./AddedContactClient";
import { searchUsers, getUserById, updateUser } from "./UserClient";

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
  contact: IContact,
  updateObj: IManualContact_Update | IAddedContact_Update
): Promise<IContact> => {
  if (!contact.isManualContact && !contact.isAddedContact) {
    throw new Error("Not a manual contact or added contact. Cannot update.");
  }
  if (contact.isManualContact) {
    return updateContact_Manual(contact._id, updateObj);
  } else {
    return updateContact_AddedUser(contact._id, updateObj);
  }
};

export const deleteContact = async (contact: IContact): Promise<void> => {
  if (contact.isManualContact) {
    deleteManualContact(contact._id);
  } else {
    deleteAddedContact(contact._id);
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
  addedUsers = addedUsers.sort(compare);
  return addedUsers;
};

export const getContacts_Manual = async (): Promise<IContact[]> => {
  const manualContacts = await getManualContacts();
  let contacts = manualContacts.map(convert_ManualContact_to_Contact);
  contacts = contacts.sort(compare);
  return contacts;
};

export const getContacts = async (): Promise<IContact[]> => {
  var contacts: IContact[] = [];
  contacts = contacts.concat(await getContacts_Manual());
  contacts = contacts.concat(await getContacts_AddedUser());
  return contacts.sort(compare);
};

export const toggleStarContact = async (contact: IContact): Promise<IContact> => {
  return updateContact(contact, { starred: !contact.starred });
};

export const toggleArchiveContact = async (contact: IContact): Promise<IContact> => {
  if (!contact.isManualContact) {
    throw new Error("Not a manual contact. Cannot archive.");
  }
  return updateContact_Manual(contact._id, { archived: !contact.archived });
};

export const addFieldToContact = async (contact: IContact, fieldObj: Object): Promise<IContact> => {
  return updateContact(contact, { $addToSet: fieldObj });
};

export const removeFieldFromContact = async (
  contact: IContact,
  fieldObj: Object
): Promise<IContact> => {
  return updateContact(contact, { $pull: fieldObj });
};

export const addTagToContact = async (contact: IContact, tag: string): Promise<IContact> => {
  let newObj = await addFieldToContact(contact, { tags: tag });
  await updateUser({ $addToSet: { allTags: tag } });
  return newObj;
};

export const removeTagFromContact = async (contact: IContact, tag: string): Promise<IContact> => {
  let newObj = await removeFieldFromContact(contact, { tags: tag });
  // See if this tag still exists in the user's contacts, otherwise remove it from all tags
  let searchObj = { tags: tag };
  let a = await searchAddedContacts(searchObj);
  let b = await searchManualContacts(searchObj);
  console.log(a, b);
  if (!a.length && !b.length) {
    await updateUser({ $pull: { allTags: tag } });
  }
  return newObj;
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
