import express from "express";
import { analyze } from "../controllers/aiCoach.controller.js";

const router = express.Router();

router.post("/analyze", analyze);

export default router;
