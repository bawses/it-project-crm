import mongoose from "mongoose";
import { IUser } from "../../components/DataTypes";

/*TODO: add min/max length for Strings and error message for required fields */

const UserSchema = new mongoose.Schema<IUser>(
  {
    passwordHash: { type: String, required: true },
    name: { type: { firstName: String, lastName: String }, required: true },
    email: { type: [String], required: true },
    phone: [String],
    job: String,
    location: String,
    links: { facebook: String, linkedIn: String, instagram: String },
    about: String,
    allTags: [String],
    organisations: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
