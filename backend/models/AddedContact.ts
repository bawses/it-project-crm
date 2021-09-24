import mongoose from "mongoose";
import { IAddedContact } from "../../lib/DataTypes_Get";

/*TODO: add min/max length for Strings and error message for required fields */

const UserId = String;

/* AddedContactSchema will correspond to "addedcontacts" collection in the MongoDB database. */
const AddedContactSchema = new mongoose.Schema<IAddedContact>(
  {
    fromUserId: { type: UserId, required: true },
    toUserId: { type: UserId, required: true },
    notes: String,
    tags: [String],
    starred: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AddedContact || mongoose.model("AddedContact", AddedContactSchema);
