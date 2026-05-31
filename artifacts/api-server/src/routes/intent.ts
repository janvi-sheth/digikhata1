import { Router, type Request, type Response } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CheckIntentBody } from "@workspace/api-zod";
import { computeBudget, spendingPace } from "../lib/budgetEngine.js";
import { orchestrate } from "../lib/wireOrchestrator.js";
import { generateNudge } from "../lib/nudgeEngine.js";

const router = Router();

router.post("/intent/check", async (req: Request, res: Response): Promise<void> => {
  const parsed = CheckIntentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { productName, price, category } = parsed.data;
  const userId = "default";

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId));

  const salary = user ? parseFloat(user.salary) : 25000;
  const budget = computeBudget(salary);
  const catBudget = (budget as Record<string, number>)[category] ?? budget.shopping;

  const now = new Date();
  const today = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const spent = 0;
  const pace = spendingPace(catBudget, spent, today, daysInMonth);

  const wireResults = await orchestrate({ productName, price, category });
  const nudge = generateNudge(pace, wireResults, { productName, price });

  res.json({
    nudge,
    alternatives: wireResults.alternatives ?? [],
    budgetImpact: pace,
  });
});

export default router;
