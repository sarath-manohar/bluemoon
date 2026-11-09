import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react'
import { ui } from '../data/content.js'
import { Reveal } from './Reveal.jsx'
import DestinationImage from './DestinationImage.jsx'

export default function FeaturedCarousel({ items, onOpen, onPreload }) {
  const track = useRef(null)
  const reduce = useReducedMotion()
  const scroll = (direction) =>
    track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })

  const arrow = 'grid size-10 place-items-center rounded-full bg-white text-royal-600 shadow-soft transition hover:bg-royal-500 hover:text-white'

  return (
    <Reveal className="mx-auto mb-12 max-w-7xl px-4 sm:mb-16 sm:px-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-royal-900 sm:text-2xl">
          <Sparkles className="size-5 text-sun-600" aria-hidden="true" />
          {ui.destinations.featured}
        </h3>
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label={ui.destinations.featuredPrev} className={arrow}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={ui.destinations.featuredNext} className={arrow}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul ref={track} className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 pt-1 sm:-mx-6 sm:px-6">
        {items.map((destination) => (
          <li key={destination.id} className="w-[72%] shrink-0 snap-start sm:w-64 lg:w-72">
            <button
              type="button"
              onClick={() => onOpen(destination)}
              onPointerEnter={onPreload}
              onFocus={onPreload}
              aria-label={`${ui.destinations.viewDetails}: ${destination.name}`}
              className="group relative block h-72 w-full overflow-hidden rounded-3xl text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <DestinationImage name={destination.name} className="size-full transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 bg-linear-to-t from-royal-950/85 via-royal-950/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 text-white">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white">
                  <MapPin className="size-5 fill-pin/20 text-pin" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-xl font-semibold">{destination.name}</span>
                  {destination.places.length > 0 && (
                    <span className="block text-sm text-royal-100">{ui.destinations.placesCount.replace('{count}', destination.places.length)}</span>
                  )}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
