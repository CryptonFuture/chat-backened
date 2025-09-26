const express = require("express");
const { createChatMsg, getChatMsgs } = require("../controllers/chatMsgController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/createChatMsg", upload.single("file"), createChatMsg);
router.get("/getChatMsg", getChatMsgs);

module.exports = router;
