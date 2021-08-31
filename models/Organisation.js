import mongoose from "mongoose";

/* Organisation will correspond to a collection in the MongoDB database. */
const OrganisationSchema = new mongoose.Schema({
  passwordHash: String,
  name: String,
  email: { primary: String, secondary: String },
  phone: { primary: String, secondary: String },
  location: String,
  links: { facebook: String, linkedIn: String, instagram: String },
  industry: String,
  about: String,
  contacts: [mongoose.Types.ObjectId],
});

export default mongoose.models.Organisation ||
  mongoose.model("Organisation", OrganisationSchema);
