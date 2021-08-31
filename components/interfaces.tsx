type UserId = string;
type OrganisationId = string;

export interface IAddedContact {
  fromUserId: UserId;
  toUserId: UserId;
  notes?: string;
  tags?: [string];
  starred?: boolean;
}

export interface IManualContact {
  ownerId: UserId;
  name: { firstName: string; lastName: string };
  email?: { primary: string; secondary: string };
  phone?: { primary: string; secondary: string };
  job?: string;
  location?: string;
  links?: { facebook: string; linkedIn: string; instagram: string };
  notes?: string;
  tags?: [string];
  starred?: boolean;
  archived?: boolean;
}

export interface IOrganisation {
  passwordHash: string;
  name: string;
  email: { primary: string; secondary: string };
  phone?: { primary: string; secondary: string };
  location?: string;
  links?: { facebook: string; linkedIn: string; instagram: string };
  industry?: string;
  about?: string;
  contacts?: [UserId];
}

export interface IUser {
  passwordHash: string;
  name: { firstName: string; lastName: string };
  email: { primary: string; secondary: string };
  phone?: { primary: string; secondary: string };
  job?: string;
  location?: string;
  links?: { facebook: string; linkedIn: string; instagram: string };
  about?: string;
  allTags?: [string];
  organisations?: [OrganisationId];
}
