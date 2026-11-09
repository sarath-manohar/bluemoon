import { m } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { ui } from '../data/content.js'
import { useTilt } from '../hooks/useTilt.js'
import { ease } from '../lib/motion.js'
import Chip from './Chip.jsx'
import DestinationImage from './DestinationImage.jsx'

// `ref` is forwarded to the <li> so AnimatePresence (popLayout) can measure the card while it exits.
export default function DestinationCard({ ref, destination, index, onOpen, onPreload }) {
  const { style, onPointerMove, onPointerLeave } = useTilt(7)
  const topPlaces = destination.places.slice(0, 3)
  const extra = destination.places.length - topPlaces.length

  return (
    <m.li
      ref={ref}
      layout="position"
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <m.article
        style={style}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onClick={() => onOpen(destination)}
        className="gradient-border shine group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        <div className="relative h-44 overflow-hidden sm:h-48">
          <DestinationImage name={destination.name} className="size-full transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-linear-to-t from-royal-950/55 via-transparent to-transparent" />
          <Chip tone="white" className="absolute left-3 top-3 shadow-soft">
            {destination.region.label}
          </Chip>
        </div>

        <div className="relative flex flex-1 flex-col px-5 pb-5">
          <span className="-mt-7 mb-3 grid size-12 place-items-center rounded-full bg-white shadow-lift ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-8deg]">
            <MapPin className="size-6 fill-pin/20 text-pin" aria-hidden="true" />
          </span>
          <h3 className="font-display text-2xl font-semibold text-royal-900">{destination.name}</h3>

          <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
            {topPlaces.length ? (
              <>
                {topPlaces.map((place) => (
                  <Chip key={place}>{place}</Chip>
                ))}
                {extra > 0 && <Chip tone="sun">{ui.destinations.more.replace('{count}', extra)}</Chip>}
              </>
            ) : (
              <p className="text-sm italic text-slate-500">{ui.destinations.placesSoon}</p>
            )}
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onOpen(destination)
            }}
            onPointerEnter={onPreload}
            onFocus={onPreload}
            aria-label={`${ui.destinations.viewDetails}: ${destination.name}`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-royal-500 px-5 py-2.5 text-sm font-bold text-white transition duration-200 hover:bg-royal-600 group-hover:shadow-lift active:scale-95"
          >
            {ui.destinations.viewDetails}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </m.article>
    </m.li>
  )
}
