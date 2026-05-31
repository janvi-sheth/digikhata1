export interface NudgePayload {
  type: string;
  severity: "safe" | "warning" | "alternative" | "info";
  message: string;
  action: string | null;
}

export interface WireResults {
  alternatives?: Array<{ platform: string; price: number; title: string; link: string }>;
  originalPrice?: number;
  bestSaving?: number;
}

export interface PaceInfo {
  remaining: number;
  daysToSalary: number;
  isOverpacing: boolean;
  safePace: number;
  dailyBudgetLeft: number;
}

export function generateNudge(
  pace: PaceInfo,
  wireResults: WireResults,
  intent: { productName: string; price: number }
): NudgePayload {
  const { remaining, daysToSalary, isOverpacing } = pace;
  const { price, productName } = intent;
  const postPurchase = remaining - price;

  const cheaper = wireResults.alternatives?.[0];
  if (cheaper && cheaper.price < price) {
    const saving = price - cheaper.price;
    const meals = Math.round(saving / 150);
    return {
      type: "alternative",
      severity: "alternative",
      message: `${productName} is ₹${cheaper.price.toLocaleString("en-IN")} on ${cheaper.platform}. You save ₹${saving.toLocaleString("en-IN")} — that's ${meals} meal${meals !== 1 ? "s" : ""}.`,
      action: `View on ${cheaper.platform}`,
    };
  }

  if (daysToSalary <= 5 && postPurchase < 500) {
    return {
      type: "wait",
      severity: "warning",
      message: `Salary in ${daysToSalary} day${daysToSalary !== 1 ? "s" : ""}. This leaves ₹${postPurchase.toLocaleString("en-IN")} for essentials. Worth waiting?`,
      action: "Remind me on payday",
    };
  }

  if (isOverpacing && postPurchase < 1000) {
    return {
      type: "cooloff",
      severity: "warning",
      message: `You're spending faster than your plan this month. Give it 2 hours — if you still want it, go for it.`,
      action: "Set a reminder",
    };
  }

  if (postPurchase > 2000) {
    return {
      type: "safe",
      severity: "safe",
      message: `You'll have ₹${postPurchase.toLocaleString("en-IN")} left after this. You're on track — go for it.`,
      action: "Proceed",
    };
  }

  return {
    type: "info",
    severity: "info",
    message: `₹${price.toLocaleString("en-IN")} now. At this rate, that's ₹${(price * 12).toLocaleString("en-IN")}/year on ${productName}.`,
    action: "Still want it?",
  };
}
