const mongoose = require("mongoose")

const TestSchema = new mongoose.Schema({
    name: {firstName: String, lastName: String},
    email: String,
    password: String,

})

const Test = mongoose.model("Individual", TestSchema)

module.exports = Test;