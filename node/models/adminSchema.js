const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
    },
    expireToken: {
        type: String,
    },
    appliedjobsid: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobs',
        },
    ],
})

module.exports = mongoose.model('admin', adminSchema)
