import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { m } from 'framer-motion'
import { useModalBehavior } from '../hooks/useModalBehavior.js'

const backdrop = { hidden: { opacity: 0 }, show: { opacity: 1 } }
const sheet = {
  hidden: { opacity: 0, y: 56, scale: 0.97, transition: { duration: 0.2 } },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 28, stiffness: 320 } },
}

// Accessible dialog: bottom sheet on phones, centred card from `sm` up. Render it inside <AnimatePresence>.
export default function Modal({ onClose, labelledBy, label, fullscreen = false, panelClassName = '', children }) {
  const panelRef = useRef(null)
  useModalBehavior(panelRef, onClose)

  return createPortal(
    <m.div
      className={`fixed inset-0 z-[100] flex ${fullscreen ? '' : 'items-end justify-center sm:items-center sm:p-6'}`}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <m.div variants={backdrop} onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-royal-950/75 backdrop-blur-sm" />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={label}
        tabIndex={-1}
        variants={sheet}
        className={`relative outline-none ${panelClassName}`}
      >
        {children}
      </m.div>
    </m.div>,
    document.body,
  )
}
