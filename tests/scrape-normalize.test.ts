import test from "node:test";
import assert from "node:assert/strict";
import { normalizeScraperPayload, normalizeUnknownPayload, parseTextPurchases } from "../lib/scrape-normalize";

test("normalizeUnknownPayload extracts nested order arrays", () => {
  const result = normalizeUnknownPayload({
    orders: [
      { total: "540", store: "Swiggy", date: "2026-05-01T22:40:00+05:30" },
      { amount: 1299, merchant: "Myntra", timestamp: "2026-05-02T21:20:00+05:30" }
    ]
  });

  assert.equal(result.length, 2);
  assert.equal(result[0].category, "Food Delivery");
  assert.equal(result[1].category, "Shopping");
});

test("parseTextPurchases extracts rupee amounts and known merchants from markdown", () => {
  const result = parseTextPurchases("Order from Zomato on 2026-05-03 for ₹860\nAmazon order INR 2,350");

  assert.equal(result.length, 2);
  assert.equal(result[0].merchant, "Zomato");
  assert.equal(result[0].amount, 860);
  assert.equal(result[1].merchant, "Amazon");
  assert.equal(result[1].amount, 2350);
});

test("normalizeScraperPayload removes duplicate normalized transactions", () => {
  const payload = {
    transactions: [{ amount: 500, merchant: "Uber", category: "Transport", timestamp: "2026-05-05T09:40:00+05:30" }],
    data: [{ amount: 500, merchant: "Uber", category: "Transport", timestamp: "2026-05-05T09:40:00+05:30" }]
  };

  assert.equal(normalizeScraperPayload(payload).length, 1);
});
