import { SAMPLES } from '../lib/samples'
import { RESURRECT_LIMIT } from '../providers/types'

interface Props {
  text: string
  busy: boolean
  error: string | null
  onTextChange: (value: string) => void
  onPickSample: (id: string) => void
  onSubmit: () => void
}

export function ResurrectForm({
  text,
  busy,
  error,
  onTextChange,
  onPickSample,
  onSubmit,
}: Props) {
  return (
    <section className="panel" aria-label="Resurrect form">
      <label className="field">
        <span>Old text</span>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          rows={6}
          maxLength={RESURRECT_LIMIT + 50}
          placeholder="Paste Latin, Old Czech, or Middle English…"
          aria-label="Old text to resurrect"
        />
        <span className="meter">
          {text.length}/{RESURRECT_LIMIT}
        </span>
      </label>
      <label className="field">
        <span>Public-domain samples</span>
        <select
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) onPickSample(e.target.value)
          }}
          aria-label="Sample picker"
        >
          <option value="" disabled>
            Choose a sample…
          </option>
          {SAMPLES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button type="button" disabled={busy} onClick={onSubmit} aria-label="Resurrect document">
        {busy ? 'Consulting the dead…' : 'Resurrect document'}
      </button>
    </section>
  )
}
