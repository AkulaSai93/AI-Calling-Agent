// Adya logo mark: a butterfly whose body is a microphone (filled vector).
// `animated` makes the wings flap gently (used in the hero tile).
// Gradient / mask ids are static: every instance defines them identically, so duplicates are harmless.
export default function AdyaMark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  const flap = animated ? "animate-flap origin-center [transform-box:view-box]" : undefined;
  const upper = "M22 20.5C18.6 11.2 9.6 5.4 5 8.6 1.4 11.2 4.3 19.4 11.6 22.6c3.9 1.7 7.9 1.6 10.4.6z";
  const lower = "M22 26.2c-4.6-1.1-11.3.3-12.6 5.5-1.1 4.4 3.2 7.3 7.3 4.6 2.6-1.7 4.2-4.6 5.3-7.6z";

  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <defs>
        <linearGradient id="vm-upper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dfe3ff" />
          <stop offset="1" stopColor="#8898e7" />
        </linearGradient>
        <linearGradient id="vm-lower" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8898e7" />
          <stop offset="1" stopColor="#4f60cf" />
        </linearGradient>
        {/* Cut a thin gap around the mic so the wings read as separate shapes */}
        <mask id="vm-gap" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
          <rect width="48" height="48" fill="#fff" />
          <rect x="19.6" y="10.6" width="8.8" height="22.8" rx="4.4" fill="#000" />
        </mask>
      </defs>

      {/* Wings (mirrored pairs) */}
      <g mask="url(#vm-gap)">
        <g className={flap}>
          <path d={upper} fill="url(#vm-upper)" />
          <path d={upper} fill="url(#vm-upper)" transform="matrix(-1 0 0 1 48 0)" />
          <path d={lower} fill="url(#vm-lower)" />
          <path d={lower} fill="url(#vm-lower)" transform="matrix(-1 0 0 1 48 0)" />
        </g>
      </g>

      {/* Antennae */}
      <path d="M22.6 12.4C21.8 9 20.2 6.9 18 5.8M25.4 12.4c.8-3.4 2.4-5.5 4.6-6.6" fill="none" stroke="#c3cbff" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="17.6" cy="5.6" r="1.3" fill="#c3cbff" />
      <circle cx="30.4" cy="5.6" r="1.3" fill="#c3cbff" />

      {/* Mic body + grille + stand */}
      <rect x="21" y="12" width="6" height="20" rx="3" fill="#ffffff" />
      <path d="M22.8 17.5h2.4M22.8 20.5h2.4M22.8 23.5h2.4" stroke="#5b6bd6" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M24 33.6v5.2" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="20.2" y="38.6" width="7.6" height="1.9" rx="0.95" fill="#ffffff" />
    </svg>
  );
}
