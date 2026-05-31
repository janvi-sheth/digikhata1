const BASE = process.env.ANAKIN_BASE_URL;
const KEY = process.env.ANAKIN_API_KEY;

const SCRAPE_TARGETS: Record<string, (q: string) => string> = {
  "amazon-product":  q => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`,
  "flipkart-search": q => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`,
  "blinkit-search":  q => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`,
  "zomato-orders":   () => `https://www.zomato.com`,
};

export interface ScrapedResult {
  platform: string;
  price: number;
  title: string;
  link: string;
}

export async function scrapePrice(
  query: string,
  actionId: string
): Promise<ScrapedResult | null> {
  const buildUrl = SCRAPE_TARGETS[actionId];
  if (!buildUrl || !BASE || !KEY) return null;

  try {
    const res = await fetch(`${BASE}/v1/scraper/run`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        url: buildUrl(query),
        prompt: `Extract top 2 results as JSON array: [{title, price (number, INR), url}]. Numbers only for price. Return only JSON.`,
      }),
    });
    const data = await res.json() as { result?: string; output?: string };
    const text = data.result ?? data.output ?? "";
    const clean = text.replace(/```json|```/g, "").trim();
    const items = JSON.parse(clean) as Array<{ title: string; price: number; url?: string }>;
    if (!Array.isArray(items) || !items.length) return null;
    return {
      platform: actionId.includes("amazon")
        ? "Amazon"
        : actionId.includes("flipkart")
        ? "Flipkart"
        : actionId.includes("blinkit")
        ? "Blinkit"
        : "Web",
      price: parseFloat(String(items[0].price)),
      title: items[0].title,
      link: items[0].url ?? "#",
    };
  } catch {
    return null;
  }
}
