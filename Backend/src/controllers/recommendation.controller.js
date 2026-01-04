import { getNextRecommendation } from "../services/recommendation.service.js";
import { getNextRecommendationWithAI } from "../services/recommendation.service.js";

const getNextProblem = async (req, res, next) => {
  try {
    const result = await getNextRecommendation(req.user.id);

    if (!result) {
      return res.json({ message: "No recommendation available" });
    }

    res.json({
      problem: result.problem,
      reason: result.reason
    });
  } catch (err) {
    next(err);
  }
};
const getNextProblemWithAI = async (req, res, next) => {
  try {
    const result = await getNextRecommendationWithAI(req.user.id);
    if (!result) {
      return res.json({ message: "No recommendation available" });
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export { getNextProblem, getNextProblemWithAI };
