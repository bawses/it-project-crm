import mongoose from "mongoose";
import { IManualContact } from "../../lib/DataTypes";

/*TODO: add min/max length for Strings and error message for required fields */

const ObjectId = String;
const UserId = ObjectId;
const OrganisationId = ObjectId;

/* ManualContact will correspond to the "manualcontacts" collection in the MongoDB database. */
const ManualContactSchema = new mongoose.Schema<IManualContact>(
  {
    ownerId: { type: UserId, required: true },
    fullName: { type: String },
    name: { type: { firstName: String, lastName: String }, required: true },
    email: [String],
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
    organisation: { _id: OrganisationId, name: String, imageUrl: String },
    manualOrganisation: String,
    notes: String,
    tags: [String],
    starred: Boolean,
    archived: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ManualContact || mongoose.model("ManualContact", ManualContactSchema);
