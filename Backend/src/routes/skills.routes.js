import { Router } from "express";
import {getMySkills, getSkillTrend} from "../controllers/skills.controller.js";
import {protect} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/my",protect, getMySkills);
router.get("/trend/:skillKey",protect, getSkillTrend);

export default router;
