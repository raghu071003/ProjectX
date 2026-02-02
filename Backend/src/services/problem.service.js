import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";


const getProblemById = async (problemId) => {
  const problem = await Problem.findOne({ problemId });
  if (!problem) {
    throw new Error("Problem not found");
  }
    return problem;
};

const getProblemsBySkill = async (skillKey, userId) => {
  const problems = await Problem.find({ skillKey }).lean();
  if (!problems.length) {
    throw new Error("No problems found for this skill");
  }

  await Promise.all(
    problems.map(async (problem) => {
      problem.status = await checkStatus(userId, problem.problemId);
    })
  );

  return problems;
};


const checkStatus = async(userId, problemId) => {
  const submission = await Submission.findOne({ userId, problemId});
  if (!submission) {
    return "Unattempted";
  }
  return submission.correct ? "Solved" : "Attempted";
}

const searchProblems = async(search) => {
  const problems = await Problem.find({ title: { $regex: search, $options: "i" } }).lean();
  if (!problems.length) {
    throw new Error("No problems found for this search");
  }
  const result = problems.map((problem) => ({
    label: problem.title,
    value: problem.problemId,
  }));
  return result;
}
export { getProblemById, getProblemsBySkill, checkStatus, searchProblems };