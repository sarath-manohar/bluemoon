import { useEffect } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useFinePointer.js'

// Two soft glows follow the cursor: a blue one that shows on light sections (multiply) and a yellow one that
// shows on dark sections (screen). Desktop only; skipped for touch and reduced motion.
export default function CursorGlow() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const spring = { stiffness: 110, damping: 22, mass: 0.7 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useEffect(() => {
    if (!fine || reduce) return
    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null

  const glow = 'pointer-events-none fixed left-0 top-0 z-[60] size-[30rem] -ml-[15rem] -mt-[15rem] rounded-full'
  return (
    <>
      <m.div aria-hidden="true" className={glow} style={{ x: sx, y: sy, mixBlendMode: 'multiply', background: 'radial-gradient(circle, rgb(30 79 191 / 0.2), transparent 65%)' }} />
      <m.div aria-hidden="true" className={glow} style={{ x: sx, y: sy, mixBlendMode: 'screen', background: 'radial-gradient(circle, rgb(255 210 31 / 0.2), transparent 65%)' }} />
    </>
  )
}
