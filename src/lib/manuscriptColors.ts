/** Parchment leaf color tokens — keep in sync with src/styles/app.css */

export const PARCHMENT_BASE = '#ecd7a6'
export const IRON_GALL_INK = '#2b1a10'
export const RUBRIC_RED = '#8b1a1a'
export const LANG_CAPTION = '#5c3b24'

/** Relative luminance (sRGB), WCAG 2.x */
export function relativeLuminance(hex: string): number {
  const h = hex.replace('#', '')
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h
  const r = parseInt(full.slice(0, 2), 16) / 255
  const g = parseInt(full.slice(2, 4), 16) / 255
  const b = parseInt(full.slice(4, 6), 16) / 255
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const R = lin(r)
  const G = lin(g)
  const B = lin(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/** WCAG contrast ratio between two hex colors */
export function contrastRatio(foreground: string, background: string): number {
  const L1 = relativeLuminance(foreground)
  const L2 = relativeLuminance(background)
  const lighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)
  return (lighter + 0.05) / (darker + 0.05)
}
