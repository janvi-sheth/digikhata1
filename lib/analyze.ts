import type { AnalysisResult, Transaction } from "./types";
import { generatePersonalizedNudges } from "./nudges";

const currency = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "INR"
});

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const sum = (items: Transaction[]) => items.reduce((total, item) => total + item.amount, 0);
const hour = (transaction: Transaction) => new Date(transaction.timestamp).getHours();
const day = (transaction: Transaction) => new Date(transaction.timestamp).getDay();
const date = (transaction: Transaction) => new Date(transaction.timestamp).getDate();

const groupBy = <T extends string>(transactions: Transaction[], key: (transaction: Transaction) => T) => {
  const map = new Map<T, number>();
  transactions.forEach((transaction) => {
    const label = key(transaction);
    map.set(label, (map.get(label) ?? 0) + transaction.amount);
  });
  return Array.from(map.entries())
    .map(([label, amount]) => ({ label, amount }))
    .sort((a, b) => b.amount - a.amount);
};

export function analyzeTransactions(transactions: Transaction[], monthlyBudget = 42000): AnalysisResult {
  const safeTransactions = transactions.filter((transaction) => Number.isFinite(transaction.amount));
  const monthlyTotal = sum(safeTransactions);
  const lateNight = safeTransactions.filter((transaction) => hour(transaction) >= 22 || hour(transaction) < 2);
  const nonLateNight = safeTransactions.filter((transaction) => !lateNight.includes(transaction));
  const weekend = safeTransactions.filter((transaction) => [0, 6].includes(day(transaction)));
  const weekday = safeTransactions.filter((transaction) => ![0, 6].includes(day(transaction)));
  const foodDelivery = safeTransactions.filter((transaction) => /food|delivery|swiggy|zomato/i.test(`${transaction.category} ${transaction.merchant}`));
  const impulse = safeTransactions.filter((transaction) => ["Shopping", "Food Delivery", "Coffee", "Electronics"].includes(transaction.category));
  const firstWeek = safeTransactions.filter((transaction) => date(transaction) <= 7);
  const laterWeeks = safeTransactions.filter((transaction) => date(transaction) > 7);

  const lateNightAverage = lateNight.length ? sum(lateNight) / lateNight.length : 0;
  const regularAverage = nonLateNight.length ? sum(nonLateNight) / nonLateNight.length : 1;
  const lateNightLift = Math.round(((lateNightAverage - regularAverage) / regularAverage) * 100);
  const weekendDailyAverage = weekend.length ? sum(weekend) / new Set(weekend.map((item) => new Date(item.timestamp).toDateString())).size : 0;
  const weekdayDailyAverage = weekday.length ? sum(weekday) / new Set(weekday.map((item) => new Date(item.timestamp).toDateString())).size : 1;
  const weekendLift = Math.round(((weekendDailyAverage - weekdayDailyAverage) / weekdayDailyAverage) * 100);
  const foodDeliveryShare = monthlyTotal ? Math.round((sum(foodDelivery) / monthlyTotal) * 100) : 0;
  const postSalaryDaily = firstWeek.length ? sum(firstWeek) / 7 : 0;
  const laterDaily = laterWeeks.length ? sum(laterWeeks) / 24 : 1;
  const postSalarySpike = Math.round(((postSalaryDaily - laterDaily) / laterDaily) * 100);
  const observedDays = Math.max(...safeTransactions.map(date), 1);
  const projectedMonthly = Math.round((monthlyTotal / observedDays) * 30);
  const overspendPrediction = Math.max(0, projectedMonthly - monthlyBudget);
  const impulseScore = clamp(Math.round((sum(impulse) / Math.max(monthlyTotal, 1)) * 95 + Math.max(lateNightLift, 0) * 0.12));
  const aiRisk = clamp(Math.round((projectedMonthly / monthlyBudget) * 42 + foodDeliveryShare * 0.45 + Math.max(weekendLift, 0) * 0.16 + Math.max(postSalarySpike, 0) * 0.1));
  const budgetHealth = clamp(100 - aiRisk + (overspendPrediction ? -8 : 7));

  const weeklyMap = new Map<string, number>();
  const dailyMap = new Map<string, number>();
  const dangerHourMap = new Map<string, number>();
  safeTransactions.forEach((transaction) => {
    const weekLabel = `Week ${Math.ceil(date(transaction) / 7)}`;
    weeklyMap.set(weekLabel, (weeklyMap.get(weekLabel) ?? 0) + transaction.amount);
    const dayLabel = new Date(transaction.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    dailyMap.set(dayLabel, (dailyMap.get(dayLabel) ?? 0) + transaction.amount);
    const hourLabel = `${hour(transaction).toString().padStart(2, "0")}:00`;
    dangerHourMap.set(hourLabel, (dangerHourMap.get(hourLabel) ?? 0) + transaction.amount);
  });

  const scores = { impulse: impulseScore, aiRisk, budgetHealth, overspendPrediction, lateNightLift, weekendLift, foodDeliveryShare, postSalarySpike };

  return {
    insights: [
      lateNightLift > 0 ? `You spend ${lateNightLift}% more after 10 PM.` : "Late-night transactions are currently under control.",
      weekendLift > 0 ? "Most impulse purchases happen on weekends." : "Weekday spending is creating more pressure than weekends.",
      foodDeliveryShare >= 18 ? "Your food delivery spending increases after stressful work hours." : "Food delivery is not your biggest leak this month.",
      postSalarySpike > 20 ? `Post-salary spending is ${postSalarySpike}% higher than the rest of the month.` : "Salary-week spending is staying relatively steady.",
      overspendPrediction > 0 ? `You are likely to overspend your monthly budget by ${currency.format(overspendPrediction)}.` : "You are projected to stay within your monthly budget."
    ],
    nudges: generatePersonalizedNudges(safeTransactions, scores),
    scores,
    categoryTotals: groupBy(safeTransactions, (transaction) => transaction.category).map(({ label, amount }) => ({ category: label, amount })),
    merchantTotals: groupBy(safeTransactions, (transaction) => transaction.merchant).slice(0, 6).map(({ label, amount }) => ({ merchant: label, amount })),
    weeklyTotals: Array.from(weeklyMap.entries()).map(([week, amount]) => ({ week, amount })),
    dailyTrend: Array.from(dailyMap.entries()).map(([dayLabel, amount]) => ({ day: dayLabel, amount })),
    dangerHours: Array.from(dangerHourMap.entries()).map(([hourLabel, amount]) => ({ hour: hourLabel, amount })).sort((a, b) => b.amount - a.amount).slice(0, 5),
    timeline: [
      { label: "Salary week", event: "High discretionary shopping detected", risk: postSalarySpike > 20 ? "high" : "medium" },
      { label: "Late evenings", event: "Food orders cluster after 10 PM", risk: lateNightLift > 30 ? "high" : "medium" },
      { label: "Weekend", event: "Impulse baskets rise during downtime", risk: weekendLift > 20 ? "high" : "medium" },
      { label: "Month end", event: overspendPrediction > 0 ? "Budget gap likely without intervention" : "Projected balance remains positive", risk: overspendPrediction > 0 ? "high" : "low" }
    ],
    monthlyTotal
  };
}
