import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js"; // Import Message model
import User from "../models/user.model.js"; // Import User model (assuming this is where user info is stored)

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("sendMessage", async ({ senderId, receiverId, text, image }) => {
    try {
      // Fetch sender name from the User model
      const sender = await User.findById(senderId);

      // Save message to DB
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image,
        readBy: [senderId], // Sender initially marks it as read
      });

      await newMessage.save();

      // Emit message event to receiver with sender's name
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", {
          ...newMessage._doc, // Add the message data
          senderName: sender.username, // Include sender's name
        });
      }

      // Emit unread count to receiver
      const unreadCount = await Message.countDocuments({
        receiverId,
        readBy: { $ne: receiverId },
      });

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("unreadUpdate", unreadCount);
      }
    } catch (error) {
      console.error("Error in sendMessage socket event:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
