import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getProblem, getProblemsUnderSkill, getStatus } from "../controllers/problem.controller.js";

const router = Router();

// Define problem-related routes here
router.get("/:problemId", protect,getProblem); 
router.get("/skill/:skillKey",protect,getProblemsUnderSkill);  
router.get("/status/:problemId",protect,getStatus);

export default router;