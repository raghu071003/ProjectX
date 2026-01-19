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
    key: "strings",
    name: "Strings",
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
  },
  {
    key: "sorting",
    name: "Sorting",
    baseDifficulty: 2,
    prerequisites: ["arrays"]
  },
  {
    key: "binary_search",
    name: "Binary Search",
    baseDifficulty: 2,
    prerequisites: ["arrays", "sorting"]
  },
  {
    key: "stack",
    name: "Stack",
    baseDifficulty: 2,
    prerequisites: []
  },
  {
    key: "queue",
    name: "Queue",
    baseDifficulty: 2,
    prerequisites: []
  },
  {
    key: "linked_list",
    name: "Linked List",
    baseDifficulty: 2,
    prerequisites: []
  },
  {
    key: "recursion",
    name: "Recursion",
    baseDifficulty: 3,
    prerequisites: []
  },
  {
    key: "backtracking",
    name: "Backtracking",
    baseDifficulty: 4,
    prerequisites: ["recursion"]
  },
  {
    key: "greedy",
    name: "Greedy Algorithms",
    baseDifficulty: 3,
    prerequisites: ["sorting"]
  },
  {
    key: "heap",
    name: "Heap / Priority Queue",
    baseDifficulty: 3,
    prerequisites: ["arrays"]
  },
  {
    key: "tree",
    name: "Trees",
    baseDifficulty: 3,
    prerequisites: ["recursion"]
  },
  {
    key: "binary_tree",
    name: "Binary Tree",
    baseDifficulty: 3,
    prerequisites: ["tree"]
  },
  {
    key: "bst",
    name: "Binary Search Tree",
    baseDifficulty: 3,
    prerequisites: ["binary_tree", "binary_search"]
  },
  {
    key: "graph",
    name: "Graphs",
    baseDifficulty: 4,
    prerequisites: ["tree"]
  },
  {
    key: "bfs",
    name: "Breadth-First Search",
    baseDifficulty: 3,
    prerequisites: ["graph", "queue"]
  },
  {
    key: "dfs",
    name: "Depth-First Search",
    baseDifficulty: 3,
    prerequisites: ["graph", "recursion"]
  },
  {
    key: "dynamic_programming",
    name: "Dynamic Programming",
    baseDifficulty: 5,
    prerequisites: ["recursion"]
  },
  {
    key: "bit_manipulation",
    name: "Bit Manipulation",
    baseDifficulty: 3,
    prerequisites: []
  },
  {
    key: "trie",
    name: "Trie",
    baseDifficulty: 4,
    prerequisites: ["tree", "strings"]
  },
  {
    key: "union_find",
    name: "Union Find (Disjoint Set)",
    baseDifficulty: 4,
    prerequisites: ["graph"]
  },
  {
    key: "topological_sort",
    name: "Topological Sort",
    baseDifficulty: 4,
    prerequisites: ["graph", "dfs"]
  },
  {
    key: "shortest_path",
    name: "Shortest Path Algorithms",
    baseDifficulty: 5,
    prerequisites: ["graph", "heap"]
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
