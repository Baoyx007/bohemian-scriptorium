import { describe, expect, it } from 'vitest'
import {
  ILLUMINATE_DEMOS,
  RESURRECT_DEMOS,
  demoIlluminate,
  demoResurrect,
  illuminateDemoCount,
  resurrectDemoCount,
} from '../src/lib/demoFixtures'
import { SAMPLES, allSamplesLicensed } from '../src/lib/samples'

describe('demo fixtures catalog', () => {
  it('has at least 4 illuminate and 4 resurrect demos', () => {
    expect(illuminateDemoCount()).toBeGreaterThanOrEqual(4)
    expect(resurrectDemoCount()).toBeGreaterThanOrEqual(4)
    expect(ILLUMINATE_DEMOS.length).toBeGreaterThanOrEqual(6)
    expect(RESURRECT_DEMOS.length).toBeGreaterThanOrEqual(5)
  })

  it('includes Chinese-input paths to Old Czech and Middle English', () => {
    const zhOc = ILLUMINATE_DEMOS.find(
      (d) => d.inputLocale === 'zh' && d.targetLanguage === 'old-czech',
    )
    const zhMe = ILLUMINATE_DEMOS.find(
      (d) => d.inputLocale === 'zh' && d.targetLanguage === 'middle-english',
    )
    expect(zhOc?.input).toMatch(/春天/)
    expect(zhOc?.result.archaicText.length).toBeGreaterThan(10)
    expect(zhMe?.result.archaicText.length).toBeGreaterThan(10)
  })

  it('demoIlluminate matches Chinese + Old Czech fixture', async () => {
    const input = '春天来了，请怀着慈悲照看这座贫苦的小镇，它在冬夜的黑暗里等候春光。'
    const result = demoIlluminate('old-czech', input)
    expect(result.disclaimer).toBe('ai-reconstruction')
    expect(result.source).toBe('demo')
    expect(result.archaicText).toMatch(/Jaro|jaro|milost/i)
  })

  it('demoResurrect matches multiple samples', () => {
    expect(demoResurrect('Ave Maria, gratia plena').modernSummary).toMatch(/Mary/i)
    expect(demoResurrect('Whan that Aprille with his shoures soote').glosses.length).toBeGreaterThan(0)
    expect(demoResurrect('Hospodine, pomiluj ny!').modernSummaryZh).toBeTruthy()
  })

  it('every illuminate/resurrect fixture carries honesty + disclaimer', () => {
    for (const d of ILLUMINATE_DEMOS) {
      expect(d.result.disclaimer).toBe('ai-reconstruction')
      expect(d.result.honesty.summary.length).toBeGreaterThan(8)
    }
    for (const d of RESURRECT_DEMOS) {
      expect(d.result.disclaimer).toBe('ai-reconstruction')
      expect(d.result.glosses.length).toBeGreaterThan(0)
    }
  })

  it('resurrect sample picker corpus stays licensed', () => {
    expect(SAMPLES.length).toBeGreaterThanOrEqual(5)
    expect(allSamplesLicensed()).toBe(true)
  })
})
