---
inclusion: always
---

# Style & Content Rules

## Honesty
- Always show “AI reconstruction, not a scholarly translation.”
- Surface honesty notes; label Demo vs Live results (`source` field).
- Do not invent shelfmarks or fake citations.
- “How we used Kiro” must be honest: Kiro = specs/steering/hooks/cheap scaffold; Grok = substantive code + runtime model.

## BYOK copy
- Settings must say the key is stored only in this browser’s localStorage and is sent only to `https://api.x.ai`.
- Provide a visible **Clear key** control.
- On CORS failure, prefer calm copy + Demo Mode CTA over blaming the user.

## Visual
- Parchment cream, dark ink, oxblood accents, optional candle glow.
- Illuminated drop cap on first grapheme.
- CSS/SVG you create only — no scraped game textures.
- Show a Demo Mode / Live (BYOK) badge in the chrome.

## Copy
- UI chrome in **English** for the hackathon.
- Accept Chinese and English in inputs.
- Short recoverable errors; no stack traces; never echo the API key.

## IP boundary
- No Kingdom Come: Deliverance titles, characters, or assets.
- Samples public-domain / CC0 with attribution; demo fixtures labeled as AI demo fixtures if synthetic.

## Code style
- TypeScript strict; explicit return types on exports
- No `any` unless justified
- Pure functions for validate / dropCap / gloss guard / keyStore
