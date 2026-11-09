import { demoIlluminate, demoResurrect } from '../lib/demoFixtures'
import type { LlmProvider, ScribeRequest, ScribeResult } from './types'

export class DemoProvider implements LlmProvider {
  readonly name = 'demo' as const

  async complete(request: ScribeRequest): Promise<ScribeResult> {
    if (request.mode === 'illuminate') {
      const lang = request.targetLanguage ?? 'latin'
      return demoIlluminate(lang, request.text)
    }
    return demoResurrect(request.text)
  }
}
