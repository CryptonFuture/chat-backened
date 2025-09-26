const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: { 
        type: String, 
        required: true 
    },
    filepath: { 
        type: String, 
        required: true 
    },
    filetype: { 
        type: String, 
        required: true 
    },
    size: { 
        type: Number, 
        required: true 
    },
    uploader: { 
        type: String, 
        default: "anonymous" 
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
