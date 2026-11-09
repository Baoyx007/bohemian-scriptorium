# How we used Kiro

**Status on 2026-11-09 (Asia/Singapore):** `kiro-cli whoami` → **Not logged in**  
CLI installed: `kiro-cli 3.1.0` (`~/.local/bin/kiro-cli`).

## Planned (when login completes)

Haven’s account `baoyx700@gmail.com` (Kiro Free + Kiroween credits) should approve device login:

```bash
export HTTPS_PROXY=http://127.0.0.1:8791 HTTP_PROXY=http://127.0.0.1:8791
kiro-cli login --license free --social google --use-device-flow
```

Then run a **cheapest-model** compliance-only step, for example:

- Review `.kiro/specs/scribe/requirements.md` and append a short steering note, or
- Regenerate / refine a tiny stub under `.kiro/steering/` without rewriting app features.

## What actually happened this session

- Device codes were issued but approval was still pending in a parallel flow.
- Substantive product polish (contrast, manuscript ornaments, demo fixtures, tests, screenshots) was implemented **outside** Kiro (Grok), matching the project split: Kiro = compliance footprint; Grok = real coding.
- `.kiro/` specs, steering, and hooks remain the compliance package; they were authored for Kiro-native structure earlier.

When login succeeds, append a dated note below listing the exact `kiro-cli` prompt and files Kiro touched.

## Append log

| When (SGT) | Action | Result |
|------------|--------|--------|
| 2026-11-09 ~12:00 | `kiro-cli whoami` | Not logged in — skipped live Kiro step |
