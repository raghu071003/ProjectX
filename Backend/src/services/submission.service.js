import calculateNewMastery from "../algorithms/masteryCalculator.js";
import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";
import UserSkillState from "../models/UserSkillState.js";
import { evaluateSubmission } from "./codeEvaluation.service.js";
import { runCode } from "./compiler.service.js";
import { generateExplanation } from "./explanation.service.js";


const createSubmission = async (userId, data) => {
  let execution = null;
  let verdict = null;

  // 1️⃣ Fetch problem
  const problem = await Problem.findOne({
    problemId: data.problemId,
  });

  if (!problem) {
    throw new Error("Problem not found");
  }

  // 2️⃣ Evaluate submission
  if (data.sourceCode && data.language) {
    const judgeResult = await evaluateSubmission({
      sourceCode: data.sourceCode,
      language: data.language,
      problem,
    });

    execution = {
      success: judgeResult.success,
      error: judgeResult.error || null,
      summary: judgeResult.summary || null,
      testCases: judgeResult.testCases || [],
      hiddenTestFailed: judgeResult.hiddenTestFailed || false,
    };

    verdict = judgeResult.success
      ? "Accepted"
      : judgeResult.error || "Rejected";
  }

  // 3️⃣ Save submission
  const submission = await Submission.create({
    userId,
    skillKey: problem.skillKey,
    problemId: problem.problemId,
    correct: execution?.success ?? data.correct,
    timeTaken: data.timeTaken || 0,
    mistakes: data.mistakes || [],
    complexity: data.complexity || null,
  });

  // 4️⃣ Fetch skill state
  const skillState = await UserSkillState.findOne({
    userId,
    skillKey: problem.skillKey,
  });

  if (!skillState) {
    throw new Error("Skill state not found");
  }

  // 5️⃣ Calculate mastery
  const masteryBefore = skillState.mastery;

  const newMastery = calculateNewMastery({
    previousMastery: masteryBefore,
    correct: submission.correct,
    timeTaken: submission.timeTaken,
    mistakesCount: submission.mistakes.length,
  });

  skillState.masteryHistory.push({ mastery: newMastery });

  const masteryAfter = newMastery;

  const explanation = generateExplanation({
    correct: submission.correct,
    masteryBefore,
    masteryAfter,
    mistakesCount: submission.mistakes.length,
    skillName: skillState.skillKey,
  });

  // 6️⃣ Update skill stats
  skillState.attempts += 1;
  skillState.mastery = newMastery;

  skillState.avgTime =
    (skillState.avgTime * (skillState.attempts - 1) +
      submission.timeTaken) /
    skillState.attempts;

  submission.mistakes.forEach((m) => {
    skillState.mistakes.set(
      m,
      (skillState.mistakes.get(m) || 0) + 1
    );
  });

  await skillState.save();

  // 7️⃣ Return judge-style response
  return {
    submission,
    verdict,
    execution,
    updatedSkill: skillState,
    explanation,
  };
};



export { createSubmission };
