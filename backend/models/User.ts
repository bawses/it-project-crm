import mongoose from "mongoose";
import { IUser } from "../../lib/DataTypes";

/*TODO: add min/max length for Strings and error message for required fields */

const OrganisationId = String;

const UserSchema = new mongoose.Schema<IUser>(
  {
    passwordHash: { type: String, required: true },
    fullName: {type: String},
    name: { type: { firstName: String, lastName: String }, required: true },
    email: { type: [String], required: true },
    phone: [String],
    job: String,
    location: String,
    links: {
      facebook: String,
      linkedIn: String,
      instagram: String,
      twitter: String,
      website: String,
      other: [String],
    },
    recoveryEmail: String,
    about: String,
    allTags: [String],
    organisation: { _id: OrganisationId, name: String, imageUrl: String },
    manualOrganisation: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
