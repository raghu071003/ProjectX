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
      <div className="relative w-full max-w-3xl bg-[#0d1117] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] border border-gray-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#161b22] rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">Select a Problem</h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose a challenge to start coding
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
 
        {/* Scrollable List */}
        <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {problems.map((problem) => {
            const diff = getDifficultyMeta(problem.difficulty);
            const statusColor = problem.status === "Solved" ? "text-green-400 bg-green-500/10 border-green-500/20" : problem.status === "In Progress" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-gray-400 bg-gray-800 border-gray-700";
 
            return (
              <div
                key={problem._id}
                onClick={() => handleNavigate(problem.problemId)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-800 hover:border-indigo-500/50 hover:shadow-lg hover:bg-[#161b22] transition-all cursor-pointer bg-[#0d1117]"
              >
                {/* Left Side: Title & Skill */}
                <div className="mb-3 sm:mb-0">
                  <h3 className="font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">
                    {problem.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                      <Layers size={12} />
                      {problem.skillKey}
                    </span>
                  </div>
                </div>
 
                {/* Right Side: Meta Data */}
                <div className="flex items-center gap-4 text-xs">
                  
                  {/* Time Estimate */}
                  <div className="flex items-center gap-1.5 text-gray-500" title="Estimated Time">
                    <Clock size={16} />
                    <span className="font-medium">{Math.floor(problem.estimatedTime / 60)} min</span>
                  </div>
 
                  {/* Difficulty Badge */}
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${diff.label === 'Easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' : diff.label === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                    {diff.label}
                  </span>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${statusColor}`}>
                    <span className="flex items-center justify-center gap-1">{problem.status === "Solved" ? <CheckCircle size={14}/> : ""}{problem.status}</span>
                  </span>
 
                  {/* Arrow Icon */}
                  <ChevronRight 
                    size={20} 
                    className="text-gray-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" 
                  />
                </div>
              </div>
            );
          })}
        </div>
 
        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#161b22] rounded-b-2xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
            {problems.length} challenges synchronized
          </p>
        </div>
      </div>

    </div>
  );
}