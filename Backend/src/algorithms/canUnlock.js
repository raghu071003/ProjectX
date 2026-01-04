const canUnlock = (skillNode, userSkillMap) => {
  return skillNode.prerequisites.every(prereq =>
    userSkillMap[prereq] && userSkillMap[prereq].mastery >= 0.7
  );
};

export default canUnlock;