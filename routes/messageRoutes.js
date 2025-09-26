const express = require("express");
const router = express.Router();
const { createMessage, getMessages } = require("../controllers/messageController");

router.get("/getMessages", getMessages);
router.post("/createMessage", createMessage);

module.exports = router;
