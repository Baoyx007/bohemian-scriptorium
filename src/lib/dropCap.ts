/** Split first extended grapheme cluster from the rest of the string. */
export function splitDropCap(text: string): { first: string; rest: string } {
  if (!text) return { first: '', rest: '' }
  const segmenter =
    typeof Intl !== 'undefined' && 'Segmenter' in Intl
      ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
      : null
  if (segmenter) {
    const iter = segmenter.segment(text)[Symbol.iterator]()
    const firstSeg = iter.next()
    if (firstSeg.done) return { first: '', rest: '' }
    const first = firstSeg.value.segment
    return { first, rest: text.slice(first.length) }
  }
  // Fallback: code-point aware
  const cp = Array.from(text)
  if (cp.length === 0) return { first: '', rest: '' }
  return { first: cp[0]!, rest: cp.slice(1).join('') }
}
