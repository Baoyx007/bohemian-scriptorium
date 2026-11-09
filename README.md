# Bohemian Scriptorium

Medieval Bohemia–themed **static** web app for **Kiroween 2026** (**Resurrection**).

Demo: GitHub Pages at `https://baoyx007.github.io/bohemian-scriptorium/` (after you push and enable Pages).

## What it does

1. **Illuminate** — Modern Chinese/English → Old Czech / Latin / Middle English → illuminated parchment → **PNG**.
2. **Resurrect** — Old text (or public-domain sample) → plain modern explanation + glosses.

## Demo Mode vs Live (BYOK)

| Mode | When | Network |
|------|------|---------|
| **Demo Mode** (default) | No key in Settings | None — precomputed samples |
| **Live Mode** | Visitor pastes their own xAI key | Browser → `https://api.x.ai` only |

- Key storage: **`localStorage` only**, with **Clear key**.
- **CORS risk:** docs.x.ai do not clearly guarantee browser CORS for Chat Completions. If Live fails, use Demo Mode.

Haven does **not** provide an API key. Judges should use Demo Mode.

## How we used Kiro (honest)

- **Kiro (cheapest model):** compliance artifacts in `.kiro/` (specs, steering, hooks) and intended for a **minimal scaffold** only.
- **Grok:** **all substantive coding** and the **in-app Live model**.

See `.kiro/specs/scribe/tasks.md` tags `[Kiro]` / `[Grok]`.

## Scripts

```bash
npm install   # or bun install
npm run dev
npm test
npm run build
npm run preview
```

## License

MIT — see `LICENSE`.
