---
name: DigiKhata build notes
description: Key decisions and gotchas from the DigiKhata finance app build.
---

The Anakin.io API key (`ANAKIN_API_KEY`) has not been provided yet. The wire orchestrator (`artifacts/api-server/src/lib/wireOrchestrator.ts`) auto-detects missing key and falls back to demo mock data — no crash, always functional.

**Why:** User said they'll provide the key "when needed." The fallback ensures the app works end-to-end without it.

**How to apply:** When the user provides `ANAKIN_API_KEY`, set it via the environment-secrets skill. The wire orchestrator will automatically switch from demo mode to live Wire calls — no code change needed.

Wire action IDs in `CATEGORY_WIRE_MAP` are placeholders from the PRD and need to be verified against the user's actual Anakin.io Wire catalogue before going live.
