# Requirements Document

## Introduction

**Bohemian Scriptorium** is a medieval Bohemia–themed web app for the Kiroween 2026 hackathon (**Resurrection** category). It has two modes:

1. **Illuminate** — rewrite modern Chinese or English into a 15th-century target language (Old Czech, Latin, or Middle English) and render the result as an illuminated parchment manuscript page (exportable as PNG).
2. **Resurrect** — explain a pasted or sample public-domain old text in plain modern language, with per-line glosses.

The app is a **pure static site** (GitHub Pages under `Baoyx007`). There is **no server-side API key** and **no serverless proxy**.

The language model is **Grok via the xAI API**, called **directly from the browser** when the visitor optionally pastes their own key (**bring-your-own-key**). The key is stored only in **`localStorage`**, never committed, and leaves the browser only toward `https://api.x.ai`.

**Demo Mode** (default when no key is present) needs no key: precomputed sample Illuminate transformations and a sample Resurrect document so judges can try the UI instantly.

All AI outputs MUST be labeled as **AI reconstructions**, not scholarly translations. Where useful, the app shows a short note on historical spellings or words used. Theme: medieval Bohemia with light Halloween / Kiroween flavor (optional easter eggs: Prague golem, Kutná Hora ossuary, plague-era candlelight). No Kingdom Come: Deliverance names, characters, or assets. Fonts and art must be original or public-domain / open-licensed (e.g. Google Fonts: UnifrakturMaguntia, IM Fell).

**Development split:** Kiro (cheapest model) is for compliance only — specs, steering, hooks, and a minimal initial scaffold. All substantive coding is done with Grok (CLI/API as the dev tool). Grok is also the in-app Live model. The “How we used Kiro” write-up MUST state this honestly.

## Glossary

- **Illuminate mode**: modern → archaic rewrite + parchment render
- **Resurrect mode**: old text → modern plain-language explanation + glosses
- **Target language**: one of `old-czech` | `latin` | `middle-english`
- **Manuscript page**: the parchment UI (drop cap, borders, body text)
- **Demo Mode**: offline / precomputed provider; no network; default when no key
- **Live Mode**: browser calls `api.x.ai` with the visitor’s own key from localStorage
- **BYOK**: bring-your-own-key settings panel
- **Disclaimer**: visible notice that output is an AI reconstruction

## Requirements

### Requirement 1: Dual-mode workspace

**User Story:** As a visitor, I want to switch between Illuminate and Resurrect so I can either craft a manuscript or understand an old text.

#### Acceptance Criteria

1. WHEN the app loads, THE System SHALL present a clear choice between Illuminate and Resurrect modes.
2. WHEN the user selects a mode, THE System SHALL show only that mode’s primary controls without requiring a page reload.
3. WHEN the user switches modes, THE System SHALL preserve unrelated UI state (theme, settings) and SHALL NOT leak draft text between modes unless the user explicitly copies it.

### Requirement 2: Illuminate — modern input

**User Story:** As a visitor, I want to type modern Chinese or English and choose a target archaic language so the scribe can rewrite my words.

#### Acceptance Criteria

1. WHEN the user is in Illuminate mode, THE System SHALL accept free-text input in modern Chinese and/or English up to a documented character limit (default 2000 characters).
2. WHEN the user selects a target language, THE System SHALL offer exactly three options: Old Czech, Latin, and Middle English.
3. WHEN the input is empty or whitespace-only and the user requests a rewrite, THE System SHALL refuse the request and display a non-blocking validation message.
4. WHEN the input exceeds the character limit, THE System SHALL prevent submission and show the current and max length.

### Requirement 3: Illuminate — rewrite (Demo or Live)

**User Story:** As a visitor, I want my modern text rewritten in the chosen archaic language so I can see a period-flavored manuscript.

#### Acceptance Criteria

1. WHEN the user submits valid Illuminate input and Live Mode is active, THE System SHALL call `https://api.x.ai` from the browser with the stored key and a prompt that requests: (a) archaic rewrite, (b) a short honesty note on spellings/words used, (c) structured JSON the UI can parse.
2. WHEN the user submits valid Illuminate input and Demo Mode is active, THE System SHALL return a precomputed sample transformation for the selected target language (or the closest demo fixture) without calling the network.
3. WHEN a successful result is available, THE System SHALL display the rewrite on the manuscript page and SHALL display the honesty note near the result.
4. WHEN Live Mode fails (network, timeout, 4xx/5xx, CORS, malformed payload), THE System SHALL show a recoverable error that mentions Demo Mode as a fallback and SHALL NOT clear the user’s input.
5. WHEN a rewrite is shown, THE System SHALL label it as an “AI reconstruction, not a scholarly translation.”

### Requirement 4: Manuscript rendering and PNG export

**User Story:** As a visitor, I want the rewrite shown as an illuminated parchment page and exportable as PNG so I can share it.

#### Acceptance Criteria

1. WHEN a rewrite is available, THE System SHALL render it on a parchment-styled page with an illuminated drop cap for the first letter (or first grapheme cluster) and decorative borders.
2. WHEN the rewritten text is empty after a successful parse, THE System SHALL show a fallback message instead of a blank page.
3. WHEN the user clicks Export PNG, THE System SHALL download a PNG of the manuscript viewport at a fixed export scale suitable for social sharing.
4. WHEN fonts fail to load, THE System SHALL fall back to a documented serif stack and still allow export.
5. THE System SHALL use only original CSS/SVG art and open-licensed fonts (e.g. UnifrakturMaguntia, IM Fell); THE System SHALL NOT embed Kingdom Come: Deliverance assets or names.

### Requirement 5: Resurrect — paste or sample

**User Story:** As a visitor, I want to paste an old text or pick a public-domain sample so I can understand what it says.

#### Acceptance Criteria

1. WHEN the user is in Resurrect mode, THE System SHALL accept pasted text up to a documented character limit (default 4000 characters).
2. WHEN the user opens the sample picker, THE System SHALL offer at least three public-domain samples covering Old Czech, Latin, and Middle English (or bilingual glossed snippets), each with source attribution.
3. WHEN the user selects a sample, THE System SHALL populate the input with that sample’s text and attribution.
4. WHEN the input is empty and the user requests resurrection, THE System SHALL refuse and show a validation message.

### Requirement 6: Resurrect — modern explanation and glosses

**User Story:** As a visitor, I want a plain modern explanation and per-line glosses so I can follow difficult passages.

#### Acceptance Criteria

1. WHEN the user submits valid Resurrect input and Live Mode is active, THE System SHALL call the xAI API from the browser for: (a) a plain modern English summary, (b) an ordered list of line/segment glosses `{ original, gloss }`, (c) a short honesty note.
2. WHEN the user submits valid Resurrect input and Demo Mode is active, THE System SHALL show the built-in precomputed resurrected sample document (summary + glosses + honesty) without calling the network; if the pasted text does not match a demo fixture, THE System SHALL still show the sample result with a notice that Demo Mode uses precomputed output.
3. WHEN the response is successful, THE System SHALL show the summary, the gloss list aligned to segments, the honesty note, and the AI-reconstruction disclaimer.
4. WHEN a gloss entry is missing `original` or `gloss`, THE System SHALL skip that entry and still render valid ones.
5. WHEN Live Mode fails, THE System SHALL show a recoverable error mentioning Demo Mode and keep the user’s input.

### Requirement 7: Demo Mode (default) and BYOK Live Mode

**User Story:** As a hackathon judge, I want to try the app with no key; as a visitor with my own xAI key, I want optional live rewrites without the project hosting any secret.

#### Acceptance Criteria

1. WHEN no API key is stored, THE System SHALL run in **Demo Mode** by default and SHALL NOT attempt network calls to `api.x.ai`.
2. WHEN Demo Mode is active, THE System SHALL clearly label the UI as Demo Mode and use only bundled precomputed Illuminate samples (all three target languages) plus at least one precomputed Resurrect document.
3. WHEN the user opens Settings, THE System SHALL allow pasting an xAI API key into a password-style field, saving it only to `localStorage`, and clearing it with an explicit **Clear key** control.
4. WHEN a key is saved, THE System SHALL show a persistent notice that the key is stored only in this browser and is sent only to `https://api.x.ai` (never to project servers — there are none).
5. WHEN a key is present and the user has not forced Demo Mode, THE System SHALL use Live Mode (browser → `api.x.ai`).
6. WHEN the user clears the key, THE System SHALL remove it from `localStorage` and fall back to Demo Mode.
7. THE System SHALL NEVER commit API keys, embed keys in the static build, or require Haven to provide a project-owned key.
8. WHEN a Live Mode request fails due to CORS or a blocked browser preflight, THE System SHALL show an error that explains the likely CORS limitation, keep Demo Mode available, and SHALL NOT crash the page. (Official docs.x.ai do not clearly guarantee browser CORS for Chat Completions; treat CORS as a known risk.)

### Requirement 8: Honesty, theme, and easter eggs

**User Story:** As a visitor (and as a judge), I want the product to feel like a Bohemian scriptorium at Halloween without pretending to be academic scholarship or using copyrighted game IP.

#### Acceptance Criteria

1. THE System SHALL show a persistent or per-result disclaimer that outputs are AI reconstructions, not scholarly translations.
2. WHEN an honesty note is present in the model or demo response, THE System SHALL display it adjacent to the result.
3. THE System SHALL apply a medieval Bohemia visual theme with optional Halloween / Kiroween accents (candlelight, subtle ossuary motifs) that can be toggled or appear as rare easter eggs.
4. WHEN an easter egg triggers (e.g. typing a documented golem keyword), THE System SHALL show a tasteful in-theme message without breaking core flows.
5. THE System SHALL NOT use Kingdom Come: Deliverance titles, character names, logos, or art.

### Requirement 9: Accessibility, i18n chrome, and responsive layout

**User Story:** As a visitor on phone or desktop, I want readable controls (English UI chrome; Chinese-friendly input) so I can use the app comfortably.

#### Acceptance Criteria

1. THE System SHALL provide an English UI chrome (labels, buttons, errors) suitable for the hackathon submission.
2. THE System SHALL accept Chinese and English input in textareas without corrupting characters.
3. WHEN viewed on a viewport down to 360px wide, THE System SHALL remain usable (no clipped primary actions).
4. THE System SHALL expose meaningful `aria` labels on mode switch, settings, submit, clear-key, and export controls.

### Requirement 10: Hackathon deliverables readiness

**User Story:** As the project owner, I want the repo shaped for Kiroween so submission artifacts are easy to complete.

#### Acceptance Criteria

1. THE repository SHALL include a committed `/.kiro` tree (specs, steering, hooks) that is not gitignored.
2. THE repository SHALL include an OSI-approved license file (MIT recommended).
3. THE System SHALL deploy as a **static site on GitHub Pages** from the `Baoyx007` GitHub account (or a repo under that account), with Demo Mode workable out of the box and no server env vars required.
4. THE project README SHALL describe features, Demo vs Live (BYOK), CORS risk, how Kiro was used (specs, steering, hooks), and honesty limitations in English.
