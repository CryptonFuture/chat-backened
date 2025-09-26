const File = require("../models/fileModel");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = new File({
      filename: req.file.filename,
      filepath: `/uploads/${req.file.filename}`,
      filetype: req.file.mimetype,
      size: req.file.size,
      uploader: req.body.uploader || "anonymous",
    });

    await file.save();

    res.json({ success: true, file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { uploadFile, getFiles };
