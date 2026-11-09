import { useState } from 'react'
import { clearKey, getKey, setKey } from '../lib/keyStore'

interface Props {
  open: boolean
  forceDemo: boolean
  onForceDemoChange: (value: boolean) => void
  onClose: () => void
  onKeyChange: () => void
}

export function SettingsPanel({
  open,
  forceDemo,
  onForceDemoChange,
  onClose,
  onKeyChange,
}: Props) {
  const [draft, setDraft] = useState(() => getKey() ?? '')
  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2>Settings</h2>
          <button type="button" className="ghost" onClick={onClose} aria-label="Close settings">
            ✕
          </button>
        </header>
        <p className="notice">
          Your xAI API key is stored only in this browser&apos;s{' '}
          <code>localStorage</code>. It is sent only to{' '}
          <code>https://api.x.ai</code>. This static site has no server that
          receives your key. Clear it anytime.
        </p>
        <label className="field">
          <span>xAI API key (optional, bring-your-own)</span>
          <input
            type="password"
            autoComplete="off"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="xai-..."
            aria-label="xAI API key"
          />
        </label>
        <div className="row">
          <button
            type="button"
            onClick={() => {
              setKey(draft)
              onKeyChange()
            }}
          >
            Save key
          </button>
          <button
            type="button"
            className="danger"
            onClick={() => {
              clearKey()
              setDraft('')
              onKeyChange()
            }}
            aria-label="Clear key"
          >
            Clear key
          </button>
        </div>
        <label className="check">
          <input
            type="checkbox"
            checked={forceDemo}
            onChange={(e) => onForceDemoChange(e.target.checked)}
          />
          Force Demo Mode (ignore saved key)
        </label>
        <p className="muted">
          Live Mode may fail if the browser cannot call api.x.ai (CORS). Demo
          Mode always works offline with precomputed samples.
        </p>
      </div>
    </div>
  )
}
