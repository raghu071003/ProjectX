import { getUserSkills } from "../services/skills.service.js";

const getMySkills = async (req, res, next) => {
  try {
    const skills = await getUserSkills(req.user.id);
    res.json({ skills });
  } catch (err) {
    next(err);
  }
};
export {getMySkills};
