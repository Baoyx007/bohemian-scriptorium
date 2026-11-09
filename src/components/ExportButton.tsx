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
          const remember = (el: HTMLElement) => {
            restored.push({ el, css: el.style.cssText })
          }
          const forceColor = (el: HTMLElement | null, color: string) => {
            if (!el) return
            remember(el)
            el.style.setProperty('color', color, 'important')
          }

          try {
            const rect = root.getBoundingClientRect()
            const width = Math.ceil(rect.width)
            const height = Math.ceil(rect.height)

            forceColor(root, IRON_GALL_INK)
            root.querySelectorAll<HTMLElement>('.border, .body').forEach((el) => {
              forceColor(el, IRON_GALL_INK)
            })
            root.querySelectorAll<HTMLElement>('.rubric-line, .colophon').forEach((el) => {
              forceColor(el, RUBRIC_RED)
            })
            root.querySelectorAll<HTMLElement>('.lang-tag').forEach((el) => {
              forceColor(el, LANG_CAPTION)
            })
            root.querySelectorAll<HTMLElement>('.candle-vignette').forEach((el) => {
              remember(el)
              el.style.display = 'none'
            })

            // Stabilize layout for capture (page offset / margin / transform).
            remember(root)
            root.style.setProperty('margin', '0', 'important')
            root.style.setProperty('transform', 'none', 'important')
            root.style.setProperty('left', '0', 'important')
            root.style.setProperty('top', '0', 'important')
            root.style.setProperty('right', 'auto', 'important')
            root.style.setProperty('position', 'relative', 'important')
            root.style.setProperty('width', `${width}px`, 'important')
            root.style.setProperty('height', `${height}px`, 'important')
            root.style.setProperty('max-width', 'none', 'important')

            const dataUrl = await toPng(root, {
              cacheBust: true,
              pixelRatio: 2,
              width,
              height,
              canvasWidth: width * 2,
              canvasHeight: height * 2,
              backgroundColor: '#ecd7a6',
              style: {
                margin: '0',
                transform: 'none',
                left: '0',
                top: '0',
                position: 'relative',
                width: `${width}px`,
                height: `${height}px`,
                maxWidth: 'none',
              },
              filter: (node) => {
                if (!(node instanceof HTMLElement)) return true
                return !node.classList.contains('candle-vignette')
              },
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
