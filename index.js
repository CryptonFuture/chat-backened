const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const messageRoutes = require("./routes/messageRoutes");
const connectMongoDb = require('./mongodb_connection/conn')
const cors = require('cors')
const Message = require("./models/messageModel");
const ChatMsg = require("./models/chatMsgModel");
const { config } = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const chatMsgRoutes = require('./routes/chatMsgRoutes')
const fileRoutes = require("./routes/fileRoutes");
const path = require('path')

config({
  path: '.env'
})

const port = process.env.PORT

connectMongoDb()

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatMsgRoutes);
app.use("/api/files", fileRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});


// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("joinRoom", (roomData) => {
//     const { room, username } = roomData;
//     socket.join(room);
//     socket.room = room;
//     socket.username = username;

//     console.log(`User ${username} joined room: ${room}`);
//     socket.emit("joinedRoom", room);

//     socket.to(room).emit("systemMessage", {
//       text: `👋 ${username} has joined the room.`,
//     });
//   });

//   socket.on("leaveRoom", () => {
//     const { room, username } = socket;
//     if (room && username) {
//       socket.leave(room);
//       console.log(`User ${username} left room: ${room}`);

//       socket.to(room).emit("systemMessage", {
//         text: `🚪 ${username} has left the room.`,
//       });

//       socket.emit("leftRoom", room);
//     }
//   });

//   socket.on("disconnect", () => {
//     const { room, username } = socket;
//     if (room && username) {
//       console.log(`User ${username} disconnected from room: ${room}`);

//       socket.to(room).emit("systemMessage", {
//         text: `❌ ${username} has disconnected.`,
//       });
//     }
//   });

//   socket.on("chat message", async ({ room, sender, text }) => {
//     console.log(`Message in room ${room}: ${text}`);

//     const newMessage = await Message.create({ sender, text, room });
//     io.to(room).emit("chat message", newMessage);
//   });

   
// });

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("private_message", async (msgData) => {
    console.log("📨 Message received:", msgData);

    io.emit("private_message", msgData);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});


server.listen(port, () => {
  console.log('listening on *:4000');
});
