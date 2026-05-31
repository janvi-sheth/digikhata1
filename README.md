# DigiKhata

A proactive personal finance app for first-time earners and college students. DigiKhata automatically divides your salary into smart budget buckets, tracks real-time spending, and delivers calm contextual nudges *before* you overspend — using Anakin.io Wire for live price intelligence.

**Core promise:** No guilt. No month-end shock. Just a quiet guide.

---

## Features

- **Auto Budget Split** — Enter your salary once; DigiKhata splits it into 8 budget categories (Rent 25%, Savings 20%, Groceries 10%, Fun 10%, Health 5%, Ordering In 5%, Shopping 5%, Investment 20%)
- **Spending Pace Tracker** — Compares your current spend to a safe daily pace and flags overspending early
- **Purchase Nudges** — Before you buy, get a budget-aware nudge with cheaper price alternatives from Amazon, Flipkart, Blinkit, Zomato and more (via Anakin.io Wire + Universal Scraper)
- **Spending History** — A chronological log of every transaction with category breakdowns
- **Demo Mode** — Works fully without an Anakin.io API key using realistic mock data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, shadcn/ui, TanStack Query |
| Backend | Node 24, Express 5, TypeScript |
| Database | PostgreSQL + Drizzle ORM |
| API Contract | OpenAPI 3.1 → Orval codegen (Zod + React Query hooks) |
| Price Intel | Anakin.io Wire + Universal Scraper |
| Monorepo | pnpm workspaces |

---

## Project Structure

```
digikhata/
├── artifacts/
│   ├── api-server/           # Express 5 backend
│   │   └── src/
│   │       ├── routes/       # user.ts, budget.ts, intent.ts
│   │       └── lib/          # budgetEngine, nudgeEngine, wireOrchestrator, scraperFallback, cache
│   └── digikhata/            # React + Vite frontend
│       └── src/
│           ├── pages/        # Dashboard, Check, History, Profile
│           └── components/   # shadcn/ui components
├── lib/
│   ├── api-spec/             # openapi.yaml  ← source of truth for all API contracts
│   ├── api-client-react/     # Generated React Query hooks (from codegen)
│   ├── api-zod/              # Generated Zod validation schemas (from codegen)
│   └── db/                   # Drizzle ORM schema & migrations
├── vercel.json               # Vercel deployment config (frontend)
└── pnpm-workspace.yaml
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL (or use [Replit](https://replit.com) with built-in DB)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/digikhata.git
cd digikhata
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set environment variables

Create a `.env` file (or configure secrets in Replit):

```env
# Required
DATABASE_URL=postgres://user:password@localhost:5432/digikhata

# Optional — Anakin.io for live price intelligence
ANAKIN_API_KEY=ak-your-key-here
ANAKIN_BASE_URL=https://api.anakin.ai

# Set to "true" to use mock price data (no API key needed)
DEMO_MODE=false
```

> **Note:** Without `ANAKIN_API_KEY`, the app automatically falls back to demo/mock price data. All budget tracking features work without it.

### 4. Push the database schema

```bash
pnpm --filter @workspace/db run push
```

### 5. Start the servers

```bash
# API server (port 8080)
pnpm --filter @workspace/api-server run dev

# Frontend (separate terminal)
pnpm --filter @workspace/digikhata run dev
```

---

## Sharing on GitHub

### First-time setup

```bash
# 1. Create a new repo on github.com, then:
git init
git add .
git commit -m "feat: initial DigiKhata commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/digikhata.git
git push -u origin main
```

### What's gitignored

The `.gitignore` already excludes:
- `.env` — never commit secrets
- `node_modules/`
- `dist/` build outputs
- `lib/api-client-react/src/generated/` and `lib/api-zod/src/generated/` — regenerated from the spec

Anyone who clones the repo runs `pnpm install` then `pnpm --filter @workspace/api-spec run codegen` to regenerate those files.

---

## Deploying to Vercel

DigiKhata uses a **split deployment** model:
- **Frontend** → Vercel (static build, fast CDN)
- **API + Database** → Replit (persistent Node server + Postgres)

### Step 1 — Deploy the API on Replit

Click **Deploy** inside Replit to publish the API server. Once deployed, copy your production URL (e.g. `https://digikhata.YOUR_USERNAME.repl.co`).

### Step 2 — Update `vercel.json` with your API URL

Edit `vercel.json` in the repo root — replace the placeholder with your Replit API URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR-REPLIT-API-URL/api/:path*"
    }
  ]
}
```

Commit and push this change.

### Step 3 — Import the repo on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo
2. Set the following in the Vercel project settings:

| Setting | Value |
|---|---|
| Framework Preset | Other |
| Build Command | `pnpm install && pnpm --filter @workspace/api-spec run codegen && pnpm --filter @workspace/digikhata run build` |
| Output Directory | `artifacts/digikhata/dist` |
| Install Command | `pnpm install` |
| Node.js Version | 20.x |

3. No environment variables are needed on Vercel (the frontend has no secrets — all sensitive keys live on the API server)
4. Click **Deploy**

### Step 4 — Done

Your frontend is live on Vercel's CDN and all `/api/*` requests are proxied to your Replit backend.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/user/salary` | Save monthly salary, returns auto-computed budget |
| `GET` | `/api/user/profile` | Get user profile and budget allocations |
| `GET` | `/api/budget/summary` | Current month spending vs budget per category |
| `POST` | `/api/budget/log` | Log a spending transaction |
| `GET` | `/api/budget/history` | Spending history (last 50 entries) |
| `POST` | `/api/intent/check` | Pre-purchase check — returns nudge + price alternatives |
| `GET` | `/api/healthz` | Health check |

### Budget Categories

| Category | Allocation | Description |
|----------|-----------|-------------|
| `rent` | 25% | Housing |
| `savings` | 20% | Emergency fund |
| `groceries` | 10% | Food & groceries |
| `fun_leisure` | 10% | Entertainment |
| `health` | 5% | Medical & wellness |
| `ordering_in` | 5% | Food delivery |
| `shopping` | 5% | General purchases |
| `investment` | 20% | Stocks / mutual funds |

---

## Anakin.io Integration

DigiKhata uses two Anakin.io capabilities for live price intelligence:

### Wire Actions (Price Lookup)

Configured in `artifacts/api-server/src/lib/wireOrchestrator.ts`:

| Category | Wire Actions |
|----------|-------------|
| `electronics`, `shopping` | `amazon-product`, `flipkart-search` |
| `ordering_in` | `zomato-orders`, `swiggy-orders` |
| `groceries` | `blinkit-search`, `bigbasket-search` |

### Universal Scraper (Fallback)

When a Wire action fails, the server falls back to Anakin.io's Universal Scraper to extract prices directly from product pages.

### Demo Mode

Set `DEMO_MODE=true` or omit `ANAKIN_API_KEY` to skip all Anakin.io calls and use realistic mock alternatives (Flipkart at 88%, Amazon at 92% of the input price).

---

## Regenerating API Types

After changing `lib/api-spec/openapi.yaml`:

```bash
pnpm --filter @workspace/api-spec run codegen
```

This regenerates:
- `lib/api-client-react/src/generated/` — React Query hooks
- `lib/api-zod/src/generated/` — Zod validation schemas

---

## License

MIT
