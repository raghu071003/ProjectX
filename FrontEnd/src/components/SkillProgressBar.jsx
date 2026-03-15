export default function SkillProgress({ mastery }) {
  const percentage = Math.round(mastery * 100);

  let color = "bg-red-500";
  if (percentage >= 70) color = "bg-green-500";
  else if (percentage >= 40) color = "bg-yellow-500";

  return (
    <div className="w-full bg-[#0d1117] rounded-full h-2.5 p-0.5 border border-gray-800 shadow-inner">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
          percentage >= 70 
            ? "bg-gradient-to-r from-emerald-600 to-green-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
            : percentage >= 40 
              ? "bg-gradient-to-r from-yellow-600 to-amber-400" 
              : "bg-gradient-to-r from-red-600 to-rose-400"
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};