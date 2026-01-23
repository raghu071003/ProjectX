export default function ExecutionResult({ execution }) {
  if (!execution) return null;

  const isSuccess = execution.success;

  return (
    <div
      className={`mt-4 p-5 rounded-xl border-2 shadow-lg ${
        isSuccess
          ? "border-green-500/50 bg-gray-800"
          : "border-red-500/50 bg-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        {isSuccess ? (
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ) : (
          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}

        <h3
          className={`font-semibold text-lg ${
            isSuccess ? "text-green-400" : "text-red-400"
          }`}
        >
          {isSuccess ? "Accepted" : execution.error || "Error"}
        </h3>
      </div>

      {/* Summary */}
      {execution.summary && (
        <div className="mb-4 text-sm text-gray-400">
          Passed {execution.summary.passed} / {execution.summary.total} testcases
        </div>
      )}

      {/* Hidden test failure */}
      {!isSuccess && execution.hiddenTestFailed && (
        <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm">
          ❗ Failed on one or more hidden testcases
        </div>
      )}

      {/* Testcase List */}
      {execution.testCases?.length > 0 && (
        <div className="space-y-4">
          {execution.testCases.map((tc) => (
            <div
              key={tc.index}
              className={`p-4 rounded-lg border ${
                tc.status === "PASSED"
                  ? "border-green-500/30 bg-gray-900/50"
                  : "border-red-500/30 bg-gray-900/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-300">
                  Testcase #{tc.index + 1}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    tc.status === "PASSED"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {tc.status}
                </span>
              </div>

              {/* Passed output */}
              {tc.status === "PASSED" && tc.output && (
                <pre className="text-xs text-gray-400 bg-black/30 p-3 rounded whitespace-pre-wrap">
                  Output: {tc.output}
                </pre>
              )}

              {/* Failed details */}
              {tc.status === "FAILED" && (
                <div className="space-y-2 text-xs">
                  <pre className="text-gray-300 bg-black/30 p-3 rounded whitespace-pre-wrap">
                    Input: {tc.input}
                  </pre>
                  <pre className="text-green-300 bg-black/30 p-3 rounded whitespace-pre-wrap">
                    Expected: {tc.expectedOutput}
                  </pre>
                  <pre className="text-red-300 bg-black/30 p-3 rounded whitespace-pre-wrap">
                    Your Output: {tc.actualOutput}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
