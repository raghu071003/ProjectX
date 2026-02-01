import { AlertTriangle, CheckCircle, Clock, Database, Lightbulb, Star } from "lucide-react";

export default function AICoachPanel({ feedback, onClose }) {
  if (!feedback) return null;

  const { timeComplexity, spaceComplexity, rating, suggestions, summary } = feedback;

  return (
    <div className="bg-white border-t border-gray-200 shadow-xl fixed bottom-0 left-0 right-0 z-50 max-h-[50vh] overflow-y-auto lg:relative lg:max-h-full lg:shadow-none animate-in slide-in-from-bottom-5 w-full">
      <div className="p-4 bg-gradient-to-r from-purple-700 to-indigo-800 text-white flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400 fill-yellow-400" size={20} />
          <h3 className="font-bold text-lg">AI Code Coach</h3>
        </div>
        <button 
          onClick={onClose}
          className="hover:bg-white/20 p-1 rounded-full transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Rating Section */}
        <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-indigo-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-indigo-600 drop-shadow-md"
                strokeDasharray={`${rating * 10}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute text-xl font-bold text-indigo-700">{rating}</span>
          </div>
          <div>
            <p className="text-sm text-indigo-900 font-semibold mb-1">Code Quality Score</p>
            <p className="text-xs text-indigo-700 leading-tight">{summary}</p>
          </div>
        </div>

        {/* Complexity Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex flex-col items-center text-center">
            <Clock className="text-orange-500 mb-1" size={20} />
            <p className="text-xs text-orange-800 font-semibold uppercase tracking-wide">Time</p>
            <p className="font-bold text-gray-900">{timeComplexity}</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex flex-col items-center text-center">
            <Database className="text-blue-500 mb-1" size={20} />
            <p className="text-xs text-blue-800 font-semibold uppercase tracking-wide">Space</p>
            <p className="font-bold text-gray-900">{spaceComplexity}</p>
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
            <Lightbulb className="text-yellow-500" size={18} />
             Suggestions
          </h4>
          <ul className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex gap-3 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                <AlertTriangle className="text-gray-400 flex-shrink-0 mt-0.5" size={16} />
                
                  <span className="text-gray-600">   {suggestion}</span>
                
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center pt-2">
            <p className="text-xs text-gray-400 italic">Powered by Gemini AI</p>
        </div>
      </div>
    </div>
  );
}
