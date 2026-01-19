import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills, fetchSkillTrend } from "../store/slices/skillsSlice";
import { fetchRecommendation } from "../store/slices/recommendationSlice";
import SkillCard from "../components/SkillCard";
import SkillTrendChart from "../components/SkillTrendChart";
import { useNavigate } from "react-router-dom";
import { fetchProblemsBySkill } from "../store/slices/problemSlice";
import ProblemListModal from "../components/ProblemsList";

// const SkillTrendChart = ({ data }) => {
//   if (!data) return null;
  
//   return (
//     <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
//       <h3 className="text-white font-semibold text-lg mb-4">Skill Trend</h3>
//       <div className="h-64 flex items-end justify-between space-x-2">
//         {data.map((point, idx) => (
//           <div key={idx} className="flex-1 flex flex-col items-center">
//             <div className="w-full bg-gray-900 rounded-t-lg relative group cursor-pointer">
//               <div
//                 className="bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg transition-all duration-300 hover:from-indigo-500 hover:to-purple-500"
//                 style={{ height: `${point.value * 2}px` }}
//               ></div>
//               <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                 <span className="text-white text-xs font-medium">{point.value}%</span>
//               </div>
//             </div>
//             <span className="text-gray-500 text-xs mt-2">{point.date}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
export default function Dashboard() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.list);
  const recommendation = useSelector((state) => state.recommendation.data);
  const trends = useSelector((s) => s.skills.trends);
  const problem = useSelector((s)=>s.problem)
   const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchRecommendation());
  }, [dispatch]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const selectSkill = (skillKey) => {
    dispatch(fetchProblemsBySkill(skillKey));
    setIsModalOpen(true)
    setSelectedSkill(skillKey);
    dispatch(fetchSkillTrend(skillKey));
    
  };
  // console.log(recommendation);
   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Recommendation */}
        {recommendation && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 border border-indigo-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
            <div className="relative">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-xl text-white">Recommended Next</h2>
              </div>
              <p className="mt-2 text-white font-medium text-lg">{recommendation.problem.title}</p>
              <p className="text-sm text-indigo-100 mt-1">{recommendation.reason}</p>

              <button className="mt-4 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition" onClick={()=>navigate('/solve/'+recommendation.problem.problemId)}>
                Start Problem
              </button>
            </div>
          </div>
        )}

        {/* {selectedSkill && <SkillTrendChart data={trends[selectedSkill]} />} */}
        <ProblemListModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        problems={problem.problemsList} 
      />

        {/* Skills */}
        <div>
          {skills.length === 0 && (
            <div className="p-8 border border-gray-700 rounded-xl bg-gray-800 text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">
                You haven't started practicing yet. Solve a problem to begin tracking your skills.
              </p>
              <button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2 rounded-lg font-medium transition">
                Browse Problems
              </button>
            </div>
          )}

          {skills.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-white">Skill Progress</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <SkillCard key={skill.key} skill={skill} onSelect={selectSkill} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
