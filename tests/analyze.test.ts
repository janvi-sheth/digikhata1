import test from "node:test";
import assert from "node:assert/strict";
import { analyzeTransactions } from "../lib/analyze";
import { mockTransactions, monthlyBudget } from "../lib/mock-data";

test("analyzeTransactions returns a full behavioural dashboard model", () => {
  const result = analyzeTransactions(mockTransactions, monthlyBudget);

  assert.equal(result.insights.length, 5);
  assert.ok(result.monthlyTotal > 0);
  assert.ok(result.scores.aiRisk >= 0);
  assert.ok(result.scores.aiRisk <= 100);
  assert.ok(result.scores.impulse >= 0);
  assert.ok(result.categoryTotals.some((item) => item.category === "Food Delivery"));
  assert.ok(result.merchantTotals.some((item) => item.merchant === "Amazon"));
  assert.ok(result.weeklyTotals.length >= 4);
  assert.ok(result.dangerHours.length > 0);
  assert.equal(result.timeline.length, 4);
});

test("analyzeTransactions predicts budget pressure for aggressive spending", () => {
  const result = analyzeTransactions(
    [
      { amount: 9000, category: "Shopping", merchant: "Amazon", timestamp: "2026-05-01T23:30:00+05:30" },
      { amount: 7000, category: "Food Delivery", merchant: "Swiggy", timestamp: "2026-05-02T23:15:00+05:30" },
      { amount: 6500, category: "Shopping", merchant: "Myntra", timestamp: "2026-05-03T22:10:00+05:30" }
    ],
    30000
  );

  assert.ok(result.scores.overspendPrediction > 0);
  assert.match(result.insights.join(" "), /overspend/i);
});
