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
import {Server} from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: corsConfig });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

io.on("connection",(socket)=>{
  console.log("user connected",socket.id);
  
  socket.on("test",(data)=>{
    console.log(data);
    io.emit("test",data);
  })

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("code_change", ({ roomId, code }) => {
    socket.to(roomId).emit("code_update", code);
  });

  socket.on("send_broadcast", (data) => {
    socket.broadcast.emit("receive_broadcast", data);
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