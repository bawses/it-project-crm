import mongoose from "mongoose";
import { IManualContact } from "../components/interfaces";

/*TODO: add min/max length for Strings and error message for required fields */

/* ManualContact will correspond to the "manualcontacts" collection in the MongoDB database. */
const ManualContactSchema = new mongoose.Schema<IManualContact>(
  {
    ownerId: { type: String, required: true },
    name: { type: { firstName: String, lastName: String }, required: true },
    email: { primary: String, secondary: String },
    phone: { primary: String, secondary: String },
    job: String,
    location: String,
    links: { facebook: String, linkedIn: String, instagram: String },
    notes: String,
    tags: [String],
    starred: Boolean,
    archived: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ManualContact ||
  mongoose.model("ManualContact", ManualContactSchema);
