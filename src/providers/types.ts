export type Mode = 'illuminate' | 'resurrect'
export type TargetLanguage = 'old-czech' | 'latin' | 'middle-english'
export type RuntimeMode = 'demo' | 'live'

export const TARGET_LANGUAGES: TargetLanguage[] = [
  'old-czech',
  'latin',
  'middle-english',
]

export const ILLUMINATE_LIMIT = 2000
export const RESURRECT_LIMIT = 4000

export interface ScribeRequest {
  mode: Mode
  text: string
  targetLanguage?: TargetLanguage
  uiLocale?: 'en' | 'zh'
}

export interface HonestyNote {
  summary: string
  examples?: string[]
}

export interface IlluminateResult {
  mode: 'illuminate'
  archaicText: string
  targetLanguage: TargetLanguage
  honesty: HonestyNote
  disclaimer: 'ai-reconstruction'
  source: 'demo' | 'live'
}

export interface GlossLine {
  original: string
  gloss: string
}

export interface ResurrectResult {
  mode: 'resurrect'
  modernSummary: string
  modernSummaryZh?: string
  glosses: GlossLine[]
  honesty: HonestyNote
  disclaimer: 'ai-reconstruction'
  attribution?: string
  source: 'demo' | 'live'
  demoNotice?: string
}

export type ScribeResult = IlluminateResult | ResurrectResult

export type ScribeErrorCode =
  | 'validation'
  | 'cors'
  | 'provider'
  | 'parse'
  | 'no-key'

export interface ScribeErrorBody {
  error: string
  code: ScribeErrorCode
}

export interface LlmProvider {
  readonly name: 'demo' | 'xai-browser'
  complete(request: ScribeRequest): Promise<ScribeResult>
}

export function isTargetLanguage(value: unknown): value is TargetLanguage {
  return (
    value === 'old-czech' || value === 'latin' || value === 'middle-english'
  )
}
