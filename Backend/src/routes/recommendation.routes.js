import { Router } from "express";
import { getNextProblem, getNextProblemWithAI } from "../controllers/recommendation.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/next", protect, getNextProblem);
router.get("/next-ai", protect, getNextProblemWithAI);
export default router;
