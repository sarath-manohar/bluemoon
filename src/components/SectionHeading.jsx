import { MapPin } from 'lucide-react'
import { m } from 'framer-motion'
import { Reveal } from './Reveal.jsx'

// Brochure-style heading: a pill with a red map pin. `dark` flips it to yellow for use on blue backgrounds.
export default function SectionHeading({ id, pill, lead, dark = false }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl px-4 text-center sm:mb-14">
      <Reveal>
        <h2
          id={id}
          className={`inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-6 font-display text-2xl font-semibold uppercase tracking-wide sm:text-3xl ${
            dark ? 'bg-sun-500 text-ink shadow-glow' : 'bg-royal-500 text-white shadow-lift'
          }`}
        >
          <m.span
            initial={{ scale: 0, rotate: -35 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 320, damping: 14, delay: 0.25 }}
            className="grid size-9 place-items-center rounded-full bg-white shadow-inner sm:size-11"
          >
            <MapPin className="size-5 fill-pin/20 text-pin sm:size-6" aria-hidden="true" />
          </m.span>
          {pill}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className={`mt-5 text-base sm:text-lg ${dark ? 'text-royal-100' : 'text-slate-600'}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
