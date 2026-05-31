import { getCached, setCache } from "./cache.js";
import { scrapePrice } from "./scraperFallback.js";
import { logger } from "./logger.js";

const BASE = process.env.ANAKIN_BASE_URL;
const KEY = process.env.ANAKIN_API_KEY;
const DEMO = process.env.DEMO_MODE === "true" || !KEY || !BASE;

const CATEGORY_WIRE_MAP: Record<string, string[]> = {
  electronics: ["amazon-product", "flipkart-search"],
  shopping: ["amazon-product", "flipkart-search"],
  ordering_in: ["zomato-orders", "swiggy-orders"],
  groceries: ["blinkit-search", "bigbasket-search"],
  default: ["amazon-product", "flipkart-search"],
};

export interface PriceAlternative {
  platform: string;
  price: number;
  title: string;
  link: string;
}

export interface OrchestrateResult {
  alternatives: PriceAlternative[];
  originalPrice: number;
  bestSaving: number;
}

const inflight = new Map<string, Promise<unknown>>();

async function wireCall(actionId: string, params: Record<string, unknown>): Promise<unknown> {
  const cacheKey = `${actionId}:${JSON.stringify(params)}`;
  const cached = getCached<unknown>(cacheKey);
  if (cached) return cached;
  if (inflight.has(cacheKey)) return inflight.get(cacheKey);

  const promise = fetch(`${BASE}/v1/wire/run`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ action_id: actionId, params }),
  })
    .then(r => {
      if (!r.ok) throw new Error(`${r.status}`);
      return r.json();
    })
    .then((data: unknown) => {
      setCache(cacheKey, data);
      inflight.delete(cacheKey);
      return data;
    })
    .catch((err: Error) => {
      inflight.delete(cacheKey);
      throw err;
    });

  inflight.set(cacheKey, promise);
  return promise;
}

function parseWireResponse(actionId: string, data: unknown): PriceAlternative | null {
  const out = (data as Record<string, Record<string, unknown>>).result ?? (data as Record<string, Record<string, unknown>>).data ?? {};
  if (
    actionId.includes("amazon") ||
    actionId.includes("flipkart") ||
    actionId.includes("blinkit") ||
    actionId.includes("bigbasket")
  ) {
    const p = parseFloat(String(out.price ?? out.current_price ?? 0));
    if (!p) return null;
    return {
      platform: actionId.includes("amazon")
        ? "Amazon"
        : actionId.includes("flipkart")
        ? "Flipkart"
        : actionId.includes("blinkit")
        ? "Blinkit"
        : "BigBasket",
      price: p,
      title: String(out.title ?? out.name ?? ""),
      link: String(out.url ?? out.link ?? "#"),
    };
  }
  return null;
}

function getDemoResults(intent: { productName: string; price: number }): OrchestrateResult {
  return {
    alternatives: [
      {
        platform: "Flipkart",
        price: Math.round(intent.price * 0.88),
        title: intent.productName,
        link: "#",
      },
      {
        platform: "Amazon",
        price: Math.round(intent.price * 0.92),
        title: intent.productName,
        link: "#",
      },
    ],
    originalPrice: intent.price,
    bestSaving: Math.round(intent.price * 0.12),
  };
}

export async function orchestrate(intent: {
  productName: string;
  price: number;
  category: string;
}): Promise<OrchestrateResult> {
  if (DEMO) return getDemoResults(intent);

  const actions = CATEGORY_WIRE_MAP[intent.category] ?? CATEGORY_WIRE_MAP.default;
  const params = { query: intent.productName, max_price: intent.price * 1.2 };

  const settled = await Promise.allSettled(
    actions.map(id =>
      wireCall(id, params).then(res => ({ id, res }))
    )
  );

  const parsed: PriceAlternative[] = [];
  for (const r of settled) {
    if (r.status === "fulfilled") {
      const p = parseWireResponse(r.value.id, r.value.res);
      if (p) parsed.push(p);
    } else {
      logger.warn({ reason: String(r.reason) }, "Wire call failed — trying scraper");
      const scraped = await scrapePrice(intent.productName, "amazon-product").catch(() => null);
      if (scraped) parsed.push(scraped);
    }
  }

  if (!parsed.length) return getDemoResults(intent);

  const alternatives = parsed
    .filter(p => p.price && p.price < intent.price)
    .sort((a, b) => a.price - b.price);

  return {
    alternatives,
    originalPrice: intent.price,
    bestSaving: alternatives[0] ? intent.price - alternatives[0].price : 0,
  };
}
