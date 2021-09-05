import mongoose from "mongoose";
import { IOrganisation } from "../../components/DataTypes";

/*TODO: add min/max length for Strings and error message for required fields */

/* OrganisationSchema will correspond to the "organisations" collection in the MongoDB database. */
const OrganisationSchema = new mongoose.Schema<IOrganisation>(
  {
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: [String], required: true },
    phone: [String],
    location: String,
    links: {
      facebook: String,
      linkedIn: String,
      instagram: String,
      twitter: String,
      website: String,
      other: [String],
    },
    industry: String,
    about: String,
    contacts: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Organisation || mongoose.model("Organisation", OrganisationSchema);
 