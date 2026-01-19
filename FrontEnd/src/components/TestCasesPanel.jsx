export default function TestCasesPanel({ testCases }) {
  if (!testCases || testCases.length === 0) return null;

  const visibleCases = testCases.filter(tc => !tc.isHidden);
  const hiddenCount = testCases.filter(tc => tc.isHidden).length;

  return (
    <div className="p-4 border rounded-lg bg-white space-y-3">
      <h2 className="font-semibold text-lg">Test Cases</h2>

      {visibleCases.map((tc, index) => (
        <div
          key={tc._id}
          className="p-3 bg-slate-50 border rounded-md"
        >
          <p className="text-sm font-medium">
            Test Case {index + 1}
          </p>

          <div className="mt-2 text-sm">
            <p className="font-semibold">Input</p>
            <pre className="bg-white p-2 rounded border overflow-x-auto">
              {tc.input}
            </pre>
          </div>

          <div className="mt-2 text-sm">
            <p className="font-semibold">Expected Output</p>
            <pre className="bg-white p-2 rounded border overflow-x-auto">
              {tc.expectedOutput}
            </pre>
          </div>
        </div>
      ))}

      {hiddenCount > 0 && (
        <p className="text-sm text-gray-500">
          + {hiddenCount} hidden test case{hiddenCount > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
