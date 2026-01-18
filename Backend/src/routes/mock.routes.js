import { startMock, submitMockSolution ,endMock} from "../controllers/mock.controller.js";
import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/start", protect, startMock);
router.post("/:sessionId/submit",protect, submitMockSolution);
router.post("/:sessionId/end",protect, endMock);

export default router;


