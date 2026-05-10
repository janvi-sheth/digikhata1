import { NextResponse } from "next/server";
import { analyzeTransactions } from "@/lib/analyze";
import { mockTransactions, monthlyBudget } from "@/lib/mock-data";
import type { Transaction } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      transactions?: Transaction[];
      monthlyBudget?: number;
      preferredChannel?: "in-app" | "whatsapp" | "push";
    };

    const analysis = analyzeTransactions(
      body.transactions?.length ? body.transactions : mockTransactions,
      body.monthlyBudget ?? monthlyBudget
    );
    const updates = body.preferredChannel
      ? analysis.nudges.filter((nudge) => nudge.channel === body.preferredChannel)
      : analysis.nudges;

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      updateCount: updates.length,
      updates,
      summary: {
        aiRisk: analysis.scores.aiRisk,
        budgetHealth: analysis.scores.budgetHealth,
        overspendPrediction: analysis.scores.overspendPrediction
      }
    });
  } catch {
    return NextResponse.json({ error: "Unable to generate personalized updates" }, { status: 400 });
  }
}
