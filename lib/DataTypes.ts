export enum DataType {
  User = "user",
  Organisation = "organisation",
  ManualContact = "manual_contact",
  AddedContact = "added_contact",
}

export enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type ObjectId = string;
type UserId = ObjectId;
type OrganisationId = ObjectId;

export interface IAddedContact {
  _id?: ObjectId;
  fromUserId: UserId;
  toUserId: UserId;
  notes?: string;
  tags?: string[];
  starred?: boolean;
}

export interface IManualContact {
  _id?: ObjectId;
  ownerId?: UserId;
  name: { firstName: string; lastName: string };
  fullName?: string;
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
}

export interface IOrganisation {
  _id?: OrganisationId;
  passwordHash?: string;
  name: string;
  email: string[];
  phone?: string[];
  location?: string;
  links?: {
    facebook?: string;
    linkedIn?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
    other?: string[];
  };
  industry?: string;
  about?: string;
  contacts?: UserId[];
}

export interface IUser {
  _id?: UserId;
  passwordHash?: string;
  name: { firstName: string; lastName: string };
  fullName?: string;
  email: string[];
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
  about?: string;
  allTags?: string[];
  organisations?: OrganisationId[];
}

export interface IContact {
  _id?: string;
  name: { firstName: string; lastName: string };
  fullName?: string,
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
  isManualContact?: boolean;
}

// TODO:
// DEFAULT DATA OBJECTS AND CONSTRUCTORS
// DATA CONVERTERS

export const convert_ManualContact_to_IContact = (manualContact: IManualContact): IContact => {
  return {
    _id: manualContact._id,
    name: manualContact.name,
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
  };
};

export const convert_AddedUser_to_IContact = (
  addedContact: IAddedContact,
  user: IUser
): IContact => {
  return {
    _id: user._id,
    name: user.name,
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
  };
};
