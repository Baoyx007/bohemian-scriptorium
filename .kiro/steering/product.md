---
inclusion: always
---

# Product — Bohemian Scriptorium

## One-liner
A medieval Bohemian scriptorium in the browser: rewrite modern Chinese/English into Old Czech, Latin, or Middle English as an illuminated manuscript, or resurrect old texts into plain modern language with glosses.

## Audience
- Hackathon judges (Kiroween 2026, Resurrection) — must succeed in **Demo Mode with no key**
- Curious language / history enthusiasts with optional BYOK
- Owner: Haven (reads Chinese; UI chrome in English for submission). Haven **does not** provide an xAI key.

## Category & theme
- **Category:** Resurrection
- **Theme:** 15th-century Bohemia + light Halloween/Kiroween flavor
- **Easter eggs OK:** Prague golem, Kutná Hora ossuary, plague-era candlelight
- **Forbidden:** Kingdom Come: Deliverance names, characters, logos, art, audio

## Core promises
1. Two modes: **Illuminate** and **Resurrect**.
2. **Static site on GitHub Pages** (`Baoyx007`) — no server, no project API key, no Vercel/Cloudflare backend.
3. **Demo Mode default** (precomputed samples) when no key; optional **BYOK Live Mode** (key in `localStorage` only → `api.x.ai`).
4. Every result labeled **AI reconstruction, not a scholarly translation**, with honesty notes when available.
5. Open-licensed fonts/art only.

## Build split (mandatory honesty)
- **Kiro (cheapest model):** compliance only — specs, steering, hooks, initial empty scaffold.
- **Grok:** all substantive coding (CLI/API as dev tool) and the in-app Live model.
- README / Devpost “How we used Kiro” must state this plainly.

## Non-goals
No accounts, no scholarly guarantee, no hosted proxy, no Haven-owned key.

## Success for Kiroween
Public GitHub under Baoyx007 + MIT + committed `/.kiro` + GitHub Pages demo URL + ≤3 min video + English description + honest Kiro usage write-up. Deadline: **Dec 4, 2026 14:00 PST**.
