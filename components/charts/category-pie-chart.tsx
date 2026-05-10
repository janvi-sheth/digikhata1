"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#22d3ee", "#818cf8", "#fb7185", "#34d399", "#fbbf24", "#a78bfa"];

export function CategoryPieChart({ data }: { data: Array<{ category: string; amount: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="amount" nameKey="category" innerRadius={66} outerRadius={104} paddingAngle={4}>
          {data.map((entry, index) => (
            <Cell key={entry.category} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "rgba(15,23,42,0.94)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
