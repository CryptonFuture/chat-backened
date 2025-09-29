const express = require("express");
const router = express.Router();
const { createMessage, getMessages } = require("../controllers/messageController");
const { auth } = require('../middleware/authMiddleware')

router.get("/getMessages", auth, getMessages);
router.post("/createMessage", auth, createMessage);

module.exports = router;
