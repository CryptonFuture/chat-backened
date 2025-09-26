 const mongoose = require("mongoose");

const chatMsgSchema = new mongoose.Schema({
    sender: { 
        type: String, 
    },
    receiver: { 
        type: String, 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },

    time: {
        type: String,
    },

    fileUrl: { 
        type: String 
    },

    fileType: { 
        type: String 
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("ChatMsg", chatMsgSchema);
