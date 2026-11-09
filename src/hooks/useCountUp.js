import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

// Returns a ref to attach to the counter element and a rounded motion value to render inside it.
export function useCountUp(to, { from = 0, duration = 1.8 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const value = useMotionValue(reduce ? to : from)
  const rounded = useTransform(value, (v) => Math.round(v))

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      value.set(to)
      return
    }
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, reduce, to, duration, value])

  return { ref, rounded }
}
