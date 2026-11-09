# Implementation Plan

> Mark `- [ ]` → `- [x]` when done.  
> **Owner tags:** `[Kiro]` = compliance / cheap-model scaffold only (few, small). `[Grok]` = substantive implementation (default for coding).  
> Honest split for the “How we used Kiro” write-up: Kiro does specs (already here), steering, hooks, and initial scaffold; Grok does all real coding and is the in-app Live model.

## Phase 0 — Kiro compliance & tiny scaffold

- [x] 1. `[Kiro]` Ensure `.kiro/specs`, `.kiro/steering`, `.kiro/hooks` remain committed; `.gitignore` does **not** ignore `.kiro/`.
- [x] 2. `[Kiro]` Scaffold Vite + React + TypeScript app shell (empty `App`, folder stubs per `structure.md`), MIT `LICENSE`, baseline `README` skeleton, npm scripts placeholders (`dev`, `build`, `preview`, `test`, `lint`). Use Kiro’s **cheapest** model. Stop once the empty app builds; do not implement features in Kiro.
- [x] 3. `[Kiro]` Add empty stub files only: `providers/types.ts`, `keyStore.ts`, `components/SettingsPanel.tsx` (placeholders). No business logic.

## Phase 1 — Domain core `[Grok]`

- [x] 4. `[Grok]` Implement shared types + guards for `ScribeRequest`, results, errors in `providers/types.ts` + `lib/validate.ts`.
- [x] 5. `[Grok]` Property tests **P1–P4** (length, target-language enum, disclaimer, gloss robustness); make them pass.
- [x] 6. `[Grok]` Implement `DemoProvider` + `demoFixtures` (Illuminate × 3 languages, one Resurrect document); property test **P5** (determinism, no `fetch`).
- [x] 7. `[Grok]` Implement `keyStore` (localStorage get/set/clear) + property test **P9**; never log the key.
- [x] 8. `[Grok]` Implement prompt builders `lib/prompts.ts` with unit tests (JSON schema reminders, banned KCD phrase).
- [x] 9. `[Grok]` Implement `XaiBrowserProvider` (browser `fetch` to `https://api.x.ai/v1/chat/completions` with BYOK header); map CORS/network failures to `code: 'cors' | 'provider'`.
- [x] 10. `[Grok]` Provider factory: Demo when no key / forced demo; Live when nonempty key; property test **P7**.

## Phase 2 — UI shell, settings, modes `[Grok]`

- [x] 11. `[Grok]` `AppShell`: English chrome, AI-reconstruction banner, Demo/Live badge, responsive to 360px.
- [x] 12. `[Grok]` `SettingsPanel`: password-style key field, Save, **Clear key**, notice that key stays in this browser and is sent only to `api.x.ai`; force-Demo toggle optional.
- [x] 13. `[Grok]` `ModeTabs` + `IlluminateForm` (textarea, target language, length meter, submit).
- [x] 14. `[Grok]` `ResurrectForm` + sample picker (`lib/samples.ts`, ≥3 public-domain samples); property test **P8**.
- [x] 15. `[Grok]` Wire forms through factory; loading + `ErrorToast` with Demo fallback on Live failure; keep inputs on error.

## Phase 3 — Manuscript, glosses, export `[Grok]`

- [x] 16. `[Grok]` `dropCap` grapheme splitter + property test **P6**; `ManuscriptPage` (parchment, borders, drop cap, honesty note).
- [x] 17. `[Grok]` `GlossList` (skip invalid rows).
- [x] 18. `[Grok]` Google Fonts (UnifrakturMaguntia, IM Fell) + serif fallbacks; verify no KCD assets.
- [x] 19. `[Grok]` `ExportButton` (`html-to-image` or equivalent) → PNG download; toast on failure.

## Phase 4 — Theme, a11y, deploy `[Grok]`

- [x] 20. `[Grok]` Bohemia + Halloween CSS; golem / ossuary / candlelight easter eggs without breaking flows.
- [x] 21. `[Grok]` Accessibility: aria on mode switch, settings, submit, clear-key, export; keyboard paths.
- [x] 22. `[Grok]` Configure Vite `base` if needed; GitHub Pages deploy (Actions or branch) under **`Baoyx007`**; Demo Mode works on the public URL with zero env vars.
- [x] 23. `[Grok]` Expand English `README.md`: features, Demo vs BYOK Live, CORS risk, **honest “How we used Kiro”** (Kiro = specs/steering/hooks/cheap scaffold; Grok = all substantive code + runtime model), honesty limitations, license.
- [ ] 24. `[Grok]` Record ≤3 min video (Demo Mode required; Live optional); Devpost English description + Kiro usage write-up matching the honest split; submit before **Dec 4, 2026 14:00 PST**.

## Optional stretch `[Grok]` (do not block submission)

- [ ] 25. `[Grok]` *(Optional)* Document a visitor-run local CORS workaround; still no project-hosted proxy.
- [ ] 26. `[Grok]` *(Optional)* Chinese UI chrome toggle / streaming Live responses.
