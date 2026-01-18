import UserSkillState from "../models/UserSkillState.js";
import { getUserSkills } from "../services/skills.service.js";

const getMySkills = async (req, res, next) => {
  try {
    const skills = await getUserSkills(req.user.id);
    res.json({ skills });
  } catch (err) {
    next(err);
  }
};

const getSkillTrend = async (req, res) => {
  const { skillKey } = req.params;

  const skill = await UserSkillState.findOne({
    userId: req.user.id,
    skillKey
  });

  res.json({
    trend: skill.masteryHistory
  });
};

export {getMySkills,getSkillTrend};
