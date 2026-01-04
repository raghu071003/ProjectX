export default function ExecutionResult({ execution }) {
  if (!execution) return null;

  const isSuccess = execution.success;

  return (
    <div
      className={`mt-4 p-4 rounded-lg border ${
        isSuccess
          ? "border-green-400 bg-green-50 text-green-900"
          : "border-red-400 bg-red-50 text-red-900"
      }`}
    >
      <h3 className="font-semibold mb-2">
        {isSuccess ? "Output" : "Error"}
      </h3>

      <pre className="text-sm whitespace-pre-wrap">
        {execution.stdout || execution.stderr}
      </pre>

      {execution.time && (
        <p className="text-xs mt-2 opacity-70">
          Execution time: {execution.time}s
        </p>
      )}
    </div>
  );
}
