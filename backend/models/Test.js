const mongoose = require("mongoose")

const TestSchema = new mongoose.Schema({
    name: {firstName: String, lastName: String},
    email: String,
    password: String,

})

module.exports = mongoose.models.TestSchema || mongoose.model('individual', TestSchema);