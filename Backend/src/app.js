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

const app = express();
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


app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});



export default app;