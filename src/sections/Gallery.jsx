import { lazy, Suspense, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import SectionHeading from '../components/SectionHeading.jsx'
import { Stagger, StaggerItem } from '../components/Reveal.jsx'
import { galleryPhotos } from '../lib/assets.js'
import { sceneUri } from '../lib/placeholderArt.js'

const loadLightbox = () => import('../components/Lightbox.jsx')
const Lightbox = lazy(loadLightbox)

// Varied sizes so the placeholder masonry looks like real photos until src/assets/gallery/ is filled.
const PLACEHOLDER_SIZES = [[800, 1000], [800, 800], [800, 600], [800, 1000], [800, 600], [800, 800], [800, 1000], [800, 600], [800, 800]]

const buildPlaceholders = () =>
  PLACEHOLDER_SIZES.map(([width, height], index) => {
    const name = data.destinations[index]?.name
    return {
      src: sceneUri(`gallery-${name ?? index}`, width, height),
      alt: name ? ui.gallery.placeholderAlt.replace('{name}', name) : ui.gallery.placeholderFallback,
      width,
      height,
    }
  })

export default function Gallery() {
  const photos = useMemo(() => (galleryPhotos.length ? galleryPhotos : buildPlaceholders()), [])
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="mesh-light relative scroll-mt-20 pb-24 pt-20 sm:pb-36 sm:pt-28">
      <SectionHeading id="gallery-title" {...ui.sections.gallery} />
      <Stagger gap={0.06} className="mx-auto max-w-7xl columns-2 gap-3 px-4 sm:columns-3 sm:gap-4 sm:px-6 lg:columns-4">
        {photos.map((photo, index) => (
          <StaggerItem key={photo.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              onPointerEnter={loadLightbox}
              onFocus={loadLightbox}
              aria-label={photo.alt}
              className="group relative block w-full overflow-hidden rounded-2xl bg-royal-100 shadow-soft transition duration-300 hover:shadow-lift"
            >
              <img src={photo.src} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async" className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center bg-royal-950/0 opacity-0 transition duration-300 group-hover:bg-royal-950/35 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="grid size-12 place-items-center rounded-full bg-white text-royal-600 shadow-lift">
                  <ZoomIn className="size-6" aria-hidden="true" />
                </span>
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <Suspense fallback={null}>
        <AnimatePresence>
          {openIndex !== null && <Lightbox photos={photos} startIndex={openIndex} onClose={() => setOpenIndex(null)} />}
        </AnimatePresence>
      </Suspense>
    </section>
  )
}
