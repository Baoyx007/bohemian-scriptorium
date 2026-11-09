import {
  ILLUMINATE_LIMIT,
  RESURRECT_LIMIT,
  isTargetLanguage,
  type GlossLine,
  type IlluminateResult,
  type HonestyNote,
  type ResurrectResult,
  type ScribeRequest,
  type ScribeResult,
  type TargetLanguage,
} from '../providers/types'

export interface ValidationOk {
  ok: true
  request: ScribeRequest
}

export interface ValidationErr {
  ok: false
  error: string
}

export type ValidationResult = ValidationOk | ValidationErr

export function validateClientInput(input: {
  mode: 'illuminate' | 'resurrect'
  text: string
  targetLanguage?: string
}): ValidationResult {
  const text = input.text ?? ''
  const limit =
    input.mode === 'illuminate' ? ILLUMINATE_LIMIT : RESURRECT_LIMIT

  if (text.trim().length === 0) {
    return { ok: false, error: 'Please enter some text for the scribe.' }
  }
  if (text.length > limit) {
    return {
      ok: false,
      error: `Text is too long (${text.length}/${limit} characters).`,
    }
  }
  if (input.mode === 'illuminate') {
    if (!isTargetLanguage(input.targetLanguage)) {
      return {
        ok: false,
        error: 'Choose Old Czech, Latin, or Middle English.',
      }
    }
    return {
      ok: true,
      request: {
        mode: 'illuminate',
        text,
        targetLanguage: input.targetLanguage,
      },
    }
  }
  return { ok: true, request: { mode: 'resurrect', text } }
}

export function acceptsInputLength(text: string, limit: number): boolean {
  return text.trim().length > 0 && text.length <= limit
}

export function acceptsTargetLanguage(value: unknown): value is TargetLanguage {
  return isTargetLanguage(value)
}

function asHonesty(value: unknown): HonestyNote | null {
  if (!value || typeof value !== 'object') return null
  const summary = (value as { summary?: unknown }).summary
  if (typeof summary !== 'string' || summary.trim().length === 0) return null
  const examples = (value as { examples?: unknown }).examples
  const note: HonestyNote = { summary: summary.trim() }
  if (Array.isArray(examples)) {
    note.examples = examples.filter(
      (e): e is string => typeof e === 'string' && e.trim().length > 0,
    )
  }
  return note
}

export function guardGlosses(candidates: unknown): GlossLine[] {
  if (!Array.isArray(candidates)) return []
  const out: GlossLine[] = []
  for (const row of candidates) {
    if (!row || typeof row !== 'object') continue
    const original = (row as { original?: unknown }).original
    const gloss = (row as { gloss?: unknown }).gloss
    if (typeof original !== 'string' || typeof gloss !== 'string') continue
    if (original.trim().length === 0 || gloss.trim().length === 0) continue
    out.push({ original: original.trim(), gloss: gloss.trim() })
  }
  return out
}

export function guardIlluminateResult(
  raw: unknown,
  fallbackLanguage: TargetLanguage,
  source: 'demo' | 'live',
): IlluminateResult {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid illuminate payload')
  }
  const archaicText = (raw as { archaicText?: unknown }).archaicText
  if (typeof archaicText !== 'string' || archaicText.trim().length === 0) {
    throw new Error('Illuminate result missing archaicText')
  }
  const langRaw = (raw as { targetLanguage?: unknown }).targetLanguage
  const targetLanguage = isTargetLanguage(langRaw) ? langRaw : fallbackLanguage
  const honesty =
    asHonesty((raw as { honesty?: unknown }).honesty) ?? {
      summary: 'AI reconstruction; spellings may be anachronistic.',
    }
  return {
    mode: 'illuminate',
    archaicText: archaicText.trim(),
    targetLanguage,
    honesty,
    disclaimer: 'ai-reconstruction',
    source,
  }
}

export function guardResurrectResult(
  raw: unknown,
  source: 'demo' | 'live',
): ResurrectResult {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid resurrect payload')
  }
  const modernSummary = (raw as { modernSummary?: unknown }).modernSummary
  if (typeof modernSummary !== 'string' || modernSummary.trim().length === 0) {
    throw new Error('Resurrect result missing modernSummary')
  }
  const honesty =
    asHonesty((raw as { honesty?: unknown }).honesty) ?? {
      summary: 'AI reconstruction; not a scholarly edition.',
    }
  const glosses = guardGlosses((raw as { glosses?: unknown }).glosses)
  const modernSummaryZh = (raw as { modernSummaryZh?: unknown }).modernSummaryZh
  const attribution = (raw as { attribution?: unknown }).attribution
  const demoNotice = (raw as { demoNotice?: unknown }).demoNotice
  const result: ResurrectResult = {
    mode: 'resurrect',
    modernSummary: modernSummary.trim(),
    glosses,
    honesty,
    disclaimer: 'ai-reconstruction',
    source,
  }
  if (typeof modernSummaryZh === 'string' && modernSummaryZh.trim()) {
    result.modernSummaryZh = modernSummaryZh.trim()
  }
  if (typeof attribution === 'string' && attribution.trim()) {
    result.attribution = attribution.trim()
  }
  if (typeof demoNotice === 'string' && demoNotice.trim()) {
    result.demoNotice = demoNotice.trim()
  }
  return result
}

export function assertDisclaimer(result: ScribeResult): boolean {
  return result.disclaimer === 'ai-reconstruction'
}
