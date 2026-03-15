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

io.on("connection",(socket)=>{
  console.log("user connected",socket.id);
  
  socket.on("test",(data)=>{
    console.log(data);
    io.emit("test",data);
  })

  socket.on("join_room", async ({ roomId, userId, problemId }) => {
    socket.userId = userId;
    
    try {
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
      
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId} for problem ${problemId}`);
      
      // Ensure all users in room get the updated count from DB
      const updatedCollab = await Collaboration.findOne({ roomId });
      io.to(roomId).emit("room_update", { count: updatedCollab?.users?.length || 0 });
      socket.to(roomId).emit("user_joined", { userId });
    } catch (err) {
      console.error("Join room DB update failed", err);
    }
  });


  const cleanupRoom = async (roomId) => {
    try {
      const collab = await Collaboration.findOne({ roomId });
      if (collab && collab.users.length === 0) {
        // Wait a bit before deleting to allow for quick re-joins/refreshes
        setTimeout(async () => {
          const checkCollab = await Collaboration.findOne({ roomId });
          if (checkCollab && checkCollab.users.length === 0) {
            await Collaboration.deleteOne({ roomId });
            console.log(`Cleaned up empty room: ${roomId}`);
          }
        }, 30000); // 30 seconds grace period
      }
    } catch (err) {
      console.error("Room cleanup failed", err);
    }
  };

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
          io.to(roomId).emit("room_update", { count: collab.users.length });
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
        io.to(roomId).emit("room_update", { count: collab.users.length });
        if (collab.users.length === 0) {
          cleanupRoom(roomId);
        }
      }
    } catch (err) {
      console.error("Leave room DB update failed", err);
    }
  });




  socket.on("code_change", ({ roomId, code }) => {

    socket.to(roomId).emit("code_update", code);
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