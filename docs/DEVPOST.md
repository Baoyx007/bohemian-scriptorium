# Bohemian Scriptorium

**Tagline:** Illuminate modern words as medieval parchment — or resurrect old texts into plain speech.

**Category:** Resurrection (Kiroween 2026)

## Inspiration

Medieval Bohemia left a trail of iron-gall ink, rubrication, and prayers that still haunt Prague and Kutná Hora. We wanted a tiny scriptorium on the web: something that feels like candlelight on parchment, stays honest that the prose is AI reconstruction rather than philology, and can ship as a static site with no server holding anyone’s API key. The Resurrection theme fit — bring dead languages into plain speech, and illuminate living words into archaic leaf form — without borrowing any Kingdom Come: Deliverance assets.

## What it does

Bohemian Scriptorium is a Vite + React static web app with two modes:

- **Illuminate** — modern Chinese or English → Old Czech, Latin, or Middle English, rendered on an illuminated parchment leaf (drop capital, vines, wax seal, colophon *Scriptum Pragae, anno Domini MMXXVI*).
- **Resurrect** — Latin / Old Czech / Middle English (and public-domain samples) → plain-speech glosses with honesty notes.

**Demo Mode** is the default: offline fixtures, no key. Optional **Live Mode** is bring-your-own xAI key stored only in `localStorage` and sent only to `api.x.ai`. Marginalia easter eggs: type `kutna` / `ossuary` or `emet` for original SVG nods to the ossuary and the Prague golem. Export PNG captures the leaf with correct framing. Honesty banner on every result: AI reconstructions, not scholarly translations.

## How we built it

- **Stack:** Vite, React, TypeScript, Vitest + fast-check, html-to-image, GitHub Pages (`base: /bohemian-scriptorium/`) with a GitHub Actions deploy workflow.
- **Design:** parchment / iron-gall / oxblood tokens with WCAG-minded contrast; original SVG ornaments and Google Fonts only.
- **Fixtures:** six Illuminate demos (including Chinese→Old Czech / Middle English / Latin) and five Resurrect samples with licenses and attributions.
- **Deploy:** public repo under Baoyx007, Pages from Actions, live at the URL below.

## How we used Kiro

Honest split, documented in `docs/KIRO_USAGE.md`:

- **Kiro (cheapest models):** compliance footprint only — the `.kiro` specs (`requirements` / `design` / `tasks`), steering (`product`, `tech`, `structure`, `style`), hooks (`test-on-save`, `honesty-on-ui-save`), and one genuine cheapest-model chat (`qwen3-coder-next`, 0.05×) that wrote `.kiro/steering/manuscript-polish.md` without touching `src/`.
- **Grok:** all substantive product coding (UI, fixtures, export framing, contrast fixes, tests, Pages workflow) and the in-app Live model when the user supplies a key.

We did **not** pretend Kiro wrote the application. The steering file and package are real; the app is mostly Grok-implemented against that package.

## Challenges we ran into

- Keeping parchment text readable (iron-gall on cream) while result panels stay light-on-dark — plus automated contrast checks.
- `html-to-image` cropped / shifted the leaf until we pinned bbox, canvas scale, and clone style resets (margin/transform).
- Static GitHub Pages + BYOK: no server secrets, Demo fallback when Live CORS fails, and honest UX about reconstructions.
- Box egress / TLS quirks when verifying github.io; we verified via external fetch and the Actions deployment API.

## Accomplishments that we're proud of

- A complete Demo Mode experience with Chinese→Old Czech illumination, drop caps, colophon, and easter eggs.
- Clean export PNG framing and a public Pages deploy that stays keyless by default.
- An auditable Kiro footprint (specs, steering, hooks, cheapest-model log) without overclaiming authorship.
- Tests green: 5 files / 22 tests including property checks.

## What we learned

- Specs and steering are most useful when they constrain honesty, IP, and UX — not when they try to replace implementation.
- Cheapest-model Kiro steps work well for compliance artifacts; pair them with a stronger coding agent for the product.
- Medieval “look” fails fast without contrast discipline and original ornament art.

## What's next

- More Demo fixtures and language pairs; richer gloss provenance.
- Optional offline WASM / local models for Live Mode without a network key.
- Printable multi-leaf quires and shared leaf galleries (still BYOK / no server keys).

## Built with

`kiro` · `react` · `typescript` · `vite` · `vitest` · `fast-check` · `html-to-image` · `github-pages` · `github-actions` · `xai-grok` (optional BYOK)

## Links

- **Live demo:** https://baoyx007.github.io/bohemian-scriptorium/
- **Repository:** https://github.com/Baoyx007/bohemian-scriptorium
- **Kiro usage log:** https://github.com/Baoyx007/bohemian-scriptorium/blob/main/docs/KIRO_USAGE.md

## Try it

1. Open the live demo (Demo Mode needs no key).
2. Illuminate → pick **Chinese → Old Czech (spring mercy)** → **Illuminate manuscript**.
3. Type `kutna` or `emet` in the text for marginalia.
4. Switch to Resurrect → pick Chaucer or Ave Maria → **Resurrect document**.
5. Optional: Settings → paste your own xAI key for Live Mode (stored only in this browser).
