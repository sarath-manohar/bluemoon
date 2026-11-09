import { useId } from 'react'
import { m } from 'framer-motion'
import { MapPin, Sparkles, X } from 'lucide-react'
import { ui } from '../data/content.js'
import { fadeUp, stagger } from '../lib/motion.js'
import { destinationMessage } from '../lib/whatsapp.js'
import Chip from './Chip.jsx'
import DestinationImage from './DestinationImage.jsx'
import Modal from './Modal.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

// Loaded on demand (see Destinations.jsx) so the modal code stays out of the first bundle.
export default function DestinationModal({ destination, onClose }) {
  const titleId = useId()
  const { name, places, activities, region } = destination

  return (
    <Modal
      onClose={onClose}
      labelledBy={titleId}
      panelClassName="flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white text-ink shadow-2xl sm:max-w-2xl sm:rounded-[2rem]"
    >
      <div className="relative h-40 shrink-0 sm:h-48">
        <DestinationImage name={name} className="size-full" />
        <div className="absolute inset-0 bg-linear-to-t from-royal-950/80 via-royal-950/20 to-transparent" />
        <button
          type="button"
          onClick={onClose}
          aria-label={ui.destinations.close}
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white text-royal-700 shadow-soft transition hover:bg-sun-400 hover:text-ink focus-visible:outline-sun-400"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5 text-white">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white shadow-lift">
            <MapPin className="size-6 fill-pin/20 text-pin" aria-hidden="true" />
          </span>
          <div>
            <h3 id={titleId} className="font-display text-3xl font-semibold leading-none">
              {name}
            </h3>
            <p className="mt-1 text-sm text-royal-100">{region.label}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
        {places.length > 0 ? (
          <>
            <h4 className="mb-3 font-display text-lg font-semibold text-royal-900">{ui.destinations.modalPlaces}</h4>
            <m.ul initial="hidden" animate="show" variants={stagger(0.04, 0.15)} className="grid gap-2 sm:grid-cols-2">
              {places.map((place) => (
                <m.li key={place} variants={fadeUp} className="flex items-center gap-3 rounded-2xl bg-royal-50 px-3.5 py-2.5 text-sm font-semibold text-royal-900">
                  <MapPin className="size-4 shrink-0 text-pin" aria-hidden="true" />
                  {place}
                </m.li>
              ))}
            </m.ul>
          </>
        ) : (
          <p className="rounded-2xl bg-sun-100 p-4 text-sm font-medium text-ink">{ui.destinations.modalEmpty}</p>
        )}

        {activities.length > 0 && (
          <>
            <h4 className="mb-3 mt-6 font-display text-lg font-semibold text-royal-900">{ui.destinations.modalActivities}</h4>
            <m.ul initial="hidden" animate="show" variants={stagger(0.05, 0.3)} className="flex flex-wrap gap-2">
              {activities.map((activity) => (
                <m.li key={activity} variants={fadeUp}>
                  <Chip tone="sun" size="lg" icon={Sparkles}>
                    {activity}
                  </Chip>
                </m.li>
              ))}
            </m.ul>
          </>
        )}
      </div>

      <div className="shrink-0 border-t border-royal-100 bg-white p-4 sm:p-5">
        <WhatsAppButton message={destinationMessage(name)} size="lg" className="w-full" magnetic={false}>
          {ui.destinations.enquire.replace('{destination}', name)}
        </WhatsAppButton>
      </div>
    </Modal>
  )
}
