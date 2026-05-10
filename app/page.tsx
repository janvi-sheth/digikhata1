import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  Clock3,
  CreditCard,
  Landmark,
  LineChart,
  Radar,
  ReceiptText,
  ShieldCheck,
  Zap
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";

const features = [
  {
    icon: BrainCircuit,
    title: "Behaviour engine",
    copy: "Scores late-night orders, salary-week spikes, delivery loops, and weekend carts from real transaction rhythm."
  },
  {
    icon: Radar,
    title: "Month-end forecast",
    copy: "Projects budget pressure from the first few days of spending, not a stale report after rent is due."
  },
  {
    icon: Zap,
    title: "Nudge layer",
    copy: "Turns risky moments into coach cards: pause the cart, cap dinner delivery, move cash to savings."
  }
];

const signals = [
  { label: "Swiggy after 10 PM", value: "Rs 4,110", lift: "+42%" },
  { label: "Myntra salary-week carts", value: "Rs 4,529", lift: "+31%" },
  { label: "Blinkit impulse baskets", value: "Rs 3,360", lift: "+18%" },
  { label: "Amazon electronics drift", value: "Rs 6,140", lift: "+27%" }
];

const coachFeed = [
  { time: "Tonight, 10:40 PM", merchant: "Swiggy", note: "Third late dinner this week. Set a Rs 350 cap?", tone: "text-rose-100" },
  { time: "Salary + 3 days", merchant: "Myntra", note: "Cart is 2.1x your normal weekday spend.", tone: "text-amber-100" },
  { time: "Sunday evening", merchant: "Amazon", note: "This purchase pushes the month forecast above budget.", tone: "text-cyan-100" }
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-fade pointer-events-none absolute inset-0" />

      <nav className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-teal-300 text-slate-950">
              <Landmark className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">DigiKhata</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#problem" className="transition hover:text-white">Problem</a>
            <a href="#solution" className="transition hover:text-white">Solution</a>
            <a href="#signals" className="transition hover:text-white">Coach feed</a>
          </div>
          <Link href="/analyze" className="inline-flex items-center gap-2 rounded-[8px] bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-100">
            Analyze <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-4 py-2 text-sm text-teal-100">
            <ShieldCheck className="h-4 w-4" />
            Built for first salary months, rent cycles, and delivery habits
          </div>
          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your money disappears before month-end. DigiKhata stops it before it happens.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            DigiKhata reads transaction behaviour like a coach: when you spend, where it repeats, and which moment is likely to break the month before your balance does.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/analyze" className="group inline-flex items-center justify-center gap-2 rounded-[8px] bg-teal-300 px-6 py-3 font-semibold text-slate-950 shadow-[0_16px_50px_rgba(45,212,191,0.2)] transition hover:scale-[1.02] hover:bg-teal-200">
              Analyze My Spending <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-white/12 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              View demo dashboard
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="aurora-border signal-glow rounded-[8px] p-px">
            <GlassCard className="ledger-lines relative overflow-hidden p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Live coach view</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">Riya, 24, Bengaluru</h2>
                </div>
                <div className="rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1 text-xs text-rose-100">Forecast alert</div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[8px] border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Budget runway</span>
                    <LineChart className="h-4 w-4 text-teal-200" />
                  </div>
                  <p className="mt-3 text-3xl font-semibold">17 days</p>
                  <p className="mt-1 text-xs text-slate-400">At current pace</p>
                </div>
                <div className="rounded-[8px] border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Likely overspend</span>
                    <BellRing className="h-4 w-4 text-rose-200" />
                  </div>
                  <p className="mt-3 text-3xl font-semibold">Rs 6,200</p>
                  <p className="mt-1 text-xs text-slate-400">If habits continue</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {signals.map((signal, index) => (
                  <div key={signal.label} className="flex items-center justify-between rounded-[8px] border border-white/10 bg-slate-950/45 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white/8 text-teal-200">
                        {index === 0 ? <Clock3 className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                      </span>
                      <div>
                        <p className="font-medium">{signal.label}</p>
                        <p className="text-xs text-slate-400">{signal.value}</p>
                      </div>
                    </div>
                    <span className="text-sm text-rose-200">{signal.lift}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[8px] border border-teal-300/20 bg-teal-300/10 p-4">
                <p className="text-sm font-medium text-teal-50">Coach nudge</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Move Rs 3,000 to savings today and cap food delivery at Rs 450 for the next 5 nights.</p>
              </div>
            </GlassCard>
          </div>
        </AnimatedSection>
      </section>

      <section id="problem" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <AnimatedSection className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
              <feature.icon className="h-7 w-7 text-teal-200" />
              <h2 className="mt-5 text-xl font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{feature.copy}</p>
            </GlassCard>
          ))}
        </AnimatedSection>
      </section>

      <section id="solution" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <AnimatedSection>
            <GlassCard className="h-full p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-200">Old money apps</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Month-end reports arrive after the damage.</h2>
              <p className="mt-4 leading-8 text-slate-300">First salaries bring freedom, rent, subscriptions, delivery habits, and impulsive carts. Traditional trackers only show the damage once the month is already tight.</p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <GlassCard className="h-full p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">DigiKhata</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Behaviour alerts show up while choices still matter.</h2>
              <p className="mt-4 leading-8 text-slate-300">The app watches spending rhythm, not just totals, and turns risky moments into predictions, category warnings, and concrete budget moves.</p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      <section id="signals" className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
        <AnimatedSection>
          <GlassCard className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">A coach feed, not a report graveyard.</h2>
                <p className="mt-4 max-w-2xl leading-8 text-slate-300">The demo flow ingests a CSV or scraped order page, then produces risk scores, merchant pressure, danger hours, and next-best spending moves.</p>
                <Link href="/analyze" className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-teal-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-200">
                  Start analysis <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="space-y-3">
                {coachFeed.map((item) => (
                  <div key={item.time} className="rounded-[8px] border border-white/10 bg-slate-950/45 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-400">{item.time}</p>
                      <ReceiptText className="h-4 w-4 text-slate-400" />
                    </div>
                    <p className="mt-2 font-semibold">{item.merchant}</p>
                    <p className={`mt-1 text-sm leading-6 ${item.tone}`}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </section>
    </main>
  );
}
