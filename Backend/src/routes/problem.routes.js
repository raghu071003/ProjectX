import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getProblem, getProblemsUnderSkill, getStatus, search } from "../controllers/problem.controller.js";

const router = Router();

// Define problem-related routes here
router.get("/search/:search",protect,search);
router.get("/:problemId", protect,getProblem);
router.get("/skill/:skillKey",protect,getProblemsUnderSkill);
router.get("/status/:problemId",protect,getStatus);

export default router;