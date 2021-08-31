import mongoose from "mongoose";

/* AddedContact will correspond to a collection in the MongoDB database. */
const AddedContactSchema = new mongoose.Schema({
  fromUserId: mongoose.Types.ObjectId,
  toUserId: mongoose.Types.ObjectId,
  notes: String,
  tags: [String],
  starred: Boolean,
});

export default mongoose.models.AddedContact ||
  mongoose.model("AddedContact", AddedContactSchema);
