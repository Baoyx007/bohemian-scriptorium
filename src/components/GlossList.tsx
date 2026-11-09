import type { ResurrectResult } from '../providers/types'

interface Props {
  result: ResurrectResult
}

export function GlossList({ result }: Props) {
  return (
    <section className="result result-resurrect" aria-label="Resurrect result">
      {result.demoNotice ? <p className="notice">{result.demoNotice}</p> : null}
      <h3 className="rubric">Modern summary</h3>
      <p className="readable">{result.modernSummary}</p>
      {result.modernSummaryZh ? (
        <>
          <h3 className="rubric">中文摘要</h3>
          <p className="readable">{result.modernSummaryZh}</p>
        </>
      ) : null}
      <h3 className="rubric">Glosses</h3>
      <ul className="glosses">
        {result.glosses.map((g, i) => (
          <li key={`${i}-${g.original.slice(0, 12)}`}>
            <blockquote className="gloss-original">{g.original}</blockquote>
            <p className="gloss-meaning">{g.gloss}</p>
          </li>
        ))}
      </ul>
      {result.attribution ? (
        <p className="muted">Source text: {result.attribution}</p>
      ) : null}
      <p className="disclaimer">
        AI reconstruction, not a scholarly translation.
      </p>
      <p className="honesty">
        <strong>Honesty:</strong> {result.honesty.summary}
      </p>
      <p className="muted">Source: {result.source}</p>
    </section>
  )
}
