import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../store/slices/skillsSlice";
import { fetchRecommendation } from "../store/slices/recommendationSlice";
import SkillCard from "../components/SkillCard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.list);
  const recommendation = useSelector(
    (state) => state.recommendation.data
  );

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchRecommendation());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* Recommendation */}
      {recommendation && (
        <div className="p-4 rounded-lg bg-blue-50 border">
          <h2 className="font-semibold text-lg">
            Recommended Next
          </h2>
          <p className="mt-1">
            {recommendation.problem.title}
          </p>
          <p className="text-sm text-gray-600">
            {recommendation.reason}
          </p>
        </div>
      )}

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Skill Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <SkillCard key={skill.key} skill={skill} />
          ))}
        </div>
      </div>

    </div>
  );
}
