import {
  buildIlluminateMessages,
  buildResurrectMessages,
} from '../lib/prompts'
import {
  guardIlluminateResult,
  guardResurrectResult,
} from '../lib/validate'
import type { LlmProvider, ScribeRequest, ScribeResult } from './types'

const DEFAULT_ENDPOINT = 'https://api.x.ai/v1/chat/completions'
const DEFAULT_MODEL = 'grok-4-fast'

export class ScribeHttpError extends Error {
  code: 'cors' | 'provider' | 'parse' | 'no-key'
  constructor(code: 'cors' | 'provider' | 'parse' | 'no-key', message: string) {
    super(message)
    this.code = code
    this.name = 'ScribeHttpError'
  }
}

function stripFences(text: string): string {
  const trimmed = text.trim()
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i)
  return fenced ? fenced[1]!.trim() : trimmed
}

export class XaiBrowserProvider implements LlmProvider {
  readonly name = 'xai-browser' as const
  private readonly apiKey: string
  private readonly endpoint: string
  private readonly model: string
  private readonly fetchImpl: typeof fetch

  constructor(
    apiKey: string,
    endpoint: string = DEFAULT_ENDPOINT,
    model: string = DEFAULT_MODEL,
    fetchImpl: typeof fetch = fetch.bind(globalThis),
  ) {
    this.apiKey = apiKey
    this.endpoint = endpoint
    this.model = model
    this.fetchImpl = fetchImpl
  }

  async complete(request: ScribeRequest): Promise<ScribeResult> {
    if (!this.apiKey.trim()) {
      throw new ScribeHttpError('no-key', 'No xAI API key in Settings.')
    }
    const messages =
      request.mode === 'illuminate'
        ? buildIlluminateMessages(request)
        : buildResurrectMessages(request)

    let response: Response
    try {
      response = await this.fetchImpl(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: messages.system },
            { role: 'user', content: messages.user },
          ],
          temperature: 0.7,
        }),
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      const corsLikely =
        /failed to fetch|networkerror|cors|blocked/i.test(msg) ||
        msg.length === 0
      throw new ScribeHttpError(
        corsLikely ? 'cors' : 'provider',
        corsLikely
          ? 'Browser could not reach api.x.ai (possible CORS or network block). Switch to Demo Mode.'
          : `Network error calling xAI: ${msg}`,
      )
    }

    if (!response.ok) {
      throw new ScribeHttpError(
        'provider',
        `xAI returned HTTP ${response.status}. Check your key or try Demo Mode.`,
      )
    }

    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      throw new ScribeHttpError('parse', 'xAI response was not JSON.')
    }

    const content = extractContent(payload)
    let parsed: unknown
    try {
      parsed = JSON.parse(stripFences(content))
    } catch {
      throw new ScribeHttpError(
        'parse',
        'Model returned non-JSON content. Try again or use Demo Mode.',
      )
    }

    if (request.mode === 'illuminate') {
      return guardIlluminateResult(
        parsed,
        request.targetLanguage ?? 'latin',
        'live',
      )
    }
    return guardResurrectResult(parsed, 'live')
  }
}

function extractContent(payload: unknown): string {
  if (!payload || typeof payload !== 'object') {
    throw new ScribeHttpError('parse', 'Empty xAI payload.')
  }
  const choices = (payload as { choices?: unknown }).choices
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new ScribeHttpError('parse', 'xAI payload missing choices.')
  }
  const message = (choices[0] as { message?: { content?: unknown } }).message
  const content = message?.content
  if (typeof content !== 'string' || !content.trim()) {
    throw new ScribeHttpError('parse', 'xAI message content missing.')
  }
  return content
}
