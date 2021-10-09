import { Request, Response } from "express";
import { indexHandler } from "../../../backend/middleware/ApiHandlers";
import { IManualContact_Create } from "../../../lib/DataTypes_Create";
import { DataType } from "../../../lib/EnumTypes";
import { IContact } from "../../../lib/UnifiedDataType";

export default async function handler(req: Request, res: Response): Promise<Response> {
  return await indexHandler(req, res, DataType.AddedContact);
}


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

