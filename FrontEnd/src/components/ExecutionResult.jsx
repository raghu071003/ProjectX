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
      <div className="flex items-center mb-3">
        {isSuccess ? (
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        ) : (
          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        <h3 className={`font-semibold text-lg ${isSuccess ? "text-green-400" : "text-red-400"}`}>
          {isSuccess ? "Output" : "Error"}
        </h3>
      </div>

      <div className={`p-4 rounded-lg font-mono ${isSuccess ? "bg-gray-900/50" : "bg-gray-900/50"}`}>
        <pre className={`text-sm whitespace-pre-wrap ${isSuccess ? "text-gray-300" : "text-red-300"}`}>
          {execution.stdout || execution.stderr}
        </pre>
      </div>

      {execution.time && (
        <div className="flex items-center mt-3 text-xs text-gray-400">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Execution time: {execution.time}s
        </div>
      )}
    </div>
  );
};
