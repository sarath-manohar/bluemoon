import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

// 3D tilt toward the mouse plus --mx/--my CSS variables that position the `.shine` highlight.
export function useTilt(max = 7) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 220, damping: 20, mass: 0.5 }
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), spring)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), spring)

  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    x.set(px - 0.5)
    y.set(py - 0.5)
    event.currentTarget.style.setProperty('--mx', `${px * 100}%`)
    event.currentTarget.style.setProperty('--my', `${py * 100}%`)
  }
  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { style: { rotateX, rotateY, transformPerspective: 900 }, onPointerMove, onPointerLeave }
}
