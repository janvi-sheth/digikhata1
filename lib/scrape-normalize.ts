import type { Transaction } from "./types";

export type ScraperPayload = {
  data?: unknown;
  generatedJson?: unknown;
  cleanedHtml?: string;
  html?: string;
  markdown?: string;
  content?: string;
  result?: unknown;
  transactions?: Transaction[];
};

export const merchantCategoryMap: Record<string, string> = {
  swiggy: "Food Delivery",
  zomato: "Food Delivery",
  blinkit: "Groceries",
  amazon: "Shopping",
  myntra: "Shopping",
  uber: "Transport",
  starbucks: "Coffee"
};

export function categoryForMerchant(merchant: string) {
  const key = Object.keys(merchantCategoryMap).find((item) => merchant.toLowerCase().includes(item));
  return key ? merchantCategoryMap[key] : "Other";
}

export function normalizeUnknownPayload(payload: unknown): Transaction[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload.flatMap(normalizeUnknownPayload);

  if (typeof payload === "object") {
    const value = payload as Record<string, unknown>;
    if (Array.isArray(value.transactions)) return normalizeUnknownPayload(value.transactions);
    if (Array.isArray(value.orders)) return normalizeUnknownPayload(value.orders);
    if (Array.isArray(value.items)) return normalizeUnknownPayload(value.items);

    const amount = Number(value.amount ?? value.total ?? value.price ?? value.orderTotal);
    const merchant = String(value.merchant ?? value.vendor ?? value.store ?? value.name ?? "Unknown");
    const timestamp = String(value.timestamp ?? value.date ?? value.createdAt ?? new Date().toISOString());

    if (Number.isFinite(amount) && amount > 0) {
      return [
        {
          amount,
          merchant,
          category: String(value.category ?? categoryForMerchant(merchant)),
          timestamp
        }
      ];
    }
  }

  return [];
}

export function parseTextPurchases(text: string): Transaction[] {
  return text
    .split(/\r?\n/)
    .filter(Boolean)
    .flatMap((line) => {
      const amountMatch = line.match(/(?:₹|Rs\.?|INR)\s*([\d,]+(?:\.\d+)?)/i);
      if (!amountMatch) return [];

      const amount = Number(amountMatch[1].replace(/,/g, ""));
      const merchantKey = Object.keys(merchantCategoryMap).find((name) => line.toLowerCase().includes(name)) ?? "Unknown";
      const dateMatch = line.match(/\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}\b/);

      return [
        {
          amount,
          merchant: merchantKey === "Unknown" ? "Online merchant" : merchantKey[0].toUpperCase() + merchantKey.slice(1),
          category: categoryForMerchant(merchantKey),
          timestamp: dateMatch ? new Date(dateMatch[0]).toISOString() : new Date().toISOString()
        }
      ];
    });
}

export function normalizeScraperPayload(payload: ScraperPayload) {
  const text = [payload.markdown, payload.content].filter(Boolean).join("\n");
  const transactions = [
    ...normalizeUnknownPayload(payload.transactions),
    ...normalizeUnknownPayload(payload.data),
    ...normalizeUnknownPayload(payload.generatedJson),
    ...normalizeUnknownPayload(payload.result),
    ...parseTextPurchases(text)
  ];

  return transactions.filter((transaction, index, items) => {
    const key = `${transaction.amount}-${transaction.merchant}-${transaction.timestamp}`;
    return index === items.findIndex((item) => `${item.amount}-${item.merchant}-${item.timestamp}` === key);
  });
}
