import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Clock, BarChart2, ChevronRight, Layers, CheckCircle } from "lucide-react";

export default function ProblemListModal({ isOpen, onClose, problems }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (problemId) => {
    navigate(`/solve/${problemId}`);
    onClose(); // Close modal after selection
  };

  // Helper to style difficulty
  const getDifficultyMeta = (level) => {
    switch (level) {
      case 1:
        return { label: "Easy", color: "text-green-700 bg-green-100 border-green-200" };
      case 2:
        return { label: "Medium", color: "text-amber-700 bg-amber-100 border-amber-200" };
      case 3:
        return { label: "Hard", color: "text-red-700 bg-red-100 border-red-200" };
      default:
        return { label: "Unknown", color: "text-gray-700 bg-gray-100" };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Select a Problem</h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose a challenge to start coding
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="overflow-y-auto p-4 space-y-3">
          {problems.map((problem) => {
            const diff = getDifficultyMeta(problem.difficulty);
            const statusColor = problem.status === "Solved" ? "text-green-700 bg-green-100 border-green-200" : problem.status === "In Progress" ? "text-amber-700 bg-amber-100 border-amber-200" : "text-gray-700 bg-gray-100 border-gray-200";

            return (
              <div
                key={problem._id}
                onClick={() => handleNavigate(problem.problemId)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md hover:bg-indigo-50/30 transition-all cursor-pointer bg-white"
              >
                {/* Left Side: Title & Skill */}
                <div className="mb-3 sm:mb-0">
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                    {problem.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md capitalize">
                      <Layers size={12} />
                      {problem.skillKey}
                    </span>
                  </div>
                </div>

                {/* Right Side: Meta Data */}
                <div className="flex items-center gap-4 text-sm">
                  
                  {/* Time Estimate */}
                  <div className="flex items-center gap-1.5 text-gray-500" title="Estimated Time">
                    <Clock size={16} />
                    <span>{Math.floor(problem.estimatedTime / 60)} min</span>
                  </div>

                  {/* Difficulty Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${diff.color}`}>
                    {diff.label}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor}`}>
                    <span className="flex items-center justify-center gap-0.5">{problem.status === "Solved" ? <CheckCircle size={15}/> : ""}{problem.status}</span>
                  </span>

                  {/* Arrow Icon */}
                  <ChevronRight 
                    size={20} 
                    className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" 
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer (Optional) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl text-center">
          <p className="text-xs text-gray-400">
            {problems.length} problems available
          </p>
        </div>
      </div>
    </div>
  );
}