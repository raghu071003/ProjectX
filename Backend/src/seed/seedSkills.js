import e from "express";
import SkillNode from "../models/SkillNode.js";

const skills = [
  {
    key: "arrays",
    name: "Arrays",
    baseDifficulty: 1,
    prerequisites: []
  },
  {
    key: "hashing",
    name: "Hashing",
    baseDifficulty: 2,
    prerequisites: ["arrays"]
  },
  {
    key: "two_pointers",
    name: "Two Pointers",
    baseDifficulty: 2,
    prerequisites: ["arrays"]
  },
  {
    key: "sliding_window",
    name: "Sliding Window",
    baseDifficulty: 3,
    prerequisites: ["arrays", "hashing"]
  }
];

const seedSkills = async () => {
  for (const skill of skills) {
    await SkillNode.updateOne(
      { key: skill.key },
      { $setOnInsert: skill },
      { upsert: true }
    );
  }
  console.log("Skill graph seeded");
};

export default seedSkills;
