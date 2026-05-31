import { Router, type Request, type Response } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SaveSalaryBody } from "@workspace/api-zod";
import { computeBudget } from "../lib/budgetEngine.js";

const router = Router();

router.post("/user/salary", async (req: Request, res: Response): Promise<void> => {
  const parsed = SaveSalaryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { salary } = parsed.data;
  const userId = "default";

  await db
    .insert(usersTable)
    .values({ userId, salary: String(salary) })
    .onConflictDoUpdate({
      target: usersTable.userId,
      set: { salary: String(salary), updatedAt: new Date() },
    });

  const budget = computeBudget(salary);
  res.json({ salary, budget });
});

router.get("/user/profile", async (req: Request, res: Response): Promise<void> => {
  const userId = "default";
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId));

  if (!user) {
    res.json({ salary: 0, budget: computeBudget(0) });
    return;
  }

  const salary = parseFloat(user.salary);
  res.json({ salary, budget: computeBudget(salary) });
});

export default router;
