import { m } from 'framer-motion'
import { ease, fadeUp, stagger, viewportOnce } from '../lib/motion.js'

// Scroll-triggered fade-up for a single block.
export function Reveal({ delay = 0, children, ...props }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease, delay }}
      {...props}
    >
      {children}
    </m.div>
  )
}

// Staggered group: wrap items in <StaggerItem> and they cascade in when the group scrolls into view.
export function Stagger({ as = 'div', gap = 0.08, delay = 0, children, ...props }) {
  const Tag = m[as]
  return (
    <Tag initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger(gap, delay)} {...props}>
      {children}
    </Tag>
  )
}

export function StaggerItem({ as = 'div', children, ...props }) {
  const Tag = m[as]
  return (
    <Tag variants={fadeUp} {...props}>
      {children}
    </Tag>
  )
}
