type ObjectId = string;
type UserId = ObjectId;
type OrganisationId = ObjectId;

export interface IAddedContact {
  _id: ObjectId;
  fromUserId: UserId;
  toUserId: UserId;
  notes?: string;
  tags?: string[];
  starred: boolean;
}

export interface IManualContact {
  _id: ObjectId;
  ownerId: UserId;
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
  organisation?: { _id: OrganisationId; name: string; imageUrl?: string };
  manualOrganisation?: string;
  notes?: string;
  tags?: string[];
  starred: boolean;
  archived: boolean;
}

export interface IOrganisation {
  _id: OrganisationId;
  passwordHash: string;
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
  imageUrl?: string;
}

export interface IUser {
  _id: UserId;
  passwordHash: string;
  name: { firstName: string; lastName: string };
  fullName: string;
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
  organisation?: { _id: OrganisationId; name: string; imageUrl?: string };
  manualOrganisation?: string;
  imageUrl?: string;
}
