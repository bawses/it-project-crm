import mongoose from "mongoose";

/* ManualContact will correspond to a collection in the MongoDB database. */
const ManualContactSchema = new mongoose.Schema({
  ownerId: mongoose.Types.ObjectId,
  name: { firstName: String, lastName: String },
  email: { primary: String, secondary: String },
  phone: { primary: String, secondary: String },
  job: String,
  location: String,
  links: { facebook: String, linkedIn: String, instagram: String },
  notes: String,
  tags: [String],
  archived: Boolean,
});

export default mongoose.models.ManualContact || mongoose.model("ManualContact", ManualContactSchema);