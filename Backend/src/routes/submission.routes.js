import { Router } from "express";
import { submitSolution } from "../controllers/submission.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/", protect, submitSolution);

export default router;