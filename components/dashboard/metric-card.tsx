import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function MetricCard({
  icon: Icon,
  label,
  value,
  delta,
  tone = "cyan"
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
  tone?: "cyan" | "indigo" | "rose" | "emerald";
}) {
  const toneClass = {
    cyan: "bg-cyan-300/15 text-cyan-100",
    indigo: "bg-indigo-300/15 text-indigo-100",
    rose: "bg-rose-300/15 text-rose-100",
    emerald: "bg-emerald-300/15 text-emerald-100"
  }[tone];

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-[8px] ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-300">{delta}</p>
    </GlassCard>
  );
}
