# Design Document

## Overview

**Bohemian Scriptorium** is a **static** Vite + React + TypeScript SPA hosted on **GitHub Pages** (`Baoyx007`). No backend, no serverless proxy, no project-owned API key.

- **Demo Mode (default):** bundled precomputed Illuminate samples (3 languages) + one Resurrect document. No network.
- **Live Mode (optional BYOK):** visitor pastes an xAI key in Settings → stored only in `localStorage` → browser calls `https://api.x.ai` directly. Clear-key control + notice that the key never leaves the browser except to `api.x.ai`.

Property-based tests with `fast-check` guard parsing, validation, demo fixtures, and disclaimer invariants.

**Hackathon fit:** Resurrection — reviving dead languages and manuscripts with AI, while staying honest that results are reconstructions.

## Build split (honest)

| Role | Owns |
|------|------|
| **Kiro (cheapest model)** | Compliance only: `.kiro` specs / steering / hooks already authored; **initial scaffold** (Vite app shell, folder layout, empty stubs, README skeleton). Few, small tasks. |
| **Grok (CLI / xAI API + coding)** | **All substantive implementation**: providers, prompts, UI, parchment, PNG export, Demo fixtures, tests, GH Pages wiring, polish. |
| **Grok (runtime)** | In-app Live Mode model via `api.x.ai`. |

The Devpost / README “How we used Kiro” section MUST state this split plainly: Kiro for structured specs + cheap scaffold; Grok for the real coding and the live model.

## Goals / Non-goals

### Goals
- Ship a polished two-mode demo before **Dec 4, 2026 14:00 PST** (Dec 5 06:00 SGT).
- Judges can use **Demo Mode with zero setup**.
- Optional Live Mode via visitor BYOK; Haven provides **no** key.
- Make Kiro usage visible via committed `.kiro/` (specs, steering, hooks) + minimal scaffold.
- Label all LLM / demo output as AI reconstruction.

### Non-goals
- Server-side secrets, Vercel/Cloudflare Workers, or any proxy Haven must host.
- Scholarly philology or verified paleography.
- User accounts or persistence beyond `localStorage` for the optional key.
- Kingdom Come: Deliverance IP.

## Architecture

```
┌──────────────────────────────────────────┐
│  Static SPA (GitHub Pages)               │
│  Vite / React / TS                       │
│  Modes: Illuminate | Resurrect           │
│  Settings: BYOK localStorage + Clear     │
│  Manuscript + PNG export                 │
└──────────────────┬───────────────────────┘
                   │
         ┌─────────┴──────────┐
         ▼                    ▼
   DemoProvider          XaiBrowserProvider
   (bundled JSON         (fetch api.x.ai with
    fixtures)             key from localStorage)
```

### Components (frontend)

| Component | Responsibility |
|-----------|----------------|
| `AppShell` | Theme, layout, disclaimer banner, Demo/Live badge, easter eggs |
| `SettingsPanel` | Paste key, save to localStorage, Clear key, CORS/privacy notice |
| `ModeTabs` | Switch Illuminate / Resurrect |
| `IlluminateForm` | Input, target language, submit, length meter |
| `ResurrectForm` | Paste area, sample picker, submit |
| `ManuscriptPage` | Parchment, drop cap, borders, honesty note |
| `GlossList` | Per-segment original + gloss |
| `ExportButton` | PNG capture of manuscript node |
| `ErrorToast` | Recoverable API / CORS / validation errors |

### Modules

| Module | Responsibility |
|--------|----------------|
| `providers/types` | `LlmProvider`, request/response DTOs |
| `providers/demo` | Precomputed fixtures; no `fetch` |
| `providers/xaiBrowser` | Browser `fetch` to `https://api.x.ai/v1/chat/completions` |
| `providers/factory` | Demo if no key (or forced demo); else Live |
| `keyStore` | `localStorage` get/set/clear for the xAI key |
| `prompts` | System + user prompt builders |
| `validate` | Input limits, mode enums, DTO guards |
| `samples` | Public-domain sample corpus + attributions |
| `demoFixtures` | Illuminate × 3 languages + Resurrect document |

## Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Bundler / UI | Vite + React + TypeScript | Static-friendly, fast DX |
| Hosting | **GitHub Pages** (`Baoyx007`) | No server; free public demo URL |
| Styling | CSS modules + CSS variables | Custom parchment |
| Fonts | Google Fonts: `UnifrakturMaguntia`, `IM Fell English` | Open, medieval |
| PNG export | `html-to-image` | DOM → PNG |
| LLM (live) | Browser → xAI Chat Completions | BYOK |
| LLM (demo) | Bundled JSON fixtures | Judges / no key |
| Tests | Vitest + fast-check | Kiro correctness properties |
| Lint | ESLint + Prettier | Hook-friendly |
| License | MIT | OSI |

## CORS risk (documented)

Official **docs.x.ai** do **not** clearly guarantee browser CORS for Chat Completions. Third-party probes have reported permissive `Access-Control-Allow-Origin` at times, and blocked preflights at other times. Therefore:

1. **Demo Mode is the reliable judge path** and the default.
2. Live Mode attempts `fetch` to `https://api.x.ai/...` with `Authorization: Bearer <key>`.
3. On CORS / network failure, UI shows a clear error + “Switch to Demo Mode” CTA; app remains usable.
4. Optional stretch (not required): document a *visitor-run* local CORS proxy; **do not** add a project-hosted proxy or Vercel/CF Worker.

## Data Models

```ts
export type Mode = 'illuminate' | 'resurrect';
export type TargetLanguage = 'old-czech' | 'latin' | 'middle-english';
export type RuntimeMode = 'demo' | 'live';

export interface ScribeRequest {
  mode: Mode;
  text: string;
  targetLanguage?: TargetLanguage; // required for illuminate
  uiLocale?: 'en' | 'zh';
}

export interface HonestyNote {
  summary: string;
  examples?: string[];
}

export interface IlluminateResult {
  mode: 'illuminate';
  archaicText: string;
  targetLanguage: TargetLanguage;
  honesty: HonestyNote;
  disclaimer: 'ai-reconstruction';
  source: 'demo' | 'live';
}

export interface GlossLine {
  original: string;
  gloss: string;
}

export interface ResurrectResult {
  mode: 'resurrect';
  modernSummary: string;
  modernSummaryZh?: string;
  glosses: GlossLine[];
  honesty: HonestyNote;
  disclaimer: 'ai-reconstruction';
  attribution?: string;
  source: 'demo' | 'live';
  demoNotice?: string; // when demo fixture used regardless of paste
}

export type ScribeResult = IlluminateResult | ResurrectResult;

export interface ScribeErrorBody {
  error: string;
  code: 'validation' | 'cors' | 'provider' | 'parse' | 'no-key';
}
```

### Key storage

```ts
// localStorage key name — document in README
const XAI_KEY_STORAGE = 'bohemian-scriptorium.xaiKey';
```

Never log the key. Clear removes the item entirely.

## Prompt Design

Same as prior plan (JSON-only, honesty, disclaimer, banned KCD IP). Used only by `XaiBrowserProvider` in Live Mode. Demo Mode skips prompts and returns fixtures.

## Data Flow

### Boot
```
App load → keyStore.get()
  → if missing: RuntimeMode=demo, badge "Demo Mode"
  → if present: RuntimeMode=live (unless user forced demo), badge "Live (BYOK)"
```

### Illuminate
```
Submit → validate
  → demo? DemoProvider.fixture(targetLanguage)
  → live? XaiBrowserProvider.complete(prompts.illuminate(...))
  → guard → ManuscriptPage + honesty + disclaimer
  → optional PNG export
```

### Resurrect
```
Submit → validate
  → demo? DemoProvider.resurrectSample (+ demoNotice if text ≠ fixture)
  → live? XaiBrowserProvider.complete(prompts.resurrect(...))
  → guard glosses → Summary + GlossList
```

## Error Handling

| Case | Behavior |
|------|----------|
| Empty / oversize input | Inline validation |
| Live call CORS / blocked preflight | `code: 'cors'`; suggest Demo Mode |
| Upstream 4xx/5xx / timeout | `code: 'provider'`; keep input |
| Malformed model JSON | `code: 'parse'`; keep input |
| PNG export failure | Toast; keep manuscript |

## Theming & Easter Eggs

Unchanged: parchment theme; golem / ossuary / candlelight easter eggs; no KCD assets.

## Testing Strategy

### Example-based
- Demo default when no key
- Settings save / clear key round-trip (mock `localStorage`)
- Demo fixtures render for all three Illuminate languages + Resurrect
- Disclaimer always visible on results
- CORS failure path shows Demo CTA (mock `fetch` rejection)

### Property-based (fast-check)

#### Property 1: Input length bound
*For any* string `s`, validation accepts iff trim nonempty and `s.length <= LIMIT`.

#### Property 2: Target language enum
*For any* Illuminate request, `targetLanguage` accepted iff in the three-value set.

#### Property 3: Disclaimer invariant
*For any* guarded `ScribeResult`, `disclaimer === 'ai-reconstruction'`.

#### Property 4: Gloss robustness
*For any* candidate gloss array, guard keeps only nonempty `original`+`gloss`, order preserved.

#### Property 5: Demo determinism
*For any* identical demo request, `DemoProvider` returns deeply equal results; never calls `fetch`.

#### Property 6: Drop cap grapheme
*For any* nonempty archaic text, first grapheme + rest recomposes the string.

#### Property 7: Runtime mode selection
*For any* key string `k`, factory chooses `demo` when `k` is empty/whitespace (or demo forced); chooses `live` only when a nonempty key is present and demo not forced.

#### Property 8: Sample / fixture license
*For any* public sample or demo fixture metadata, license is `public-domain` or `cc0` with nonempty attribution (or explicit “AI demo fixture” label for synthetic demo archaic text).

#### Property 9: Key store isolation
*For any* key string, after `clear()`, `get()` returns null and Demo Mode would be selected.

## Project Structure (target)

```
bohemian-scriptorium/
├── .kiro/
│   ├── specs/scribe/{requirements,design,tasks}.md
│   ├── steering/{product,tech,structure,style}.md
│   └── hooks/*.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/...
│   ├── lib/{validate,prompts,samples,demoFixtures,dropCap,keyStore}.ts
│   ├── providers/{types,demo,xaiBrowser,factory}.ts
│   └── styles/...
├── tests/
├── public/
├── index.html
├── package.json
├── vite.config.ts   # base path for GH Pages if needed
├── LICENSE
├── README.md
└── SUMMARY_zh.md
```

No `api/` directory.

## Deployment

1. Public GitHub repo under **`Baoyx007`** with MIT + committed `.kiro/`.
2. `vite` build → GitHub Pages (Actions or `gh-pages` branch); set `base` if project-pages path.
3. Demo URL on Devpost; video ≤3 min showing Demo Mode (required) and optional Live if CORS works.

## Security & Privacy (BYOK)

- Key only in browser `localStorage`; Clear key removes it.
- Settings copy: key is sent only to `https://api.x.ai`; this static site has no server to receive it.
- Visitors use their own quota; Haven does not provide a key.
- Demo Mode never needs a key.
