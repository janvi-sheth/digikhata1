# DigiKhata

A proactive personal finance app for first-time earners and college students that auto-splits salary into budget buckets and delivers calm, AI-powered nudges before overspending.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/digikhata run dev` — run the frontend (port 19669)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Optional env: `ANAKIN_API_KEY`, `ANAKIN_BASE_URL` — for live price intelligence via Anakin.io Wire
- Optional env: `DEMO_MODE=true` — use mock price data instead of live Anakin.io calls

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18, Vite, Tailwind CSS, shadcn/ui, TanStack Query, wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Price Intel: Anakin.io Wire + Universal Scraper (with in-memory TTL cache)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/index.ts` — Drizzle schema: `usersTable`, `spendingLogTable`
- `artifacts/api-server/src/routes/` — user.ts, budget.ts, intent.ts
- `artifacts/api-server/src/lib/` — budgetEngine, nudgeEngine, wireOrchestrator, scraperFallback, cache
- `artifacts/digikhata/src/pages/` — Dashboard, Check, History, Profile
- `lib/api-client-react/src/generated/` — generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — generated Zod schemas (do not edit)

## Architecture decisions

- **Single userId "default"** — no auth in v1; all data scoped to a single user. Auth can be layered on later.
- **Demo mode auto-enabled** — if `ANAKIN_API_KEY` is missing the wire orchestrator silently returns mock price alternatives (Flipkart 88%, Amazon 92%). This means the app is always functional.
- **In-memory TTL cache** — Wire/Scraper results cached 5 minutes in process memory. Sufficient for a hackathon; swap for Redis in production.
- **OpenAPI-first contract** — all types flow from `openapi.yaml` via Orval codegen. Never hand-write types that codegen produces.
- **Spending scoped to current calendar month** — budget summary filters `spending_log` to `createdAt >= start_of_month` in-process (no SQL date filter for simplicity).

## Product

- Dashboard: month progress, category budget bars (spent vs allocated), active overpacing nudges
- Check Purchase (/check): enter product + price + category → get AI nudge + cheaper alternatives
- Spending History (/history): chronological list of all logged transactions
- Profile (/profile): set monthly salary → auto-compute 8 budget buckets

## Budget Categories

| Category | Allocation |
|---|---|
| Rent | 25% |
| Savings | 20% |
| Groceries | 10% |
| Fun & Leisure | 10% |
| Health | 5% |
| Ordering In | 5% |
| Shopping | 5% |
| Investment | 20% |

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any change to `openapi.yaml`
- `pnpm run build` needs `PORT` and `BASE_PATH` env vars — use `typecheck` for verification instead
- The DB schema uses `numeric` for monetary amounts (stored as strings by pg driver) — always `parseFloat()` on read
- Wire action IDs in `wireOrchestrator.ts` need to match your Anakin.io catalogue before going live

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `README.md` for GitHub-ready documentation including setup instructions and API reference

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
