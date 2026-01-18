import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startMock,
  endMock,
  nextProblem,
  prevProblem,
  lockMock
} from "../store/slices/mockSlice";
import CodeEditor from "../components/CodeEditor";

export default function MockInterview() {
  const dispatch = useDispatch();
  const { session, summary, currentIndex, locked } =
    useSelector((s) => s.mock);

  const [timeLeft, setTimeLeft] = useState(0);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  // Start mock
  useEffect(() => {
    dispatch(startMock(1800));
  }, [dispatch]);

  // Timer
  useEffect(() => {
    if (!session) return;

    const endTime =
      new Date(session.startedAt).getTime() +
      session.duration * 1000;

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((endTime - Date.now()) / 1000)
      );

      setTimeLeft(remaining);

      if (remaining === 0) {
        dispatch(lockMock());
        dispatch(endMock(session.sessionId));
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (summary) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-4">
          Mock Interview Summary
        </h1>
        <p>Accuracy: {summary.accuracy.toFixed(1)}%</p>
        <p>Attempted: {summary.attempted}</p>
        <p>Total Problems: {summary.totalProblems}</p>
      </div>
    );
  }

  if (!session) {
    return <p className="p-6">Starting mock interview…</p>;
  }

  const problem = session.problems[currentIndex];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">
          Mock Interview
        </h1>
        <span className="font-mono">
          ⏱ {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Problem */}
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-semibold">
          {problem.title}
        </h2>
        <p className="text-sm text-gray-600">
          Skill: {problem.skillKey} · Difficulty:{" "}
          {problem.difficulty}
        </p>
      </div>

      {/* Editor */}
      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
        onRun={() => {}}
        loading={false}
      />

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          disabled={currentIndex === 0 || locked}
          onClick={() => dispatch(prevProblem())}
        >
          ← Previous
        </button>

        <button
          disabled={
            currentIndex === session.problems.length - 1 ||
            locked
          }
          onClick={() => dispatch(nextProblem())}
        >
          Next →
        </button>
      </div>

      {/* End */}
      <button
        disabled={locked}
        onClick={() => dispatch(endMock(session.sessionId))}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        End Interview
      </button>
    </div>
  );
}
