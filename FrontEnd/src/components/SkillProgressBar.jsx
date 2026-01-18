export default function SkillProgress({ mastery }) {
  const percentage = Math.round(mastery * 100);

  let color = "bg-red-500";
  if (percentage >= 70) color = "bg-green-500";
  else if (percentage >= 40) color = "bg-yellow-500";

  return (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};