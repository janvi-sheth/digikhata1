import type { PersonalizedNudge, RiskScores, Transaction } from "./types";

const foodPattern = /food|delivery|swiggy|zomato/i;
const shoppingPattern = /shopping|amazon|myntra|electronics/i;

function total(items: Transaction[]) {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

function hour(transaction: Transaction) {
  return new Date(transaction.timestamp).getHours();
}

function weekday(transaction: Transaction) {
  return new Date(transaction.timestamp).getDay();
}

export function generatePersonalizedNudges(
  transactions: Transaction[],
  scores: RiskScores
): PersonalizedNudge[] {
  const lateNightFood = transactions.filter((item) => foodPattern.test(`${item.category} ${item.merchant}`) && hour(item) >= 22);
  const weekendShopping = transactions.filter((item) => shoppingPattern.test(`${item.category} ${item.merchant}`) && [0, 6].includes(weekday(item)));
  const highTicket = [...transactions].sort((a, b) => b.amount - a.amount).slice(0, 1)[0];

  const nudges: PersonalizedNudge[] = [];

  if (lateNightFood.length >= 3 || scores.lateNightLift > 20) {
    nudges.push({
      id: "late-night-food-cap",
      title: "Set a night-food guardrail",
      message: `Your late-night food orders are clustering after 10 PM. A soft cap can prevent the next ${lateNightFood.length || 3} orders from becoming a habit loop.`,
      action: "Cap food delivery at Rs 450 between 10 PM and 1 AM for 5 days.",
      channel: "push",
      trigger: "Anakin extracts order timestamps from Swiggy/Zomato history and DigiKhata detects a repeated late-night pattern.",
      priority: "high",
      projectedSavings: Math.round(Math.max(total(lateNightFood) * 0.35, 900))
    });
  }

  if (weekendShopping.length >= 2 || scores.weekendLift > 15) {
    nudges.push({
      id: "weekend-cart-cooling",
      title: "Cool weekend carts before checkout",
      message: "Your discretionary shopping rises during weekend downtime, especially on marketplace and fashion merchants.",
      action: "Hold Amazon/Myntra carts for 18 hours and re-score the month before paying.",
      channel: "in-app",
      trigger: "Anakin normalizes ecommerce order pages into merchant/category rows, then the nudge engine compares weekend vs weekday spend.",
      priority: "medium",
      projectedSavings: Math.round(Math.max(total(weekendShopping) * 0.28, 750))
    });
  }

  if (scores.overspendPrediction > 0) {
    nudges.push({
      id: "budget-rescue-transfer",
      title: "Rescue this month before it slips",
      message: `You are projected to overspend by Rs ${scores.overspendPrediction.toLocaleString("en-IN")}. Move money out before the next impulse window.`,
      action: `Move Rs ${Math.min(scores.overspendPrediction, 3000).toLocaleString("en-IN")} to savings today and lower the weekly discretionary limit.`,
      channel: "whatsapp",
      trigger: "DigiKhata combines scraped order data, CSV transactions, and salary-window pacing into a forward budget forecast.",
      priority: "high",
      projectedSavings: Math.min(scores.overspendPrediction, 3000)
    });
  }

  if (highTicket && highTicket.amount > 2000) {
    nudges.push({
      id: "high-ticket-reflection",
      title: `Review the ${highTicket.merchant} spike`,
      message: `${highTicket.merchant} is your largest recent spend at Rs ${highTicket.amount.toLocaleString("en-IN")}. DigiKhata can ask one reflection before the next similar checkout.`,
      action: "Add a 2-question pause for purchases above Rs 2,000.",
      channel: "in-app",
      trigger: "Anakin extracts order totals and merchant names so the coach can personalize high-ticket prompts.",
      priority: "medium",
      projectedSavings: Math.round(highTicket.amount * 0.2)
    });
  }

  return nudges.slice(0, 4);
}
