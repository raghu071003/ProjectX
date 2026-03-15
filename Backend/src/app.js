import express from "express";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import skillsRouter from "./routes/skills.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";
import mockRouter from "./routes/mock.routes.js"
import cors from "cors";
import corsConfig from "./config/corsConfig.js";
import problemRoutes from "./routes/problem.routes.js";    
import profileRoutes from "./routes/profile.routes.js";
import collaborationRoutes from "./routes/collaboration.routes.js";
import {Server} from "socket.io";
import { createServer } from "http";
import Collaboration from "./models/Collaboration.js";


const app = express();
const server = createServer(app);
const io = new Server(server, { cors: corsConfig });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.headers['access-control-request-private-network']) {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
  }
  next();
});
app.use(cors(corsConfig));
connectDB();



import aiCoachRouter from "./routes/aiCoach.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/submissions", submissionRoutes);
app.use('/api/recommendations',recommendationRoutes );
app.use("/api/mock",mockRouter);
app.use("/api/problems",problemRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/ai-coach", aiCoachRouter);
app.use("/api/collaboration", collaborationRoutes);

const roomCleanupTimeouts = new Map();
let globalActiveUsers = new Set();
let globalActiveRooms = new Set();

const broadcastGlobalStats = (io) => {
  io.emit("global_stats_update", {
    activeUsers: globalActiveUsers.size,
    activeRooms: globalActiveRooms.size,
  });
};

io.on("connection",(socket)=>{
  console.log("user connected",socket.id);
  globalActiveUsers.add(socket.id);
  broadcastGlobalStats(io);
  
  socket.on("test",(data)=>{
    console.log(data);
    io.emit("test",data);
  })

  socket.on("join_room", async ({ roomId, userId, problemId }) => {
    socket.userId = userId;
    socket.roomId = roomId; // Store for presence
    
    try {
      // ... existing cleanup logic ...
      // Cancel cleanup if it was scheduled
      if (roomCleanupTimeouts.has(roomId)) {
        clearTimeout(roomCleanupTimeouts.get(roomId));
        roomCleanupTimeouts.delete(roomId);
        console.log(`Cleanup cancelled for room: ${roomId}`);
      }

      let collab = await Collaboration.findOne({ roomId });
      
      if (collab) {
        if (collab.problemId !== problemId) {
          socket.emit("join_error", "This room is already in use for a different problem.");
          return;
        }
        collab.users.addToSet(userId);
        await collab.save();
      } else {
        collab = await Collaboration.create({
          roomId,
          problemId,
          users: [userId]
        });
      }
      
      // Cancel cleanup if it was scheduled
      if (roomCleanupTimeouts.has(roomId)) {
        clearTimeout(roomCleanupTimeouts.get(roomId));
        roomCleanupTimeouts.delete(roomId);
      }

      globalActiveRooms.add(roomId);
      broadcastGlobalStats(io);

      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId} for problem ${problemId}`);
      
      // Ensure all users in room get the updated count and latest state from DB
      const updatedCollab = await Collaboration.findOne({ roomId });
      io.to(roomId).emit("room_update", { 
        count: updatedCollab?.users?.length || 0,
        code: updatedCollab?.code || "",
        language: updatedCollab?.language || "javascript",
        userJoined: userId
      });
      socket.to(roomId).emit("user_joined", { userId });
    } catch (err) {
      console.error("Join room DB update failed", err);
    }
  });


  const cleanupRoom = async (roomId) => {
    try {
      const collab = await Collaboration.findOne({ roomId });
      if (collab && collab.users.length === 0) {
        // Clear any existing timeout for this room
        if (roomCleanupTimeouts.has(roomId)) {
          clearTimeout(roomCleanupTimeouts.get(roomId));
        }

        const timeoutId = setTimeout(async () => {
          const checkCollab = await Collaboration.findOne({ roomId });
          if (checkCollab && checkCollab.users.length === 0) {
            await Collaboration.deleteOne({ roomId });
            console.log(`Cleaned up empty room: ${roomId}`);
            roomCleanupTimeouts.delete(roomId);
            globalActiveRooms.delete(roomId);
            broadcastGlobalStats(io);
          }
        }, 30000); // 30 seconds grace period

        roomCleanupTimeouts.set(roomId, timeoutId);
      }
    } catch (err) {
      console.error("Room cleanup failed", err);
    }
  };

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    globalActiveUsers.delete(socket.id);
    broadcastGlobalStats(io);
  });

  socket.on("disconnecting", async () => {
    const rooms = [...socket.rooms].filter(r => r !== socket.id);
    const userId = socket.userId;

    if (!userId) return;

    for (const roomId of rooms) {
      try {
        const collab = await Collaboration.findOneAndUpdate(
          { roomId },
          { $pull: { users: userId } },
          { new: true }
        );
        if (collab) {
          io.to(roomId).emit("room_update", { 
            count: collab.users.length,
            userLeft: userId 
          });
          if (collab.users.length === 0) {
            cleanupRoom(roomId);
          }
        }
      } catch (err) {
        console.error("Disconnect DB update failed", err);
      }
    }
  });

  socket.on("leave_room", async ({ roomId, userId }) => {
    try {
      const collab = await Collaboration.findOneAndUpdate(
        { roomId },
        { $pull: { users: userId } },
        { new: true }
      );
      socket.leave(roomId);
      if (collab) {
        io.to(roomId).emit("room_update", { 
          count: collab.users.length,
          userLeft: userId
        });
        if (collab.users.length === 0) {
          cleanupRoom(roomId);
        }
      }
    } catch (err) {
      console.error("Leave room DB update failed", err);
    }
  });




  socket.on("code_change", async ({ roomId, code }) => {
    socket.to(roomId).emit("code_update", code);
    try {
      await Collaboration.findOneAndUpdate({ roomId }, { code });
    } catch (err) {
      console.error("Failed to persist code change", err);
    }
  });

  socket.on("language_change", async ({ roomId, language }) => {
    socket.to(roomId).emit("language_update", language);
    try {
      await Collaboration.findOneAndUpdate({ roomId }, { language });
    } catch (err) {
      console.error("Failed to persist language change", err);
    }
  });

  socket.on("send_broadcast", async (data) => {
    try {
      // Persist the broadcast info in the Collaboration document
      await Collaboration.findOneAndUpdate(
        { roomId: data.roomId },
        { 
          problemId: data.problemId,
          problemName: data.problemName,
          message: data.message,
          senderId: data.senderId,
          isPublic: true 
        },
        { upsert: true, new: true }
      );
      
      // Emit to everyone else as before
      socket.broadcast.emit("receive_broadcast", data);
    } catch (err) {
      console.error("Failed to persist broadcast", err);
    }
  });

  socket.on("request_join", ({ targetUserId, problemId, roomId, requesterName }) => {
    io.to(targetUserId).emit("receive_join_request", { 
      requesterId: socket.id, 
      problemId, 
      roomId,
      requesterName 
    });
  });

  socket.on("confirm_join", ({ requesterId, roomId, problemId }) => {
    // Notify the requester (User B)
    io.to(requesterId).emit("navigate_to_room", { roomId, problemId });
    // Notify the acceptor/owner (User A - Self)
    socket.emit("navigate_to_room", { roomId, problemId });
  });
})
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});



export { app, server };