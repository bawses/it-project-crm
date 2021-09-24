import { getManualContacts, updateManualContact } from "./ManualContactQueries";
import { getAddedContacts, searchAddedContacts } from "./AddedContactQueries";
import { searchUsers, getUserById } from "./UserQueries";
import { getSessionId } from "./Client";
import { IContact, convert_ManualContact_to_IContact, convert_AddedUser_to_IContact, convert_User_to_IContact } from "../lib/UnifiedDataType";

export const getUserById_IContact = async (id: string): Promise<IContact> => {
    const user = await getUserById(id);
    return convert_User_to_IContact(user);
}

// export const getAddedUserById_IContact = async (addedUserId: string): Promise<IContact> => {
//    const authId = await getSessionId();
//   if (!authId) {
//       throw new Error("No Valid Session Id!");
//   }
//     var searchObj = {
//         fromUserId: authId,
//         toUserId: addedUserId,
//     }
//     var addedContact = await searchAddedContacts(searchObj);
//     if (!addedContact) {
//         throw new Error
//     }
// }

export const getAddedUsers_IContact = async (): Promise<IContact[]> => {
  const addedContacts = await getAddedContacts();
  const addedUserIds = addedContacts.map((addedContact)=>(addedContact.toUserId));
  const addedUserObjects = await searchUsers({ _id: { $in: addedUserIds } });
  var addedUsers: IContact[] = [];
  for (let addedContact of addedContacts) {
    for (let addedUserObject of addedUserObjects) {
        if (addedContact.toUserId === addedUserObject._id) {
            addedUsers.push(convert_AddedUser_to_IContact(addedContact, addedUserObject));
        }
    }
  }
  return addedUsers;
}

export const getManualContacts_IContact = async (): Promise<IContact[]> => {
  const manualContacts = await getManualContacts();
  return manualContacts.map(convert_ManualContact_to_IContact);
}

export const getContacts = async (): Promise<IContact[]> => {
  var contacts: IContact[] = [];
  contacts.concat(await getManualContacts_IContact());
  contacts.concat(await getAddedUsers_IContact());
  return contacts;
};

export const starContact = async (contact: IContact) => {
  if (contact.isManualContact) {
    updateManualContact(contact._id, { starred: true });
  }
}