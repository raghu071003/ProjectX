import calculateNewMastery from "../algorithms/masteryCalculator.js";
import Submission from "../models/Submission.js";
import UserSkillState from "../models/UserSkillState.js";
import { runCode } from "./compiler.service.js";
import { generateExplanation } from "./explanation.service.js";

const createSubmission = async (userId, data) => {
  let execution = null;

  // 1. Execute code if provided
  if (data.sourceCode && data.language) {
    execution = await runCode({
      sourceCode: data.sourceCode,
      language: data.language,
    });
  }

  // 2. Save submission
  const submission = await Submission.create({
    userId,
    skillKey: data.skillKey,
    problemId: data.problemId,
    correct: execution ? execution.success : data.correct,
    timeTaken: execution?.time || data.timeTaken || 0,
    mistakes: data.mistakes || [],
    complexity: data.complexity || null,
  });

  // 3. Fetch skill state
  const skillState = await UserSkillState.findOne({
    userId,
    skillKey: data.skillKey,
  });

  if (!skillState) {
    throw new Error("Skill state not found");
  }

  // 4. Calculate mastery
  const newMastery = calculateNewMastery({
    previousMastery: skillState.mastery,
    correct: submission.correct,
    timeTaken: submission.timeTaken,
    mistakesCount: submission.mistakes.length,
  });
  skillState.masteryHistory.push({
    mastery: newMastery,
  });

  const masteryBefore = skillState.mastery;
  const masteryAfter = newMastery;

  const explanation = generateExplanation({
    correct: submission.correct,
    masteryBefore,
    masteryAfter,
    mistakesCount: submission.mistakes.length,
    skillName: skillState.skillKey,
  });

  // 5. Update skill stats
  skillState.attempts += 1;
  skillState.mastery = newMastery;
  skillState.avgTime =
    (skillState.avgTime * (skillState.attempts - 1) + submission.timeTaken) /
    skillState.attempts;

  submission.mistakes.forEach((m) => {
    skillState.mistakes.set(m, (skillState.mistakes.get(m) || 0) + 1);
  });

  await skillState.save();

  return {
    submission,
    execution,
    updatedSkill: skillState,
    explanation,
  };
};

export { createSubmission };
