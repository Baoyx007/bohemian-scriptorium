import { useRef } from 'react'
import { splitDropCap } from '../lib/dropCap'
import type { IlluminateResult } from '../providers/types'
import { ExportButton } from './ExportButton'

interface Props {
  result: IlluminateResult
  candle: boolean
  ossuary: boolean
}

export function ManuscriptPage({ result, candle, ossuary }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { first, rest } = splitDropCap(result.archaicText)
  const classes = [
    'manuscript',
    candle ? 'candle' : '',
    ossuary ? 'ossuary' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="result" aria-label="Manuscript result">
      <article ref={ref} className={classes}>
        <div className="border">
          <p className="body">
            <span className="drop" aria-hidden={first ? undefined : true}>
              {first}
            </span>
            {rest}
          </p>
          <p className="lang-tag">{labelFor(result.targetLanguage)}</p>
        </div>
      </article>
      <p className="disclaimer">AI reconstruction, not a scholarly translation.</p>
      <p className="honesty">
        <strong>Honesty:</strong> {result.honesty.summary}
        {result.honesty.examples?.length ? (
          <> ({result.honesty.examples.join(', ')})</>
        ) : null}
      </p>
      <p className="muted">Source: {result.source}</p>
      <ExportButton targetRef={ref} />
    </section>
  )
}

function labelFor(lang: IlluminateResult['targetLanguage']): string {
  switch (lang) {
    case 'old-czech':
      return 'Old Czech (demo/live reconstruction)'
    case 'latin':
      return 'Latin'
    case 'middle-english':
      return 'Middle English'
  }
}
