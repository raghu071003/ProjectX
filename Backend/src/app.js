import express from "express";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import skillsRouter from "./routes/skills.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";

const app = express();
app.use(express.json());
connectDB();



app.use("/api/auth", authRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/submissions", submissionRoutes);
app.use('/api/recommendations',recommendationRoutes );


export default app;