
type UserId = string;

export interface IUser_Create {
  passwordHash: string;
  name: { firstName: string; lastName: string };
  email: string[];
}

export interface IManualContact_Create {
  name: { firstName: string; lastName: string };
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
  organisation?: string;
  notes?: string;
  tags?: string[];
}

export interface IAddedContact_Create {
  fromUserId: UserId;
  toUserId: UserId;
}

export interface IOrganisation_Create {
  passwordHash: string;
  name: string;
  email: string[];
}
