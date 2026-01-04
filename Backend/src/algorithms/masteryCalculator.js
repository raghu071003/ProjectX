const calculateNewMastery = ({
  previousMastery,
  correct,
  timeTaken,
  mistakesCount
}) => {
  let delta = 0;

  if (correct) delta += 0.05;
  else delta -= 0.04;

  if (timeTaken < 600) delta += 0.02;       // fast solve
  if (timeTaken > 1200) delta -= 0.02;      // slow solve

  delta -= mistakesCount * 0.01;

  let newMastery = previousMastery + delta;

  // Clamp between 0 and 1
  if (newMastery < 0) newMastery = 0;
  if (newMastery > 1) newMastery = 1;

  return Number(newMastery.toFixed(3));
};

export default calculateNewMastery;