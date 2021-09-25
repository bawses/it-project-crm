type ObjectId = string;
type UserId = ObjectId;
type OrganisationId = ObjectId;

export interface IAddedContact_Update {
  notes?: string;
  tags?: string[];
  starred?: boolean;
}

export interface IManualContact_Update {
  name?: { firstName: string; lastName: string };
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

export interface IOrganisation_Update {
  name?: string;
  email?: string[];
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

export interface IUser_Update {
  name?: { firstName: string; lastName: string };
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
  about?: string;
  allTags?: string[];
  organisations?: OrganisationId[];
}

export interface IContact_Update {
  name?: { firstName: string; lastName: string };
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
