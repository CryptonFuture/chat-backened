const Message = require("../models/messageModel");

exports.createMessage = async (req, res) => {
  try {
    const { sender, text, room  } = req.body;

     if (!room) {
      return res.status(400).json({ success: false, message: "Room is required" });
    }

    const newMessage = await Message.create({ sender, text, room });

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { room } = req.query;
    const filter = room ? { room } : {};
    const messages = await Message.find(filter).sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

