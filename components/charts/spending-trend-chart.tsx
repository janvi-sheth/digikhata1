"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SpendingTrendChart({ data }: { data: Array<{ day: string; amount: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ left: -18, right: 10, top: 12, bottom: 0 }}>
        <defs>
          <linearGradient id="trend" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.75} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.06} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ background: "rgba(15,23,42,0.94)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }} />
        <Area type="monotone" dataKey="amount" stroke="#22d3ee" strokeWidth={3} fill="url(#trend)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
