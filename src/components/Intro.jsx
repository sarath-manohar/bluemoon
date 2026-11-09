import { useEffect } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { LogoMark } from './Logo.jsx'
import { ease } from '../lib/motion.js'

const SHOW_MS = 1250

// Short page-load intro. Auto-dismisses after ~1.25s (exit animation brings it under 2s) and can be skipped
// by click, any key, or the Skip button. Not shown at all when reduced motion is requested.
export default function Intro({ brand, skipLabel, onDone }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) {
      onDone()
      return
    }
    const timer = setTimeout(onDone, SHOW_MS)
    window.addEventListener('keydown', onDone)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onDone)
      document.documentElement.style.overflow = ''
    }
  }, [reduce, onDone])

  if (reduce) return null

  return (
    <m.div
      role="presentation"
      onClick={onDone}
      className="on-dark hero-bg fixed inset-0 z-[200] grid cursor-pointer place-items-center text-white"
      exit={{ y: '-100%', transition: { duration: 0.55, ease } }}
    >
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <m.div
          initial={{ scale: 0.3, rotate: -25, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="relative"
        >
          <span className="absolute inset-0 -m-4 animate-pulse rounded-full bg-sun-500/25 blur-xl" />
          <LogoMark shortName={brand.shortName} className="size-24 text-4xl" />
        </m.div>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease }}
          className="font-display text-2xl font-semibold sm:text-3xl"
        >
          {brand.name}
        </m.p>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/20">
          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: SHOW_MS / 1000, ease: 'easeInOut' }}
            className="h-full origin-left rounded-full bg-sun-500"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onDone()
        }}
        className="absolute right-4 top-4 rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
      >
        {skipLabel}
      </button>
    </m.div>
  )
}
