import mongoose from "mongoose";

// var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  passwordHash: String,
  name: { firstName: String, lastName: String },
  email: { primary: String, secondary: String },
  phone: { primary: String, secondary: String },
  job: String,
  location: String,
  links: { facebook: String, linkedIn: String, instagram: String },
  about: String,
  allTags: [String],
  organisations: [mongoose.Types.ObjectId],
  date: { type: Date, default: Date.now },
});

// mongoose.models = {}
// const User = mongoose.model("Users", UserSchema);
// export default User;

export default mongoose.models.User || mongoose.model("User", UserSchema);
