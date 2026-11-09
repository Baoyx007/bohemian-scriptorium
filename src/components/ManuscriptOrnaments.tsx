/** Original SVG ornaments — no third-party manuscript scans. */

export function VineBorderFrame() {
  return (
    <svg
      className="vine-frame"
      viewBox="0 0 400 280"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldInk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a1f1f" />
          <stop offset="45%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#5c3b24" />
        </linearGradient>
      </defs>
      <rect
        x="6"
        y="6"
        width="388"
        height="268"
        fill="none"
        stroke="url(#goldInk)"
        strokeWidth="3"
        rx="4"
      />
      <rect
        x="14"
        y="14"
        width="372"
        height="252"
        fill="none"
        stroke="#7a1f1f"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        rx="2"
      />
      {/* Corner knotwork */}
      <path
        d="M20 40 C28 28, 40 22, 52 20 M20 40 C32 36, 36 28, 40 20"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.5"
      />
      <path
        d="M380 40 C372 28, 360 22, 348 20 M380 40 C368 36, 364 28, 360 20"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.5"
      />
      <path
        d="M20 240 C28 252, 40 258, 52 260 M20 240 C32 244, 36 252, 40 260"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.5"
      />
      <path
        d="M380 240 C372 252, 360 258, 348 260 M380 240 C368 244, 364 252, 360 260"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.5"
      />
      {/* Vine curls along sides */}
      <path
        d="M18 80 q8 20 0 40 q-8 20 0 40 q8 20 0 40"
        fill="none"
        stroke="#5c3b24"
        strokeWidth="1.2"
        opacity="0.85"
      />
      <path
        d="M382 80 q-8 20 0 40 q8 20 0 40 q-8 20 0 40"
        fill="none"
        stroke="#5c3b24"
        strokeWidth="1.2"
        opacity="0.85"
      />
    </svg>
  )
}

export function WaxSeal() {
  return (
    <svg className="wax-seal" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="30" fill="#7a1f1f" />
      <circle cx="36" cy="36" r="24" fill="none" stroke="#c9a227" strokeWidth="2" />
      <text
        x="36"
        y="40"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="14"
        fill="#f3e6c8"
      >
        BS
      </text>
    </svg>
  )
}

export function SkullMarginalia() {
  return (
    <svg className="skull-mark" viewBox="0 0 48 56" aria-hidden="true">
      <title>Faint ossuary skull (original SVG)</title>
      <ellipse cx="24" cy="22" rx="14" ry="16" fill="#d9c7a4" opacity="0.55" />
      <ellipse cx="18" cy="20" rx="3" ry="4" fill="#5c3b24" opacity="0.5" />
      <ellipse cx="30" cy="20" rx="3" ry="4" fill="#5c3b24" opacity="0.5" />
      <path
        d="M20 28 q4 4 8 0"
        fill="none"
        stroke="#5c3b24"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <rect x="18" y="36" width="12" height="10" rx="2" fill="#d9c7a4" opacity="0.45" />
    </svg>
  )
}

export function GolemMark() {
  return (
    <div className="golem-mark" aria-hidden="true">
      <span>אמת</span>
      <small>emet</small>
    </div>
  )
}
