export type Transaction = {
  amount: number;
  category: string;
  merchant: string;
  timestamp: string;
};

export type RiskScores = {
  impulse: number;
  aiRisk: number;
  budgetHealth: number;
  overspendPrediction: number;
  lateNightLift: number;
  weekendLift: number;
  foodDeliveryShare: number;
  postSalarySpike: number;
};

export type AnalysisResult = {
  insights: string[];
  nudges: PersonalizedNudge[];
  scores: RiskScores;
  categoryTotals: Array<{ category: string; amount: number }>;
  merchantTotals: Array<{ merchant: string; amount: number }>;
  weeklyTotals: Array<{ week: string; amount: number }>;
  dailyTrend: Array<{ day: string; amount: number }>;
  dangerHours: Array<{ hour: string; amount: number }>;
  timeline: Array<{ label: string; event: string; risk: "low" | "medium" | "high" }>;
  monthlyTotal: number;
};

export type PersonalizedNudge = {
  id: string;
  title: string;
  message: string;
  action: string;
  channel: "in-app" | "whatsapp" | "push";
  trigger: string;
  priority: "low" | "medium" | "high";
  projectedSavings: number;
};
