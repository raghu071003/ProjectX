export default function ExplanationPanel({ explanation }) {
  if (!explanation) return null;

  return (
    <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
      <h3 className="font-semibold text-blue-900">
        {explanation.title}
      </h3>
      <p className="text-sm text-blue-800 mt-1">
        {explanation.message}
      </p>
    </div>
  );
}
