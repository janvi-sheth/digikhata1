"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, BellRing, BrainCircuit, CheckCircle2, FileSpreadsheet, LinkIcon, Loader2, ShieldCheck, UploadCloud } from "lucide-react";
import { motion } from "@/components/motion";
import { GlassCard } from "@/components/ui/glass-card";
import type { AnalysisResult, Transaction } from "@/lib/types";

const demoProfiles = [
  {
    name: "Steady saver",
    file: "/demo-csv/steady-saver.csv",
    salary: 62000,
    allowance: 0,
    note: "Balanced first salary month with controlled food and transport."
  },
  {
    name: "Salary-week splurge",
    file: "/demo-csv/salary-week-splurge.csv",
    salary: 52000,
    allowance: 2500,
    note: "Heavy shopping and food orders immediately after payday."
  },
  {
    name: "Late-night delivery loop",
    file: "/demo-csv/late-night-delivery-loop.csv",
    salary: 44000,
    allowance: 1500,
    note: "Repeated Swiggy/Zomato orders after 10 PM."
  },
  {
    name: "Weekend shopper",
    file: "/demo-csv/weekend-shopper.csv",
    salary: 58000,
    allowance: 0,
    note: "Amazon and Myntra spikes during weekend downtime."
  },
  {
    name: "Allowance starter",
    file: "/demo-csv/allowance-starter.csv",
    salary: 28000,
    allowance: 8000,
    note: "Lower income plus family allowance with impulse leakage."
  }
];

function parseCsv(text: string): Transaction[] {
  const [headerLine, ...rows] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(",").map((header) => header.trim().toLowerCase());
  return rows
    .map((row) => {
      const values = row.split(",").map((value) => value.trim());
      const get = (names: string[]) => {
        const index = headers.findIndex((header) => names.includes(header));
        return index >= 0 ? values[index] : "";
      };
      return {
        amount: Number(get(["amount", "price", "total"])),
        category: get(["category", "type"]) || "Other",
        merchant: get(["merchant", "store", "vendor", "name"]) || "Unknown",
        timestamp: get(["timestamp", "date", "created_at"]) || new Date().toISOString()
      };
    })
    .filter((transaction) => Number.isFinite(transaction.amount) && transaction.amount > 0);
}

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Paste an order-history URL or upload a CSV.");
  const [salary, setSalary] = useState(50000);
  const [allowance, setAllowance] = useState(0);
  const readyCount = useMemo(() => transactions.length, [transactions]);
  const monthlyBudget = useMemo(() => Math.max(1, salary + allowance), [salary, allowance]);

  async function analyze(nextTransactions = transactions) {
    setLoading(true);
    setMessage("Analyzing financial behaviour...");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions: nextTransactions, monthlyBudget })
      });
      const data = await response.json();
      setResult(data);
      setMessage("Behaviour analysis ready.");
    } catch {
      setMessage("Analysis failed. Try another CSV or URL.");
    } finally {
      setLoading(false);
    }
  }

  async function scrapeUrl() {
    if (!url) return;
    setLoading(true);
    setMessage("Fetching order history...");
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      const nextTransactions = data.transactions ?? [];
      setTransactions(nextTransactions);
      await analyze(nextTransactions);
    } catch {
      setMessage("URL scraping failed. You can still upload a CSV.");
      setLoading(false);
    }
  }

  async function handleFile(file: File) {
    setLoading(true);
    setMessage("Reading transaction CSV...");
    const text = await file.text();
    const nextTransactions = parseCsv(text);
    setTransactions(nextTransactions);
    await analyze(nextTransactions);
  }

  async function loadDemoProfile(profile: (typeof demoProfiles)[number]) {
    setLoading(true);
    setSalary(profile.salary);
    setAllowance(profile.allowance);
    setMessage(`Loading ${profile.name} demo profile...`);
    try {
      const response = await fetch(profile.file);
      const text = await response.text();
      const nextTransactions = parseCsv(text);
      setTransactions(nextTransactions);

      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactions: nextTransactions,
          monthlyBudget: Math.max(1, profile.salary + profile.allowance)
        })
      });
      const data = await analysisResponse.json();
      setResult(data);
      setMessage(`${profile.name} profile analyzed.`);
    } catch {
      setMessage("Could not load demo profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-5 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> DigiKhata
          </Link>
          <Link href="/dashboard" className="rounded-[8px] border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">Demo dashboard</Link>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <BrainCircuit className="h-4 w-4" /> Live behaviour intake
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Analyze spending before the month gets expensive.</h1>
            <p className="mt-5 leading-8 text-slate-300">DigiKhata uses Anakin to turn messy ecommerce and order-history pages into clean transaction rows, then converts those rows into risk scores, nudges, and personal spending updates.</p>
            <GlassCard className="mt-8 p-5">
              <div className="flex items-center gap-3">
                {loading ? <Loader2 className="h-5 w-5 animate-spin text-cyan-200" /> : <CheckCircle2 className="h-5 w-5 text-emerald-200" />}
                <span className="text-sm text-slate-200">{message}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-indigo-300 to-rose-300" animate={{ width: loading ? ["12%", "78%", "44%"] : result ? "100%" : "28%" }} transition={{ duration: 1.25, repeat: loading ? Infinity : 0 }} />
              </div>
            </GlassCard>
            <GlassCard className="mt-5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Income context</p>
                  <h2 className="mt-1 text-xl font-semibold">Salary and allowance</h2>
                </div>
                <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs text-teal-100">
                  Budget Rs {monthlyBudget.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Monthly salary</span>
                  <input
                    type="number"
                    min="0"
                    value={salary}
                    onChange={(event) => setSalary(Number(event.target.value))}
                    className="min-h-12 w-full rounded-[8px] border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-teal-300/60"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Monthly allowance</span>
                  <input
                    type="number"
                    min="0"
                    value={allowance}
                    onChange={(event) => setAllowance(Number(event.target.value))}
                    className="min-h-12 w-full rounded-[8px] border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-teal-300/60"
                  />
                </label>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                DigiKhata uses this income context to make overspend predictions and nudges feel personal instead of generic.
              </p>
            </GlassCard>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] border border-white/10 bg-slate-950/45 p-4">
                <ShieldCheck className="h-5 w-5 text-teal-200" />
                <p className="mt-3 font-semibold">Anakin extraction</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">URL to merchant, amount, category, timestamp, order cadence, and high-ticket purchase signals.</p>
              </div>
              <div className="rounded-[8px] border border-white/10 bg-slate-950/45 p-4">
                <BellRing className="h-5 w-5 text-rose-200" />
                <p className="mt-3 font-semibold">Personal updates</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">Push, WhatsApp, or in-app nudges when spend enters a risky window.</p>
              </div>
            </div>
          </div>

          <GlassCard className="p-5 sm:p-6">
            <div className="grid gap-5">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
                  <LinkIcon className="h-4 w-4 text-cyan-200" /> Ecommerce or order-history URL
                </span>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/orders" className="min-h-12 flex-1 rounded-[8px] border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60" />
                  <button onClick={scrapeUrl} disabled={loading || !url} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-cyan-300 px-5 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LinkIcon className="h-4 w-4" />} Analyze URL
                  </button>
                </div>
              </label>

              <div onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const file = event.dataTransfer.files.item(0); if (file) void handleFile(file); }} className="rounded-[8px] border border-dashed border-white/18 bg-white/[0.04] p-8 text-center transition hover:border-cyan-300/50 hover:bg-white/[0.06]">
                <UploadCloud className="mx-auto h-10 w-10 text-cyan-200" />
                <h2 className="mt-4 text-xl font-semibold">Drop CSV transaction file</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">Screenshots can be added later; this demo normalizes CSV and URL-based transactions now.</p>
                <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-[8px] border border-white/10 bg-white/8 px-5 py-3 font-medium text-white transition hover:bg-white/12">
                  <FileSpreadsheet className="h-5 w-5" /> Choose CSV
                  <input type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => { const file = event.target.files?.item(0); if (file) void handleFile(file); }} />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[8px] bg-slate-950/40 p-4"><p className="text-2xl font-semibold">{readyCount}</p><p className="mt-1 text-sm text-slate-400">Transactions loaded</p></div>
                <div className="rounded-[8px] bg-slate-950/40 p-4"><p className="text-2xl font-semibold">{result?.scores.aiRisk ?? "--"}</p><p className="mt-1 text-sm text-slate-400">AI risk score</p></div>
                <div className="rounded-[8px] bg-slate-950/40 p-4"><p className="text-2xl font-semibold">{result?.scores.impulse ?? "--"}</p><p className="mt-1 text-sm text-slate-400">Impulse score</p></div>
              </div>

              <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">Demo CSV profiles</h2>
                    <p className="mt-1 text-sm text-slate-400">Load five different earning and spending behaviours instantly.</p>
                  </div>
                  <FileSpreadsheet className="h-5 w-5 text-teal-200" />
                </div>
                <div className="mt-4 grid gap-3">
                  {demoProfiles.map((profile) => (
                    <button
                      key={profile.file}
                      onClick={() => void loadDemoProfile(profile)}
                      disabled={loading}
                      className="rounded-[8px] border border-white/10 bg-slate-950/45 p-3 text-left transition hover:border-teal-300/40 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">{profile.name}</span>
                        <span className="text-xs text-slate-400">Rs {(profile.salary + profile.allowance).toLocaleString("en-IN")} inflow</span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{profile.note}</p>
                    </button>
                  ))}
                </div>
              </div>

              {result ? (
                <div className="rounded-[8px] border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <p className="font-medium text-cyan-50">{result.insights[0]}</p>
                  {result.nudges[0] ? (
                    <div className="mt-3 rounded-[8px] bg-slate-950/35 p-3">
                      <p className="text-sm font-semibold text-white">{result.nudges[0].title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{result.nudges[0].action}</p>
                    </div>
                  ) : null}
                  <Link href="/dashboard" className="mt-3 inline-flex text-sm font-semibold text-cyan-100 underline underline-offset-4">Open full dashboard</Link>
                </div>
              ) : null}
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
