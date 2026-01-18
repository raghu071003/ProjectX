import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function SkillTrendChart({ data }) {
  return (
    <div className="h-64 bg-white p-4 rounded border">
      <h3 className="font-semibold mb-2">Progress Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={(d) => new Date(d).toLocaleDateString()}
          />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="mastery"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
