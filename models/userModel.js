const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    online: {
        type: Boolean,
        default: 0
    },

    image: {
        type: String,
        default: null
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('User', authSchema)

