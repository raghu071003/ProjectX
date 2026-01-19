export default function ExplanationPanel({ explanation }) {
  if (!explanation) return null;

   return (
    <div className="mt-6 p-5 border-l-4 border-indigo-500 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-lg text-white">
            {explanation.title}
          </h3>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            {explanation.message}
          </p>
        </div>
      </div>
    </div>
  );
};
