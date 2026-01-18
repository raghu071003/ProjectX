const generateExplanation = ({
  correct,
  masteryBefore,
  masteryAfter,
  mistakesCount,
  skillName
}) => {
  if (correct) {
    return {
      title: "Good Progress",
      message: `You solved this problem correctly. Your ${skillName} mastery increased from ${Math.round(
        masteryBefore * 100
      )}% to ${Math.round(masteryAfter * 100)}%.`
    };
  }

  if (mistakesCount > 0) {
    return {
      title: "Needs Improvement",
      message: `You struggled with this ${skillName} problem. Focus on reducing repeated mistakes and improving your approach before moving to harder problems.`
    };
  }

  return {
    title: "Keep Practicing",
    message: `This problem helped reinforce your ${skillName} fundamentals. Keep practicing similar difficulty problems to improve consistency.`
  };
};

module.exports = { generateExplanation };
