"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function WeeklyBarChart({ data }: { data: Array<{ week: string; amount: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: -18, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ background: "rgba(15,23,42,0.94)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }} />
        <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#818cf8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
