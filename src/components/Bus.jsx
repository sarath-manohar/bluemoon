import { m } from 'framer-motion'

// Illustrated coach. `wheelRotate` is a motion value so the wheels can turn as the page scrolls.
export default function Bus({ label, wheelRotate, className = '' }) {
  const wheel = (cx) => (
    <m.g style={{ rotate: wheelRotate }}>
      <circle cx={cx} cy="84" r="15" fill="#14161c" />
      <circle cx={cx} cy="84" r="8.5" fill="#dce8ff" />
      <path d={`M${cx} 76v16M${cx - 8} 84h16`} stroke="#5e88ee" strokeWidth="2.5" strokeLinecap="round" />
    </m.g>
  )
  return (
    <svg viewBox="0 0 250 108" className={className} aria-hidden="true">
      <ellipse cx="125" cy="102" rx="108" ry="5" fill="#000" opacity=".25" />
      <rect x="8" y="14" width="228" height="76" rx="18" fill="#1e4fbf" />
      <path d="M8 62h228v10a18 18 0 0 1-18 18H26A18 18 0 0 1 8 72z" fill="#ffd21f" />
      <rect x="26" y="4" width="70" height="12" rx="6" fill="#dce8ff" />
      {[28, 70, 112, 154].map((x) => (
        <rect key={x} x={x} y="24" width="34" height="26" rx="7" fill="#bfd3ff" />
      ))}
      <path d="M196 24h22a10 10 0 0 1 10 10v16h-32z" fill="#bfd3ff" />
      <rect x="28" y="24" width="160" height="5" rx="2.5" fill="#fff" opacity=".35" />
      <rect x="236" y="68" width="8" height="14" rx="4" fill="#ffee8f" />
      <circle cx="240" cy="75" r="14" fill="#ffd21f" opacity=".25" />
      <rect x="196" y="54" width="22" height="28" rx="3" fill="#153783" opacity=".55" />
      <text x="112" y="80" textAnchor="middle" fontFamily="'Fredoka Variable', Arial, sans-serif" fontWeight="700" fontSize="17" fill="#0b1f4d">
        {label}
      </text>
      {wheel(58)}
      {wheel(176)}
    </svg>
  )
}
