const ChatMsg = require("../models/chatMsgModel");

const createChatMsg = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver) {
      return res.status(400).json({ error: "Sender & Receiver required" });
    }

    const newMsg = new ChatMsg({
      sender,
      receiver,
      text: text || "",
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      fileType: req.file ? req.file.mimetype : null,
    });

    await newMsg.save();

    return res.json({ success: true, message: newMsg });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getChatMsgs = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const msgs = await ChatMsg.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createChatMsg, getChatMsgs };
