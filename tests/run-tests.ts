import assert from "node:assert/strict";
import { analyzeTransactions } from "../lib/analyze";
import { mockTransactions, monthlyBudget } from "../lib/mock-data";
import { normalizeScraperPayload, normalizeUnknownPayload, parseTextPurchases } from "../lib/scrape-normalize";
import { generatePersonalizedNudges } from "../lib/nudges";

const cases: Array<{ name: string; run: () => void }> = [
  {
    name: "analyzeTransactions returns a full behavioural dashboard model",
    run: () => {
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
    }
  },
  {
    name: "analyzeTransactions predicts budget pressure for aggressive spending",
    run: () => {
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
    }
  },
  {
    name: "normalizeUnknownPayload extracts nested order arrays",
    run: () => {
      const result = normalizeUnknownPayload({
        orders: [
          { total: "540", store: "Swiggy", date: "2026-05-01T22:40:00+05:30" },
          { amount: 1299, merchant: "Myntra", timestamp: "2026-05-02T21:20:00+05:30" }
        ]
      });

      assert.equal(result.length, 2);
      assert.equal(result[0].category, "Food Delivery");
      assert.equal(result[1].category, "Shopping");
    }
  },
  {
    name: "parseTextPurchases extracts rupee amounts and known merchants from markdown",
    run: () => {
      const result = parseTextPurchases("Order from Zomato on 2026-05-03 for ₹860\nAmazon order INR 2,350");

      assert.equal(result.length, 2);
      assert.equal(result[0].merchant, "Zomato");
      assert.equal(result[0].amount, 860);
      assert.equal(result[1].merchant, "Amazon");
      assert.equal(result[1].amount, 2350);
    }
  },
  {
    name: "normalizeScraperPayload removes duplicate normalized transactions",
    run: () => {
      const payload = {
        transactions: [{ amount: 500, merchant: "Uber", category: "Transport", timestamp: "2026-05-05T09:40:00+05:30" }],
        data: [{ amount: 500, merchant: "Uber", category: "Transport", timestamp: "2026-05-05T09:40:00+05:30" }]
      };

      assert.equal(normalizeScraperPayload(payload).length, 1);
    }
  },
  {
    name: "normalizeScraperPayload reads Anakin generatedJson results",
    run: () => {
      const result = normalizeScraperPayload({
        generatedJson: {
          transactions: [
            { amount: 620, merchant: "Zomato", category: "Food Delivery", timestamp: "2026-05-06T23:45:00+05:30" }
          ]
        }
      });

      assert.equal(result.length, 1);
      assert.equal(result[0].merchant, "Zomato");
      assert.equal(result[0].amount, 620);
    }
  },
  {
    name: "generatePersonalizedNudges creates actionable updates from risky behaviour",
    run: () => {
      const analysis = analyzeTransactions(mockTransactions, monthlyBudget);
      const nudges = generatePersonalizedNudges(mockTransactions, analysis.scores);

      assert.ok(nudges.length > 0);
      assert.ok(nudges.some((nudge) => nudge.action.length > 10));
      assert.ok(nudges.every((nudge) => nudge.projectedSavings > 0));
      assert.ok(nudges.some((nudge) => nudge.trigger.includes("Anakin") || nudge.trigger.includes("DigiKhata")));
    }
  }
];

for (const testCase of cases) {
  testCase.run();
  console.log(`ok - ${testCase.name}`);
}

console.log(`${cases.length} tests passed`);
