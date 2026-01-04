import { createSubmission } from "../services/submission.service.js";
const submitSolution = async (req, res, next) => {
  try {
    const result = await createSubmission(req.user.id, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export { submitSolution };
