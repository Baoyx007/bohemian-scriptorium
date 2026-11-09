---
inclusion: always
---

# Project Structure

```
bohemian-scriptorium/
├── .kiro/specs/scribe/     # requirements, design, tasks
├── .kiro/steering/         # product, tech, structure, style
├── .kiro/hooks/            # JSON hooks (v1)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/         # shell, settings, forms, manuscript, glosses
│   ├── lib/                # validate, prompts, samples, demoFixtures, dropCap, keyStore
│   ├── providers/          # types, demo, xaiBrowser, factory
│   └── styles/
├── tests/
├── public/
├── LICENSE
├── README.md
└── SUMMARY_zh.md
```

No `api/` directory.

## Naming
- Components: `PascalCase.tsx`
- Libs: `camelCase.ts`
- Hook JSON: kebab-case
- Tests: `foo.test.ts` / `foo.property.ts`

## Imports
- Prefer `@/` → `src/`
- Key material only via `keyStore`; never hardcode

## Task owners
- Follow `[Kiro]` vs `[Grok]` tags in `tasks.md`
- Do not expand Kiro beyond scaffold; push feature work to Grok
