import { useCallback, useEffect, useId, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ui } from '../data/content.js'
import { ease } from '../lib/motion.js'
import Modal from './Modal.jsx'

// Loaded on demand (see Gallery.jsx). Arrow keys and swipe change photo; Esc closes (handled by Modal).
export default function Lightbox({ photos, startIndex, onClose }) {
  const [[index, direction], setPage] = useState([startIndex, 0])
  const titleId = useId()
  const photo = photos[index]

  const total = photos.length
  const go = useCallback((step) => setPage(([current]) => [(current + step + total) % total, step]), [total])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go])

  const control = 'grid size-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-sun-500 hover:text-ink'

  return (
    <Modal onClose={onClose} labelledBy={titleId} label={ui.gallery.lightbox} fullscreen panelClassName="on-dark flex size-full flex-col items-center justify-center p-4 sm:p-8">
      <button type="button" onClick={onClose} aria-label={ui.destinations.close} className={`${control} absolute right-4 top-4 z-10`}>
        <X className="size-6" aria-hidden="true" />
      </button>

      <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
        {photos.length > 1 && (
          <button type="button" onClick={() => go(-1)} aria-label={ui.gallery.prev} className={`${control} absolute left-0 z-10 sm:left-4`}>
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
        )}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            custom={direction}
            variants={{
              enter: (d) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (d) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease }}
            drag={photos.length > 1 ? 'x' : false}
            dragSnapToOrigin
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1)
              else if (info.offset.x > 80) go(-1)
            }}
            className="max-h-full max-w-full cursor-grab touch-pan-y rounded-2xl object-contain shadow-2xl active:cursor-grabbing"
          />
        </AnimatePresence>
        {photos.length > 1 && (
          <button type="button" onClick={() => go(1)} aria-label={ui.gallery.next} className={`${control} absolute right-0 z-10 sm:right-4`}>
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        )}
      </div>

      <p id={titleId} className="mt-4 text-center font-semibold text-white">
        {photo.alt}
        <span className="mt-1 block text-sm font-medium text-royal-200">{ui.gallery.counter.replace('{current}', index + 1).replace('{total}', photos.length)}</span>
      </p>
    </Modal>
  )
}
