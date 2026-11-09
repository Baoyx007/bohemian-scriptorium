import { getKey } from '../lib/keyStore'
import { DemoProvider } from './demo'
import type { LlmProvider, RuntimeMode } from './types'
import { XaiBrowserProvider } from './xaiBrowser'

export function resolveRuntimeMode(options?: {
  forceDemo?: boolean
  key?: string | null
}): RuntimeMode {
  if (options?.forceDemo) return 'demo'
  const key = options?.key === undefined ? getKey() : options.key
  if (!key || key.trim().length === 0) return 'demo'
  return 'live'
}

export function createProvider(options?: {
  forceDemo?: boolean
  key?: string | null
  fetchImpl?: typeof fetch
}): LlmProvider {
  const mode = resolveRuntimeMode(options)
  if (mode === 'demo') return new DemoProvider()
  const key = (options?.key === undefined ? getKey() : options.key) ?? ''
  return new XaiBrowserProvider(
    key,
    undefined,
    undefined,
    options?.fetchImpl ?? fetch.bind(globalThis),
  )
}
