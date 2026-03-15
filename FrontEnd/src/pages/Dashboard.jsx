import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills, fetchSkillTrend } from "../store/slices/skillsSlice";
import { fetchRecommendation } from "../store/slices/recommendationSlice";
import SkillCard from "../components/SkillCard";
import SkillTrendChart from "../components/SkillTrendChart";
import { useNavigate } from "react-router-dom";
import { fetchProblemsBySkill } from "../store/slices/problemSlice";
import ProblemListModal from "../components/ProblemsList";
import LiveStats from "../components/LiveStats";
import { Rocket, Trophy, Target, Sparkles } from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.list);
  const recommendation = useSelector((state) => state.recommendation.data);
  const loadingRecommendation = useSelector((state) => state.recommendation.loadingRecommendation);
  const problem = useSelector((s)=>s.problem);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchRecommendation());
  }, [dispatch]);

  const [selectedSkill, setSelectedSkill] = useState(null);
  const selectSkill = (skillKey) => {
    dispatch(fetchProblemsBySkill(skillKey));
    setIsModalOpen(true);
    setSelectedSkill(skillKey);
    dispatch(fetchSkillTrend(skillKey));
  };

  return (
    <div className="min-h-screen bg-[#0d1117] py-12 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-800">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Engineer Console <Sparkles className="text-indigo-500 animate-pulse" size={24} />
            </h1>
            <p className="text-gray-500 font-medium mt-1">Master your skills through collaborative real-time challenges.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block">Current Rank</span>
                <span className="text-white font-bold">Standard Cadet</span>
             </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <LiveStats />
        
        {/* Recommendation Hero */}
        {recommendation && (
          <div className="group relative transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-8 rounded-3xl bg-[#161b22] border border-gray-800 flex flex-col md:flex-row items-center gap-8 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-indigo-500/10 rounded-full blur-3xl"></div>
              
              <div className="w-20 h-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                <Rocket className="w-10 h-10 text-indigo-400 group-hover:animate-bounce" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Mission Recommended</span>
                  <div className="h-[1px] w-8 bg-indigo-500/40"></div>
                </div>
                <h2 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                  {recommendation.problem.title}
                </h2>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-2xl">
                  {recommendation.reason} {recommendation.explanation && <span className="italic text-gray-500">— "{recommendation.explanation}"</span>}
                </p>
              </div>

              <button 
                className="group/btn relative inline-flex items-center justify-center px-8 py-4 font-black text-xs uppercase tracking-widest text-white transition-all duration-300 ease-in-out bg-indigo-600 rounded-2xl hover:bg-indigo-500 shadow-xl shadow-indigo-500/20 active:scale-95 shrink-0"
                onClick={() => navigate('/solve/' + recommendation.problem.problemId)}
              >
                Engage Target <ChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Modals & Popups */}
        <ProblemListModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          problems={problem.problemsList} 
        />

        {/* Skills Section */}
        <div className="space-y-8 pt-6">
          <div className="flex items-center gap-3">
             <Trophy className="text-yellow-500" size={24} />
             <h2 className="text-2xl font-black text-white tracking-tight uppercase">Skill Matrix</h2>
          </div>

          {skills.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-gray-800 rounded-3xl bg-[#161b22]/50 text-center group transition-colors hover:border-indigo-500/30">
              <div className="w-20 h-20 bg-gray-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Neural Link Inactive</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-8">
                You haven't initiated any training protocols. Complete a challenge to begin mapping your engineering capabilities.
              </p>
              <button className="bg-white text-black px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition active:scale-95 shadow-xl">
                Initiate First Mission
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <SkillCard key={skill.key} skill={skill} onSelect={selectSkill} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
