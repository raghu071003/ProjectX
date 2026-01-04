import SkillNode from "../models/SkillNode.js";
import  UserSkillState from "../models/UserSkillState.js";

const initializeUserSkills = async (userId) => {
  const skills = await SkillNode.find();

  const skillStates = skills.map(skill => ({
    userId,
    skillKey: skill.key,
    mastery: skill.prerequisites.length === 0 ? 0.1 : 0
  }));

  await UserSkillState.insertMany(skillStates);
};

export default initializeUserSkills;
