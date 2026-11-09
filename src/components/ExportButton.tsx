import { type RefObject, useState } from 'react'
import { toPng } from 'html-to-image'

interface Props {
  targetRef: RefObject<HTMLElement | null>
}

export function ExportButton({ targetRef }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  return (
    <div>
      <button
        type="button"
        disabled={busy}
        aria-label="Export PNG"
        onClick={async () => {
          if (!targetRef.current) return
          setBusy(true)
          setError(null)
          try {
            const dataUrl = await toPng(targetRef.current, {
              cacheBust: true,
              pixelRatio: 2,
            })
            const a = document.createElement('a')
            a.href = dataUrl
            a.download = 'bohemian-scriptorium-manuscript.png'
            a.click()
          } catch {
            setError('PNG export failed. Try another browser.')
          } finally {
            setBusy(false)
          }
        }}
      >
        {busy ? 'Exporting…' : 'Export PNG'}
      </button>
      {error ? <p className="error">{error}</p> : null}
    </div>
  )
}
