const MockSession = require("../models/MockSession");
const { default: Problem } = require("../models/Problem");

const startMock = async (req, res) => {
  // console.log(req.user)
  const { duration = 1800 } = req.body; // default 30 mins

  // Pick problems (simple logic for now)
  const problems = await Problem.find({})
    .limit(3)
    .select("problemId skillKey difficulty");

  const session = await MockSession.create({
    userId: req.user.id,
    problems,
    duration,
  });

  res.status(201).json({
  sessionId: session._id,
  problems: session.problems,
  startedAt: session.startedAt,
  duration: session.duration,
  currentIndex: 0
});
};
const submitMockSolution = async (req, res) => {
  const { sessionId } = req.params;
  const { problemId, correct, timeTaken } = req.body;

  const session = await MockSession.findById(sessionId);

  if (!session || session.completed) {
    return res.status(400).json({ message: "Session invalid" });
  }
  const elapsed = (Date.now() - session.startedAt.getTime()) / 1000;

  if (elapsed > session.duration) {
    session.completed = true;
    await session.save();
    return res.status(403).json({
      message: "Time is up. Mock interview ended.",
    });
  }

  session.submissions.push({
    problemId,
    correct,
    timeTaken,
  });

  await session.save();

  res.json({ success: true });
};

const endMock = async (req, res) => {
  const session = await MockSession.findById(req.params.sessionId);

  session.completed = true;
  await session.save();

  const total = session.submissions.length;
  const correct = session.submissions.filter((s) => s.correct).length;

  res.json({
    totalProblems: session.problems.length,
    attempted: total,
    correct,
    accuracy: total ? (correct / total) * 100 : 0,
  });
};

module.exports = { startMock, submitMockSolution, endMock };
