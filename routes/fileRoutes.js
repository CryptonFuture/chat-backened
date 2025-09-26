const express = require("express");
const { uploadFile, getFiles } = require("../controllers/fileController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles); 
module.exports = router;
