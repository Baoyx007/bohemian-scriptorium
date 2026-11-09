# How we used Kiro

**Account:** `baoyx700@gmail.com` (Google) via `kiro-cli`  
**CLI:** `kiro-cli 3.1.0` (`~/.local/bin/kiro-cli`)  
**Proxy:** `HTTP(S)_PROXY=http://127.0.0.1:8791`

## Honest split

- **Kiro (cheapest models):** compliance footprint — `.kiro` specs/steering/hooks and tiny scaffold/steering refinements only.
- **Grok:** all substantive product coding (UI, fixtures, tests, Pages workflow) and the in-app Live model.

## Live Kiro step (genuine)

| Field | Value |
|-------|--------|
| When (SGT) | 2026-11-09 ~12:02 |
| Command | `kiro-cli chat --model qwen3-coder-next --effort low --no-interactive --trust-workspace --trust-tools=fs_read,fs_write,fs_list` |
| Model | **`qwen3-coder-next`** (0.05× credits — cheapest listed) |
| Effort | `low` (CLI warned model ignores extra effort fields) |
| Prompt intent | Compliance-only: create one steering file; do not touch `src/` |
| File produced | `.kiro/steering/manuscript-polish.md` |
| Tool log | `[tool] Creating manuscript-polish.md` → `Completed` |
| Result | File created with `inclusion: always`; covers result-panel contrast, manuscript ornaments, Demo Mode fixture minimums (incl. Chinese→Old Czech / Middle English), and IP/font rules |

### Steering file summary

Kiro wrote rules for:

1. Light text on dark Resurrect/result panels (no dark-on-dark).
2. Manuscript leaf: parchment texture, vine/knot SVG borders, gold-and-red initial, rubrication, wax seal, candle vignette, optional ossuary/golem easter eggs (original art only).
3. Demo fixtures ≥4 per mode, including Chinese→Old Czech and Chinese→Middle English.
4. No Kingdom Come: Deliverance IP; open Google Fonts only.

## Earlier session notes

| When (SGT) | Action | Result |
|------------|--------|--------|
| 2026-11-09 morning | Device login codes issued while approval pending | Blocked |
| 2026-11-09 ~12:00 | `whoami` during polish | Not logged in — polish done without Kiro |
| 2026-11-09 ~12:01+ | Login confirmed; cheapest-model steering write | **Succeeded** (this log) |

## Spec package (already in repo)

- `.kiro/specs/scribe/{requirements,design,tasks}.md`
- `.kiro/steering/{product,tech,structure,style,manuscript-polish}.md`
- `.kiro/hooks/{test-on-save,honesty-on-ui-save}.json`
