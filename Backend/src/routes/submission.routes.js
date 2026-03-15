import { Router } from "express";
import { submitSolution, runCodeHandler } from "../controllers/submission.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/", protect, submitSolution);
router.post("/run", protect, runCodeHandler);

export default router;