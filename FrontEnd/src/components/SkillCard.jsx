import SkillProgress from "./SkillProgressBar";

export default function SkillCard({ skill }) {
  const masteryPercent = Math.round(skill.mastery * 100);
  const isWeak = skill.mastery < 0.4;

  return (
    <div
      className={`p-4 border rounded-lg bg-white shadow-sm ${
        isWeak ? "border-red-400" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{skill.name}</h3>
        <span className="text-sm text-gray-600">{masteryPercent}%</span>
      </div>

      <SkillProgress mastery={skill.mastery} />

      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        {/* <span>Attempts: {skill.attempts}</span> */}
        {/* <span>Avg Time: {skill.avgTime.toFixed(1)}s</span> */}
      </div>
    </div>
  );
}
