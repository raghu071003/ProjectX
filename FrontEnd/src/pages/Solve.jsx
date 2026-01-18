import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendation } from "../store/slices/recommendationSlice";
import { submitCode } from "../store/slices/submissionSlice";
import CodeEditor from "../components/CodeEditor";
import ExecutionResult from "../components/ExecutionResult";
import React from "react";
import ExplanationPanel from "../components/ExplanationPanel";


export default function Solve() {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const recommendation = useSelector(
    (state) => state.recommendation.data
  );

  const { result, loading } = useSelector(
    (state) => state.submission
  );

  useEffect(() => {
    dispatch(fetchRecommendation());
  }, [dispatch]);

  const runCode = () => {
    if (!recommendation) return;

    dispatch(
      submitCode({
        skillKey: recommendation.problem.skillKey,
        problemId: recommendation.problem.problemId,
        language: language,
        sourceCode: code,
        mistakes: []
      })
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      
      {/* Problem Info */}
      {recommendation && (
        <div className="p-4 border rounded-lg bg-slate-50">
          <h1 className="text-xl font-bold">
            {recommendation.problem.title}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {recommendation.reason}
          </p>
        </div>
      )}

      {/* Code Editor */}
      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
        onRun={runCode}
        loading={loading}
      />

      {/* Execution Result */}
      <ExecutionResult execution={result?.execution} />
      <ExplanationPanel explanation={result?.explanation} />

      {/* Mastery Feedback */}
      {result?.updatedSkill && (
        <div className="p-4 border rounded-lg bg-white">
          <p className="font-medium">
            Mastery Updated:{" "}
            <span className="font-bold">
              {(result.updatedSkill.mastery * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
