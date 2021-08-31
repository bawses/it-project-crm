import mongoose from "mongoose";
import { IOrganisation } from "../components/interfaces";

/*TODO: add min/max length for Strings and error message for required fields */

/* OrganisationSchema will correspond to the "organisations" collection in the MongoDB database. */
const OrganisationSchema = new mongoose.Schema<IOrganisation>(
  {
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: { primary: String, secondary: String }, required: true },
    phone: { primary: String, secondary: String },
    location: String,
    links: { facebook: String, linkedIn: String, instagram: String },
    industry: String,
    about: String,
    contacts: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Organisation ||
  mongoose.model("Organisation", OrganisationSchema);
