import mongoose from "mongoose";
import { IAddedContact } from "../components/interfaces";

/*TODO: add min/max length for Strings and error message for required fields */

/* AddedContactSchema will correspond to "addedcontacts" collection in the MongoDB database. */
const AddedContactSchema = new mongoose.Schema<IAddedContact>(
  {
    fromUserId: { type: String, required: true },
    toUserId: { type: String, required: true },
    notes: String,
    tags: [String],
    starred: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AddedContact ||
  mongoose.model("AddedContact", AddedContactSchema);
