import { describe, expect, it, vi } from 'vitest'
import { XaiBrowserProvider, ScribeHttpError } from '../src/providers/xaiBrowser'

describe('XaiBrowserProvider', () => {
  it('parses a successful illuminate JSON response', async () => {
    const fetchImpl = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  archaicText: 'Salve mundus',
                  targetLanguage: 'latin',
                  honesty: { summary: 'demo test' },
                  disclaimer: 'ai-reconstruction',
                }),
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const provider = new XaiBrowserProvider('test-key', undefined, undefined, fetchImpl as unknown as typeof fetch)
    const result = await provider.complete({
      mode: 'illuminate',
      text: 'Hello world',
      targetLanguage: 'latin',
    })
    expect(result.mode).toBe('illuminate')
    if (result.mode === 'illuminate') {
      expect(result.archaicText).toBe('Salve mundus')
      expect(result.source).toBe('live')
      expect(result.disclaimer).toBe('ai-reconstruction')
    }
    expect(fetchImpl).toHaveBeenCalledOnce()
  })

  it('maps failed fetch to cors error', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    const provider = new XaiBrowserProvider('test-key', undefined, undefined, fetchImpl as unknown as typeof fetch)
    await expect(
      provider.complete({
        mode: 'illuminate',
        text: 'Hello',
        targetLanguage: 'latin',
      }),
    ).rejects.toMatchObject({ code: 'cors' } satisfies Partial<ScribeHttpError>)
  })

  it('maps HTTP errors to provider code', async () => {
    const fetchImpl = vi.fn(
      async () => new Response('nope', { status: 401 }),
    )
    const provider = new XaiBrowserProvider('test-key', undefined, undefined, fetchImpl as unknown as typeof fetch)
    await expect(
      provider.complete({
        mode: 'resurrect',
        text: 'Ave Maria',
      }),
    ).rejects.toMatchObject({ code: 'provider' })
  })
})
