import Link from "next/link";
import { AlertTriangle, ArrowLeft, BadgeIndianRupee, BellRing, BrainCircuit, CalendarClock, Flame, Gauge, HeartPulse, MessageCircle, Moon, ShoppingBag, Trophy } from "lucide-react";
import { CategoryPieChart } from "@/components/charts/category-pie-chart";
import { SpendingTrendChart } from "@/components/charts/spending-trend-chart";
import { WeeklyBarChart } from "@/components/charts/weekly-bar-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { GlassCard } from "@/components/ui/glass-card";
import { RiskMeter } from "@/components/ui/risk-meter";
import { analyzeTransactions } from "@/lib/analyze";
import { mockTransactions, monthlyBudget } from "@/lib/mock-data";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function DashboardPage() {
  const analysis = analyzeTransactions(mockTransactions, monthlyBudget);

  return (
    <main className="min-h-screen px-5 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" /> DigiKhata
            </Link>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Behaviour dashboard</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Forward-looking signals from realistic Indian transaction behaviour.</p>
          </div>
          <Link href="/analyze" className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">
            Analyze new data
          </Link>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={BadgeIndianRupee} label="Monthly spending" value={inr.format(analysis.monthlyTotal)} delta={`${inr.format(monthlyBudget)} budget tracked`} />
          <MetricCard icon={Flame} label="Impulse score" value={`${analysis.scores.impulse}/100`} delta="Shopping and food orders are leading drivers" tone="rose" />
          <MetricCard icon={BrainCircuit} label="AI risk score" value={`${analysis.scores.aiRisk}/100`} delta={`${inr.format(analysis.scores.overspendPrediction)} projected overspend`} tone="indigo" />
          <MetricCard icon={HeartPulse} label="Budget health" value={`${analysis.scores.budgetHealth}/100`} delta="Needs lighter weekend and late-night spending" tone="emerald" />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
          <GlassCard className="p-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Spending trend</h2>
                <p className="mt-1 text-sm text-slate-400">Daily transaction rhythm</p>
              </div>
              <Gauge className="h-5 w-5 text-cyan-200" />
            </div>
            <SpendingTrendChart data={analysis.dailyTrend} />
          </GlassCard>
          <GlassCard className="p-5">
            <h2 className="text-xl font-semibold">Category breakdown</h2>
            <CategoryPieChart data={analysis.categoryTotals} />
            <div className="grid gap-2">
              {analysis.categoryTotals.slice(0, 4).map((item) => (
                <div key={item.category} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{item.category}</span>
                  <span className="font-medium">{inr.format(item.amount)}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
          <GlassCard className="p-5">
            <h2 className="text-xl font-semibold">AI spending risk meter</h2>
            <RiskMeter value={analysis.scores.aiRisk} label="Overspending probability" />
          </GlassCard>
          <GlassCard className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Weekly spending graph</h2>
                <p className="mt-1 text-sm text-slate-400">Salary-week and weekend pressure</p>
              </div>
              <CalendarClock className="h-5 w-5 text-indigo-200" />
            </div>
            <WeeklyBarChart data={analysis.weeklyTotals} />
          </GlassCard>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-5 lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <BrainCircuit className="h-5 w-5 text-cyan-200" />
              <h2 className="text-xl font-semibold">AI insight cards</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {analysis.insights.map((insight) => (
                <div key={insight} className="rounded-[8px] border border-white/10 bg-slate-950/35 p-4 text-sm leading-6 text-slate-200">{insight}</div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <Trophy className="h-5 w-5 text-amber-200" />
              <h2 className="text-xl font-semibold">Top merchants</h2>
            </div>
            <div className="space-y-3">
              {analysis.merchantTotals.map((item, index) => (
                <div key={item.merchant} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-white/8 text-xs text-white">{index + 1}</span>
                    {item.merchant}
                  </span>
                  <span className="font-medium">{inr.format(item.amount)}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="mt-6">
          <GlassCard className="p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <BellRing className="h-5 w-5 text-teal-200" />
                <div>
                  <h2 className="text-xl font-semibold">Personalized nudge queue</h2>
                  <p className="mt-1 text-sm text-slate-400">Generated from Anakin-normalized merchant, amount, category, and timestamp signals.</p>
                </div>
              </div>
              <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs text-teal-100">Ready for WhatsApp, push, or in-app</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {analysis.nudges.map((nudge) => (
                <div key={nudge.id} className="rounded-[8px] border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">{nudge.channel}</p>
                      <h3 className="mt-1 text-lg font-semibold">{nudge.title}</h3>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs ${nudge.priority === "high" ? "bg-rose-400/15 text-rose-100" : "bg-amber-300/15 text-amber-100"}`}>
                      {nudge.priority}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{nudge.message}</p>
                  <div className="mt-4 rounded-[8px] bg-white/[0.04] p-3 text-sm text-teal-100">{nudge.action}</div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5" /> {nudge.trigger}</span>
                    <span className="shrink-0 text-slate-200">{inr.format(nudge.projectedSavings)} save</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <Moon className="h-5 w-5 text-indigo-200" />
              <h2 className="text-xl font-semibold">Danger hours</h2>
            </div>
            <div className="space-y-3">
              {analysis.dangerHours.map((item) => (
                <div key={item.hour} className="rounded-[8px] bg-white/[0.04] p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{item.hour}</span>
                    <span>{inr.format(item.amount)}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-rose-300" style={{ width: `${Math.min(100, item.amount / 45)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-rose-200" />
              <h2 className="text-xl font-semibold">Category ranking</h2>
            </div>
            <div className="space-y-3">
              {analysis.categoryTotals.map((item) => (
                <div key={item.category} className="flex items-center justify-between rounded-[8px] bg-white/[0.04] px-3 py-2 text-sm">
                  <span className="text-slate-300">{item.category}</span>
                  <span>{inr.format(item.amount)}</span>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-200" />
              <h2 className="text-xl font-semibold">Behaviour timeline</h2>
            </div>
            <div className="space-y-4">
              {analysis.timeline.map((item) => (
                <div key={item.label} className="border-l border-white/15 pl-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{item.label}</p>
                    <span className={`rounded-full px-2 py-1 text-xs ${item.risk === "high" ? "bg-rose-400/15 text-rose-100" : item.risk === "medium" ? "bg-amber-300/15 text-amber-100" : "bg-emerald-300/15 text-emerald-100"}`}>{item.risk}</span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{item.event}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
