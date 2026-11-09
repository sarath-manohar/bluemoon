export const ease = [0.22, 1, 0.36, 1]

// Parent/child pair for staggered entrances: the parent sets `initial="hidden" whileInView="show"`.
export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export const viewportOnce = { once: true, margin: '-60px' }
