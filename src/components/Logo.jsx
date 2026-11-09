import { useId } from 'react'
import { logoUrl } from '../lib/assets.js'
import { branding } from '../config/branding.js'

// Uses src/assets/logo/logo.* when present; otherwise draws the built-in moon mark with the short name.
export function LogoMark({ shortName, className = 'size-10' }) {
  const maskId = useId()
  if (logoUrl) {
    return <img src={logoUrl} alt="" className={`shrink-0 rounded-xl object-contain ${className}`} />
  }
  return (
    <span className={`relative grid shrink-0 place-items-center rounded-xl bg-linear-to-br from-royal-400 to-royal-700 text-white shadow-soft ${className}`}>
      <svg viewBox="0 0 24 24" className="absolute -left-1 -top-1 size-[55%]" aria-hidden="true">
        <defs>
          <mask id={maskId}>
            <rect width="24" height="24" fill="#fff" />
            <circle cx="15" cy="9" r="8" fill="#000" />
          </mask>
        </defs>
        <circle cx="10" cy="12" r="9" fill="#FFD21F" mask={`url(#${maskId})`} />
      </svg>
      <span className="relative mt-0.5 font-display text-[0.95em] font-bold leading-none tracking-tight">{shortName}</span>
    </span>
  )
}

export default function Logo({ brand, light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark shortName={brand.shortName} />
      {branding.showNameNextToLogo ? (
        <span className={`font-display text-lg font-semibold leading-tight sm:text-xl ${light ? 'text-white' : 'text-royal-900'}`}>
          {brand.name}
        </span>
      ) : (
        <span className="sr-only">{brand.name}</span>
      )}
    </span>
  )
}
