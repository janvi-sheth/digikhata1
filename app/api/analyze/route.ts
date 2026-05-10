import { NextResponse } from "next/server";
import { analyzeTransactions } from "@/lib/analyze";
import { mockTransactions, monthlyBudget } from "@/lib/mock-data";
import type { Transaction } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { transactions?: Transaction[]; monthlyBudget?: number };
    const transactions = body.transactions?.length ? body.transactions : mockTransactions;
    return NextResponse.json(analyzeTransactions(transactions, body.monthlyBudget ?? monthlyBudget));
  } catch {
    return NextResponse.json({ error: "Unable to analyze transactions" }, { status: 400 });
  }
}
