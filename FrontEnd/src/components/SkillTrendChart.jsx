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
    <div className="h-64 bg-[#161b22] p-6 rounded-2xl border border-gray-800 shadow-xl">
      <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Mastery Progression</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={(d) => new Date(d).toLocaleDateString()}
            stroke="#6b7280"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={[0, 1]} 
            stroke="#6b7280"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${Math.round(v * 100)}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0d1117', 
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#fff'
            }}
            itemStyle={{ color: '#818cf8' }}
          />
          <Line
            type="monotone"
            dataKey="mastery"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: '#161b22' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

