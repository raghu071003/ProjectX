import SkillProgress from "./SkillProgressBar";

export default function SkillCard({ skill,onSelect }) {
  const masteryPercent = Math.round(skill.mastery * 100);
  const isWeak = skill.mastery < 0.4;

  return (
    <div
      className={`relative p-8 border rounded-3xl bg-[#161b22] shadow-2xl cursor-pointer group hover:scale-[1.02] transition-all duration-500 overflow-hidden ${
        isWeak ? "border-red-500/20" : "border-gray-800 hover:border-indigo-500/30"
      }`}
      onClick={() => onSelect(skill.key)}
    >
      <div className="absolute top-0 right-0 p-8 -mr-8 -mt-8 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all duration-500"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="font-black text-white text-lg tracking-tight uppercase group-hover:text-indigo-400 transition-colors">{skill.name}</h3>
        <div className="flex flex-col items-end">
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Mastery</span>
           <span className="text-xl font-black text-white">{masteryPercent}<span className="text-indigo-500 text-sm">%</span></span>
        </div>
      </div>

      <div className="relative z-10">
        <SkillProgress mastery={skill.mastery} />
      </div>

      <div className="mt-8 flex justify-between items-center relative z-10">
        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">Neural Mapping Active</span>
        <div className="w-6 h-6 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-indigo-500/30 transition-all">
           <div className={`w-1.5 h-1.5 rounded-full ${isWeak ? 'bg-red-500' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse'}`}></div>
        </div>
      </div>
    </div>
  );
};
