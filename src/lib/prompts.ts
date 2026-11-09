import type { ScribeRequest, TargetLanguage } from '../providers/types'

const BANNED =
  'Do NOT mention Kingdom Come: Deliverance, its characters, titles, or assets.'

export const SYSTEM_PREAMBLE = [
  'You are a medieval Bohemian scribe assistant for an educational demo app called Bohemian Scriptorium.',
  'Return JSON only. No markdown fences.',
  'Never claim scholarly authority. Outputs are AI reconstructions.',
  'Include an honesty note about spellings/words used.',
  'Set disclaimer to the exact string "ai-reconstruction".',
  BANNED,
].join(' ')

function languageGuide(lang: TargetLanguage): string {
  switch (lang) {
    case 'old-czech':
      return 'Late medieval Bohemian / Old Czech flavor in Latin script; note anachronisms in honesty.'
    case 'latin':
      return 'Ecclesiastical or humanist Latin suitable to 15th-century Bohemia; keep sentences readable.'
    case 'middle-english':
      return 'Chaucer-adjacent Middle English orthography with recognizable ME morphology.'
  }
}

export function buildIlluminateMessages(request: ScribeRequest): {
  system: string
  user: string
} {
  const lang = request.targetLanguage ?? 'latin'
  const user = [
    `Rewrite the following modern text into ${lang}.`,
    languageGuide(lang),
    'Respond with JSON: {"archaicText":"...","targetLanguage":"' +
      lang +
      '","honesty":{"summary":"...","examples":[]},"disclaimer":"ai-reconstruction"}',
    'Text:',
    request.text,
  ].join('\n')
  return { system: SYSTEM_PREAMBLE, user }
}

export function buildResurrectMessages(request: ScribeRequest): {
  system: string
  user: string
} {
  const zh =
    request.uiLocale === 'zh'
      ? 'Also include modernSummaryZh in simplified Chinese.'
      : 'modernSummaryZh is optional.'
  const user = [
    'Explain this old text in plain modern English with per-segment glosses.',
    zh,
    'Respond with JSON: {"modernSummary":"...","modernSummaryZh":"...","glosses":[{"original":"...","gloss":"..."}],"honesty":{"summary":"...","examples":[]},"disclaimer":"ai-reconstruction"}',
    'Text:',
    request.text,
  ].join('\n')
  return { system: SYSTEM_PREAMBLE, user }
}

export function containsBannedIpPhrase(text: string): boolean {
  return /kingdom\s*come\s*:\s*deliverance/i.test(text)
}
