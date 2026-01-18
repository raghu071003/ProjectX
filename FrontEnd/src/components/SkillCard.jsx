import SkillProgress from "./SkillProgressBar";

export default function SkillCard({ skill,onSelect }) {
  const masteryPercent = Math.round(skill.mastery * 100);
  const isWeak = skill.mastery < 0.4;

  return (
    <div
      className={`p-6 border rounded-xl bg-gray-800 shadow-lg cursor-pointer hover:border-indigo-500/50 transition ${
        isWeak ? "border-red-500/50" : "border-gray-700"
      }`}
      onClick={() => onSelect(skill.key)}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-white">{skill.name}</h3>
        <span className="text-sm text-gray-400 font-medium">{masteryPercent}%</span>
      </div>

      <SkillProgress mastery={skill.mastery} />

      <div className="mt-4 text-xs text-gray-500 flex justify-between">
        {/* <span>Attempts: {skill.attempts}</span> */}
        {/* <span>Avg Time: {skill.avgTime.toFixed(1)}s</span> */}
      </div>
    </div>
  );
};
