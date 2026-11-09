import { describe, expect, it } from 'vitest'
import {
  IRON_GALL_INK,
  LANG_CAPTION,
  PARCHMENT_BASE,
  RUBRIC_RED,
  contrastRatio,
} from '../src/lib/manuscriptColors'

describe('manuscript leaf WCAG contrast', () => {
  it('body iron-gall ink vs parchment is >= 4.5', () => {
    const ratio = contrastRatio(IRON_GALL_INK, PARCHMENT_BASE)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('rubric red vs parchment is >= 4.5', () => {
    const ratio = contrastRatio(RUBRIC_RED, PARCHMENT_BASE)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('language caption brown vs parchment is >= 4.5', () => {
    const ratio = contrastRatio(LANG_CAPTION, PARCHMENT_BASE)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })
})
