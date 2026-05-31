import { Router, type Request, type Response } from "express";
import { db, usersTable, spendingLogTable } from "@workspace/db";
import { eq, desc, gte } from "drizzle-orm";
import { LogSpendingBody } from "@workspace/api-zod";
import { computeBudget, spendingPace, type BudgetAllocation } from "../lib/budgetEngine.js";

const router = Router();

router.get("/budget/summary", async (req: Request, res: Response): Promise<void> => {
  const userId = "default";

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId));

  const salary = user ? parseFloat(user.salary) : 0;
  const budget = computeBudget(salary);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const logs = await db
    .select()
    .from(spendingLogTable)
    .where(
      eq(spendingLogTable.userId, userId)
    );

  const thisMonthLogs = logs.filter(l => l.createdAt >= startOfMonth);

  const spending: Record<string, number> = {};
  for (const log of thisMonthLogs) {
    spending[log.category] = (spending[log.category] ?? 0) + parseFloat(log.amount);
  }

  const today = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const spendingAlloc: BudgetAllocation = {
    rent: spending.rent ?? 0,
    savings: spending.savings ?? 0,
    groceries: spending.groceries ?? 0,
    fun_leisure: spending.fun_leisure ?? 0,
    health: spending.health ?? 0,
    ordering_in: spending.ordering_in ?? 0,
    shopping: spending.shopping ?? 0,
    investment: spending.investment ?? 0,
  };

  const activeNudges = [];
  for (const [cat, alloc] of Object.entries(budget)) {
    const spent = spending[cat] ?? 0;
    const pace = spendingPace(alloc, spent, today, daysInMonth);
    if (pace.isOverpacing && spent > 0) {
      activeNudges.push({
        type: "overpacing",
        severity: "warning",
        message: `You're spending faster than planned on ${cat.replace("_", " ")} this month.`,
        action: null,
      });
    }
  }

  res.json({
    spending: spendingAlloc,
    budget,
    salary: salary || null,
    activeNudges: activeNudges.slice(0, 2),
  });
});

router.post("/budget/log", async (req: Request, res: Response): Promise<void> => {
  const parsed = LogSpendingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { category, amount, note } = parsed.data;
  const userId = "default";

  await db.insert(spendingLogTable).values({
    userId,
    category,
    amount: String(amount),
    note: note ?? null,
  });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const logs = await db
    .select()
    .from(spendingLogTable)
    .where(eq(spendingLogTable.userId, userId));

  const thisMonthLogs = logs.filter(l => l.createdAt >= startOfMonth);
  const spending: Record<string, number> = {};
  for (const log of thisMonthLogs) {
    spending[log.category] = (spending[log.category] ?? 0) + parseFloat(log.amount);
  }

  const spendingAlloc: BudgetAllocation = {
    rent: spending.rent ?? 0,
    savings: spending.savings ?? 0,
    groceries: spending.groceries ?? 0,
    fun_leisure: spending.fun_leisure ?? 0,
    health: spending.health ?? 0,
    ordering_in: spending.ordering_in ?? 0,
    shopping: spending.shopping ?? 0,
    investment: spending.investment ?? 0,
  };

  res.json({ spending: spendingAlloc });
});

router.get("/budget/history", async (req: Request, res: Response): Promise<void> => {
  const userId = "default";

  const logs = await db
    .select()
    .from(spendingLogTable)
    .where(eq(spendingLogTable.userId, userId))
    .orderBy(desc(spendingLogTable.createdAt))
    .limit(50);

  res.json(
    logs.map(l => ({
      id: l.id,
      category: l.category,
      amount: parseFloat(l.amount),
      note: l.note ?? null,
      createdAt: l.createdAt.toISOString(),
    }))
  );
});

export default router;
