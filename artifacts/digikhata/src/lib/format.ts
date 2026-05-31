export const CATEGORY_LABELS: Record<string, string> = {
  rent: "Rent", 
  savings: "Savings", 
  groceries: "Groceries",
  fun_leisure: "Fun & Leisure", 
  health: "Health", 
  ordering_in: "Ordering In",
  shopping: "Shopping", 
  investment: "Investment",
  electronics: "Electronics"
};

export const CATEGORIES = [
  "electronics", "ordering_in", "groceries", "shopping", 
  "fun_leisure", "health", "rent", "savings", "investment"
];

export function formatCurrency(amount: number) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  });
}

export function spendingPace(budget: number, spent: number, dayOfMonth: number, daysInMonth: number) {
  const safePace = (dayOfMonth / daysInMonth) * budget;
  return { 
    safePace, 
    isOverpacing: spent > safePace, 
    remaining: budget - spent 
  };
}
