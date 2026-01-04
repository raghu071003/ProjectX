import { Router } from "express";
import {getMySkills} from "../controllers/skills.controller.js";
import {protect} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/my",protect, getMySkills);

export default router;
