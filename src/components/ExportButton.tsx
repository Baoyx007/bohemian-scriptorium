import { type RefObject, useState } from 'react'
import { toPng } from 'html-to-image'
import { IRON_GALL_INK, LANG_CAPTION, RUBRIC_RED } from '../lib/manuscriptColors'

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
          const root = targetRef.current
          if (!root) return
          setBusy(true)
          setError(null)

          const restored: Array<{ el: HTMLElement; css: string }> = []
          const force = (el: HTMLElement | null, color: string) => {
            if (!el) return
            restored.push({ el, css: el.style.cssText })
            el.style.setProperty('color', color, 'important')
          }

          try {
            // html-to-image can miss stylesheet cascade; pin ink colors inline.
            force(root, IRON_GALL_INK)
            root.querySelectorAll<HTMLElement>('.border, .body').forEach((el) => {
              force(el, IRON_GALL_INK)
            })
            root.querySelectorAll<HTMLElement>('.rubric-line').forEach((el) => {
              force(el, RUBRIC_RED)
            })
            root.querySelectorAll<HTMLElement>('.lang-tag').forEach((el) => {
              force(el, LANG_CAPTION)
            })
            root.querySelectorAll<HTMLElement>('.candle-vignette').forEach((el) => {
              restored.push({ el, css: el.style.cssText })
              el.style.display = 'none'
            })

            const dataUrl = await toPng(root, {
              cacheBust: true,
              pixelRatio: 2,
              backgroundColor: '#ecd7a6',
            })
            const a = document.createElement('a')
            a.href = dataUrl
            a.download = 'bohemian-scriptorium-manuscript.png'
            a.click()
          } catch {
            setError('PNG export failed. Try another browser.')
          } finally {
            for (const { el, css } of restored) {
              el.style.cssText = css
            }
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
