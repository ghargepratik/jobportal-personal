const mongoose = require('mongoose')

const contactUsSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    phonenumber: { type: Number, require: true },
    message: { type: String, require: true },
})

module.exports = mongoose.model('contactus', contactUsSchema)
