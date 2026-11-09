import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useFinePointer.js'

// Nudges its child toward the cursor. Falls back to a plain wrapper on touch devices and for reduced motion.
export default function Magnetic({ strength = 0.3, children }) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 220, damping: 16, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  if (!fine || reduce) return <span className="inline-block">{children}</span>

  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span className="inline-block" style={{ x: sx, y: sy }} onPointerMove={onPointerMove} onPointerLeave={reset}>
      {children}
    </m.span>
  )
}
