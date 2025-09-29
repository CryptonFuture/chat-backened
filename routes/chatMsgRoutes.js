const express = require("express");
const { createChatMsg, getChatMsgs } = require("../controllers/chatMsgController");
const upload = require("../middleware/upload");
const { auth } = require('../middleware/authMiddleware')

const router = express.Router();

router.post("/createChatMsg", auth, upload.single("file"), createChatMsg);
router.get("/getChatMsg", auth, getChatMsgs);

module.exports = router;
