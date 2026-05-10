import { ShieldAlert } from "lucide-react";

export function RiskMeter({ value, label }: { value: number; label: string }) {
  const rotation = -90 + (Math.min(100, Math.max(0, value)) / 100) * 180;

  return (
    <div className="relative flex min-h-[220px] flex-col items-center justify-end overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04] p-6">
      <div className="absolute inset-x-6 top-8 h-28 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-56 rounded-full border-[18px] border-white/10" />
        <div className="absolute inset-x-0 top-0 h-56 rounded-full border-[18px] border-transparent border-l-indigo-400 border-r-rose-400 border-t-cyan-300" />
        <div
          className="absolute bottom-0 left-1/2 h-1 w-24 origin-left rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.75)] transition-transform duration-700"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-slate-950/80 text-cyan-200 ring-1 ring-white/15">
        <ShieldAlert className="h-6 w-6" />
      </div>
      <div className="relative z-10 mt-4 text-center">
        <p className="text-4xl font-semibold tracking-tight">{value}</p>
        <p className="mt-1 text-sm text-slate-300">{label}</p>
      </div>
    </div>
  );
}
