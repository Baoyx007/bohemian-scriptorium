import { useRef } from 'react'
import { splitDropCap } from '../lib/dropCap'
import type { IlluminateResult } from '../providers/types'
import { ExportButton } from './ExportButton'
import {
  GolemMark,
  SkullMarginalia,
  VineBorderFrame,
  WaxSeal,
} from './ManuscriptOrnaments'

interface Props {
  result: IlluminateResult
  candle: boolean
  ossuary: boolean
  golem: boolean
}

export function ManuscriptPage({ result, candle, ossuary, golem }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { first, rest } = splitDropCap(result.archaicText)
  const classes = [
    'manuscript',
    'candle',
    candle ? 'candle-strong' : '',
    ossuary ? 'ossuary' : '',
    golem ? 'golem' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="result result-illuminate" aria-label="Manuscript result">
      <h3 className="rubric">Illuminated leaf</h3>
      <article ref={ref} className={classes}>
        <div className="candle-vignette" aria-hidden="true" />
        <VineBorderFrame />
        <div className="border">
          {ossuary ? <SkullMarginalia /> : null}
          {golem ? <GolemMark /> : null}
          <p className="rubric-line">Scriptum in Bohemia · AI reconstruction</p>
          <p className="body">
            <span className="drop" aria-hidden={first ? undefined : true}>
              <span className="drop-gold">{first}</span>
            </span>
            {rest}
          </p>
          <p className="lang-tag">{labelFor(result.targetLanguage)}</p>
          <div className="colophon" aria-hidden="true">
            <span className="colophon-ornament">❧</span>
            <p>Scriptum Pragae, anno Domini MMXXVI</p>
            <span className="colophon-ornament">❧</span>
          </div>
          <WaxSeal />
        </div>
      </article>
      <p className="disclaimer">
        AI reconstruction, not a scholarly translation.
      </p>
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
      return 'Old Czech · demo/live reconstruction'
    case 'latin':
      return 'Latin'
    case 'middle-english':
      return 'Middle English'
  }
}
