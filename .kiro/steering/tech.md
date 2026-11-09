---
inclusion: always
---

# Technology Stack

## Frontend (static only)
- Vite + React + TypeScript
- CSS modules / CSS variables
- Google Fonts: UnifrakturMaguntia, IM Fell English (+ serif fallbacks)
- PNG export: `html-to-image` (or equivalent)
- Hosting: **GitHub Pages** (repo under `Baoyx007`)

## No backend
- No Vercel, no Cloudflare Workers, no serverless proxy
- No server env vars; Haven provides no API key

## LLM access
- **DemoProvider:** bundled fixtures; default when no key
- **XaiBrowserProvider:** browser `fetch` to `https://api.x.ai` with BYOK from `localStorage`
- Settings: save key, clear key, privacy notice (key → only `api.x.ai`)
- CORS for Chat Completions is **not clearly guaranteed** by docs.x.ai — treat as risk; Demo Mode is the reliable path

## Testing & quality
- Vitest + Testing Library + fast-check (P1–P9)
- ESLint + Prettier

## Who implements what
- Kiro cheapest model: scaffold stubs only
- Grok: all substantive packages, UI, providers, tests, deploy config

## Package manager
- npm (lockfile committed)

## Constraints
- `.kiro/` committed (not gitignored)
- MIT license
- No Kingdom Come: Deliverance assets
