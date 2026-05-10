# DigiKhata

AI-powered behavioural spending coach for first-time earners in India.

## Run locally on Windows

Double-click `start-digikhata.cmd`, or run:

```powershell
cd "C:\Users\JANVI SHETH\OneDrive\Dokumen\New project"
npm.cmd run dev
```

Then open:

```text
http://localhost:3000
```

The launcher also opens the browser automatically after a short delay.

If you see `ENOENT Could not read package.json` with this path:

```text
C:\Users\JANVI SHETH\package.json
```

the command was launched from the home folder instead of this project folder. Run the `cd` command above first, or double-click `start-digikhata.cmd`.

If PowerShell blocks `npm`, use `npm.cmd` exactly as shown.

## Quality checks

```powershell
npm.cmd run verify
```

This runs TypeScript validation and the Node test suite for the behaviour engine and scraper normalization.

## Demo data

Use `sample-transactions.csv` or the built-in demo profiles on the Analyze page to test CSV upload.

Demo profile CSVs live in `public/demo-csv`:

- `steady-saver.csv`
- `salary-week-splurge.csv`
- `late-night-delivery-loop.csv`
- `weekend-shopper.csv`
- `allowance-starter.csv`

The Analyze page also includes salary and allowance inputs. DigiKhata sends salary + allowance as the monthly budget context so overspend predictions and nudges adapt to the user's income.

## Anakin-powered personalization

See `docs/anakin-integration.md` for the full ingestion, analysis, nudge, and personalized update flow.

For live URL scraping, create `.env.local`:

```text
ANAKIN_API_KEY=your_key_here
```
