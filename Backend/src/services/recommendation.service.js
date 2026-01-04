
import Problem from "../models/Problem.js";
import UserSkillState from "../models/UserSkillState.js";
import SkillNode from "../models/SkillNode.js";
import canUnlock from "../algorithms/canUnlock.js";
import recommendProblem from "../algorithms/recommendation.js";
import explainRecommendation from "./aiExplanation.service.js";


const   getNextRecommendation = async (userId) => {
  const skills = await SkillNode.find();
  const states = await UserSkillState.find({ userId });
  const problems = await Problem.find();

  // Build skill map
  const stateMap = {};
  states.forEach(s => (stateMap[s.skillKey] = s));

  const userSkills = {};
  skills.forEach(skill => {
    userSkills[skill.key] = {
      key: skill.key,
      name: skill.name,
      mastery: stateMap[skill.key]?.mastery || 0,
      unlocked: canUnlock(skill, stateMap)
    };
  });

  return recommendProblem({ problems, userSkills });
};


const getNextRecommendationWithAI = async (userId) => {
  const result = await getNextRecommendation(userId);
  if (!result) return null;

  const explanation = await explainRecommendation({
    problem: result.problem,
    skill: result.problem.skillKey,
    mastery: result.problem.difficulty / 5,
    mistakes: [] // later from submissions
  });

  return {
    ...result,
    explanation
  };
};



export { getNextRecommendation, getNextRecommendationWithAI };
