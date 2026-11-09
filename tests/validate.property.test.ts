import { describe, expect, it } from 'vitest'
import * as fc from 'fast-check'
import {
  acceptsInputLength,
  acceptsTargetLanguage,
  assertDisclaimer,
  guardGlosses,
  guardIlluminateResult,
  guardResurrectResult,
} from '../src/lib/validate'
import { ILLUMINATE_LIMIT, RESURRECT_LIMIT } from '../src/providers/types'
import { splitDropCap } from '../src/lib/dropCap'
import { DemoProvider } from '../src/providers/demo'
import { resolveRuntimeMode } from '../src/providers/factory'
import { allSamplesLicensed } from '../src/lib/samples'
import { clearKey, getKey, setKey } from '../src/lib/keyStore'

describe('P1 input length bound', () => {
  it('accepts iff trim nonempty and within limit', () => {
    fc.assert(
      fc.property(fc.string({ maxLength: 2500 }), fc.constantFrom(ILLUMINATE_LIMIT, RESURRECT_LIMIT), (s, limit) => {
        expect(acceptsInputLength(s, limit)).toBe(
          s.trim().length > 0 && s.length <= limit,
        )
      }),
      { numRuns: 80 },
    )
  })
})

describe('P2 target language enum', () => {
  it('accepts only the three languages', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        const ok = acceptsTargetLanguage(s)
        expect(ok).toBe(
          s === 'old-czech' || s === 'latin' || s === 'middle-english',
        )
      }),
      { numRuns: 50 },
    )
  })
})

describe('P3 disclaimer invariant', () => {
  it('guarded results always have ai-reconstruction', () => {
    const ill = guardIlluminateResult(
      {
        archaicText: 'Ave',
        honesty: { summary: 'note' },
      },
      'latin',
      'demo',
    )
    const res = guardResurrectResult(
      {
        modernSummary: 'Hello',
        glosses: [{ original: 'a', gloss: 'b' }],
        honesty: { summary: 'note' },
      },
      'demo',
    )
    expect(assertDisclaimer(ill)).toBe(true)
    expect(assertDisclaimer(res)).toBe(true)
  })
})

describe('P4 gloss robustness', () => {
  it('keeps only nonempty original+gloss in order', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            original: fc.string(),
            gloss: fc.string(),
          }),
          { maxLength: 20 },
        ),
        (rows) => {
          const guarded = guardGlosses(rows)
          let gi = 0
          for (const row of rows) {
            if (row.original.trim() && row.gloss.trim()) {
              expect(guarded[gi]?.original).toBe(row.original.trim())
              expect(guarded[gi]?.gloss).toBe(row.gloss.trim())
              gi += 1
            }
          }
          expect(guarded.length).toBe(gi)
        },
      ),
      { numRuns: 60 },
    )
  })
})

describe('P5 demo determinism', () => {
  it('identical requests are deeply equal and never fetch', async () => {
    const provider = new DemoProvider()
    const spy = viFetchSpy()
    const a = await provider.complete({
      mode: 'illuminate',
      text: 'hello',
      targetLanguage: 'latin',
    })
    const b = await provider.complete({
      mode: 'illuminate',
      text: 'hello',
      targetLanguage: 'latin',
    })
    expect(a).toEqual(b)
    expect(spy.calls).toBe(0)
    spy.restore()
  })
})

describe('P6 drop cap grapheme', () => {
  it('first + rest recomposes nonempty text', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (s) => {
        const { first, rest } = splitDropCap(s)
        expect(first + rest).toBe(s)
        expect(first.length).toBeGreaterThan(0)
      }),
      { numRuns: 80 },
    )
  })
})

describe('P7 runtime mode selection', () => {
  it('demo when empty key or forced; live when nonempty', () => {
    fc.assert(
      fc.property(fc.string(), fc.boolean(), (key, forceDemo) => {
        const mode = resolveRuntimeMode({ key, forceDemo })
        if (forceDemo || !key.trim()) expect(mode).toBe('demo')
        else expect(mode).toBe('live')
      }),
      { numRuns: 60 },
    )
  })
})

describe('P8 sample licenses', () => {
  it('all samples are public-domain/cc0 with attribution', () => {
    expect(allSamplesLicensed()).toBe(true)
  })
})

describe('P9 key store isolation', () => {
  it('clear removes key', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (key) => {
        setKey(key)
        expect(getKey()).toBe(key.trim() || null)
        clearKey()
        expect(getKey()).toBe(null)
      }),
      { numRuns: 40 },
    )
  })
})

function viFetchSpy() {
  const original = globalThis.fetch
  let calls = 0
  globalThis.fetch = (async () => {
    calls += 1
    throw new Error('fetch should not be called in demo')
  }) as typeof fetch
  return {
    get calls() {
      return calls
    },
    restore() {
      globalThis.fetch = original
    },
  }
}
