// Curved section edge. Colour it with a text-* class: the wave is filled with the NEXT section's background
// (placed at the bottom) or, with `top`, the PREVIOUS section's background (placed at the top).
export default function WaveDivider({ top = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 block h-10 w-full sm:h-16 lg:h-20 ${top ? 'top-[-1px] rotate-180' : 'bottom-[-1px]'} ${className}`}
      fill="currentColor"
    >
      <path d="M0,70 Q180,10 360,70 T720,70 T1080,70 T1440,70 L1440,120 L0,120 Z" />
    </svg>
  )
}
