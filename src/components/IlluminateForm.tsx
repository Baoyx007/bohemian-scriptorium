import { ILLUMINATE_DEMOS } from '../lib/demoFixtures'
import { ILLUMINATE_LIMIT, type TargetLanguage } from '../providers/types'

interface Props {
  text: string
  targetLanguage: TargetLanguage
  busy: boolean
  error: string | null
  onTextChange: (value: string) => void
  onLanguageChange: (value: TargetLanguage) => void
  onPickDemo: (id: string) => void
  onSubmit: () => void
}

export function IlluminateForm({
  text,
  targetLanguage,
  busy,
  error,
  onTextChange,
  onLanguageChange,
  onPickDemo,
  onSubmit,
}: Props) {
  return (
    <section className="panel" aria-label="Illuminate form">
      <label className="field">
        <span>Demo samples (4–6 ready paths)</span>
        <select
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) onPickDemo(e.target.value)
          }}
          aria-label="Illuminate demo sample"
        >
          <option value="" disabled>
            Choose a demo input…
          </option>
          {ILLUMINATE_DEMOS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Modern Chinese or English</span>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          rows={6}
          maxLength={ILLUMINATE_LIMIT + 50}
          placeholder="春天来了，请怀着慈悲… or Kind lord, look kindly…"
          aria-label="Modern text to illuminate"
        />
        <span className="meter">
          {text.length}/{ILLUMINATE_LIMIT}
        </span>
      </label>
      <label className="field">
        <span>Target language</span>
        <select
          value={targetLanguage}
          onChange={(e) => onLanguageChange(e.target.value as TargetLanguage)}
          aria-label="Target archaic language"
        >
          <option value="old-czech">Old Czech</option>
          <option value="latin">Latin</option>
          <option value="middle-english">Middle English</option>
        </select>
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button
        type="button"
        disabled={busy}
        onClick={onSubmit}
        aria-label="Illuminate manuscript"
      >
        {busy ? 'Scribing…' : 'Illuminate manuscript'}
      </button>
    </section>
  )
}
