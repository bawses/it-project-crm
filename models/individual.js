import mongoose from "mongoose";

var Schema = mongoose.Schema;

const individualSchema = Schema({
  name: {firstName: String, lastName: String},
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
})

mongoose.models = {}

const Individual = mongoose.model("individuals", individualSchema);

export default Individual;