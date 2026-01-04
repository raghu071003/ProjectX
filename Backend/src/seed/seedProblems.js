import Problem from "../models/Problem.js";

const problems = [
  {
    problemId: "two_sum",
    title: "Two Sum",
    skillKey: "arrays",
    difficulty: 1,
    estimatedTime: 300
  },
  {
    problemId: "best_time_buy_sell",
    title: "Best Time to Buy and Sell Stock",
    skillKey: "arrays",
    difficulty: 2,
    estimatedTime: 600
  },
  {
    problemId: "contains_duplicate",
    title: "Contains Duplicate",
    skillKey: "hashing",
    difficulty: 2,
    estimatedTime: 400
  },
  {
    problemId: "longest_substring",
    title: "Longest Substring Without Repeating Characters",
    skillKey: "sliding_window",
    difficulty: 3,
    estimatedTime: 900
  }
];

const seedProblems = async () => {
  for (const p of problems) {
    await Problem.updateOne(
      { problemId: p.problemId },
      { $setOnInsert: p },
      { upsert: true }
    );
  }
  console.log("Problems seeded");
};

export default seedProblems;
