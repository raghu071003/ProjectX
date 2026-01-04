const recommendProblem = ({ problems, userSkills }) => {
  // 1. Only unlocked skills
  const unlockedSkills = Object.values(userSkills)
    .filter(s => s.unlocked)
    .sort((a, b) => a.mastery - b.mastery); // weakest first

  if (unlockedSkills.length === 0) return null;

  // 2. Target weakest unlocked skill
  const targetSkill = unlockedSkills[0];

  // 3. Filter problems for that skill
  const candidates = problems.filter(
    p => p.skillKey === targetSkill.key
  );

  if (candidates.length === 0) return null;

  // 4. Pick problem closest to user's level
  candidates.sort((a, b) => {
    const scoreA = Math.abs(a.difficulty - (targetSkill.mastery * 5));
    const scoreB = Math.abs(b.difficulty - (targetSkill.mastery * 5));
    return scoreA - scoreB;
  });

  return {
    problem: candidates[0],
    reason: `Weakest unlocked skill: ${targetSkill.name}`
  };
};

export default recommendProblem;