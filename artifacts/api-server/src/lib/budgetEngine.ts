export const ALLOCATIONS: Record<string, number> = {
  rent: 0.25,
  savings: 0.20,
  groceries: 0.10,
  fun_leisure: 0.10,
  health: 0.05,
  ordering_in: 0.05,
  shopping: 0.05,
  investment: 0.20,
};

export type BudgetAllocation = {
  rent: number;
  savings: number;
  groceries: number;
  fun_leisure: number;
  health: number;
  ordering_in: number;
  shopping: number;
  investment: number;
};

export function computeBudget(salary: number): BudgetAllocation {
  return Object.fromEntries(
    Object.entries(ALLOCATIONS).map(([k, v]) => [k, Math.round(salary * v)])
  ) as BudgetAllocation;
}

export function spendingPace(
  catBudget: number,
  spent: number,
  dayOfMonth: number,
  daysInMonth: number
) {
  const safePace = (dayOfMonth / daysInMonth) * catBudget;
  const remaining = catBudget - spent;
  const daysLeft = daysInMonth - dayOfMonth;
  return {
    safePace,
    remaining,
    daysToSalary: daysLeft,
    isOverpacing: spent > safePace,
    dailyBudgetLeft: daysLeft > 0 ? remaining / daysLeft : 0,
  };
}
