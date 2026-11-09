import type { Mode } from '../providers/types'

interface Props {
  mode: Mode
  onChange: (mode: Mode) => void
}

export function ModeTabs({ mode, onChange }: Props) {
  return (
    <div className="tabs" role="tablist" aria-label="Scriptorium mode">
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'illuminate'}
        className={mode === 'illuminate' ? 'active' : ''}
        onClick={() => onChange('illuminate')}
      >
        Illuminate
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'resurrect'}
        className={mode === 'resurrect' ? 'active' : ''}
        onClick={() => onChange('resurrect')}
      >
        Resurrect
      </button>
    </div>
  )
}
