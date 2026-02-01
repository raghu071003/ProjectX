import { analyzeCode } from "../services/aiCoach.service.js";

export const analyze = async (req, res, next) => {
  try {
    const { code, language, problemTitle } = req.body;

    if (!code || !language) {
      return res.status(400).json({ message: "Code and language are required" });
    }

    const feedback = await analyzeCode(code, language, problemTitle || "Unknown Problem");
    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};
