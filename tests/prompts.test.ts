import { describe, expect, it } from 'vitest'
import {
  SYSTEM_PREAMBLE,
  buildIlluminateMessages,
  containsBannedIpPhrase,
} from '../src/lib/prompts'

describe('prompts', () => {
  it('includes banned IP reminder and JSON schema hint', () => {
    expect(containsBannedIpPhrase(SYSTEM_PREAMBLE)).toBe(true)
    const { user } = buildIlluminateMessages({
      mode: 'illuminate',
      text: 'Hello',
      targetLanguage: 'latin',
    })
    expect(user).toContain('ai-reconstruction')
    expect(user).toContain('Hello')
  })
})
