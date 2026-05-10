# Anakin Integration

DigiKhata uses Anakin as the ingestion layer for unstructured spending sources.

## Flow

1. User pastes an ecommerce or food-order history URL on `/analyze`.
2. `/api/scrape` submits the URL to Anakin URL Scraper with `ANAKIN_API_KEY`.
3. Anakin returns a scrape job id.
4. `/api/scrape` polls the Anakin job until the scrape completes.
5. Anakin returns markdown and optionally AI-generated JSON.
6. `lib/scrape-normalize.ts` extracts normalized transactions:

```ts
{
  amount: number;
  category: string;
  merchant: string;
  timestamp: string;
}
```

7. `/api/analyze` runs the behaviour engine.
8. `lib/nudges.ts` generates personalized updates for in-app, push, or WhatsApp delivery.
9. `/api/updates` returns the nudge queue for downstream notification workflows.

## What Anakin Adds

- Merchant extraction from order pages.
- Amount and order-total extraction from messy receipts.
- Timestamp extraction for late-night and weekend detection.
- Markdown fallback parsing when structured JSON is partial.
- Ecommerce order enrichment for high-ticket and category-specific nudges.

## Nudge Examples

- Late-night food cap after repeated Swiggy/Zomato orders.
- Weekend cart cooling for Amazon/Myntra impulse spikes.
- Budget rescue transfer when monthly overspend is predicted.
- High-ticket reflection prompt above Rs 2,000.

## Required Environment

```text
ANAKIN_API_KEY=your_key_here
```

The local `.env.local` file is loaded automatically by Next.js.

## Current Anakin Endpoint Shape

```ts
await fetch("https://api.anakin.io/v1/url-scraper", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.ANAKIN_API_KEY!,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url,
    country: "in",
    useBrowser: true,
    generateJson: true
  })
});
```

The submit response contains `jobId`; poll `https://api.anakin.io/v1/url-scraper/{jobId}` for final results.
