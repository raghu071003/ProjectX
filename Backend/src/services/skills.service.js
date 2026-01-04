import SkillNode from "../models/SkillNode.js";
import UserSkillState from "../models/UserSkillState.js";
import canUnlock from "../algorithms/canUnlock.js";

const getUserSkills = async (userId) => {
  const skills = await SkillNode.find();
  const userStates = await UserSkillState.find({ userId });

  const stateMap = {};
  userStates.forEach(s => (stateMap[s.skillKey] = s));

  return skills.map(skill => ({
    key: skill.key,
    name: skill.name,
    mastery: stateMap[skill.key]?.mastery || 0,
    unlocked: canUnlock(skill, stateMap)
  }));
};

export { getUserSkills };
