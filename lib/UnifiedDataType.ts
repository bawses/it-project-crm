import { IManualContact, IAddedContact, IUser } from "./DataTypes_Get"

type ObjectId = string;

export interface IContact {
  _id: ObjectId;
  name: { firstName: string; lastName: string };
  fullName: string;
  email?: string[];
  phone?: string[];
  job?: string;
  location?: string;
  links?: {
    facebook?: string;
    linkedIn?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
    other?: string[];
  };
  organisations?: string[];
  notes?: string;
  tags?: string[];
  starred?: boolean;
  archived?: boolean;
  isManualContact: boolean;
  isAddedContact: boolean;
}

export const convert_ManualContact_to_IContact = (manualContact: IManualContact): IContact => {
  return {
    _id: manualContact._id,
    name: manualContact.name,
    fullName: manualContact.fullName,
    email: manualContact.email,
    phone: manualContact.phone,
    job: manualContact.job,
    location: manualContact.location,
    links: manualContact.links,
    organisations: manualContact.organisations,
    notes: manualContact.notes,
    tags: manualContact.tags,
    starred: manualContact.starred,
    archived: manualContact.archived,
    isManualContact: true,
    isAddedContact: false,
  };
};

export const convert_User_to_IContact = (user: IUser): IContact => {
  return {
    _id: user._id,
    name: user.name,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    job: user.job,
    location: user.location,
    links: user.links,
    organisations: user.organisations,
    isManualContact: false,
    isAddedContact: false,
  };
};

export const convert_AddedUser_to_IContact = (
  addedContact: IAddedContact,
  user: IUser
): IContact => {
  return {
    _id: user._id,
    name: user.name,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    job: user.job,
    location: user.location,
    links: user.links,
    organisations: user.organisations,
    notes: addedContact.notes,
    tags: addedContact.tags,
    starred: addedContact.starred,
    archived: false,
    isManualContact: false,
    isAddedContact: true,
  };
};
