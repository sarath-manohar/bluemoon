import { m } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import { Stagger, StaggerItem } from '../components/Reveal.jsx'
import { useCountUp } from '../hooks/useCountUp.js'

function Counter({ to, from = 0 }) {
  const { ref, rounded } = useCountUp(to, { from })
  return <m.span ref={ref}>{rounded}</m.span>
}

export default function Stats() {
  const { brand, stats, security } = data
  const counters = [
    brand.since && { label: ui.stats.since, to: brand.since, from: brand.since - 25 },
    { label: ui.stats.destinations, to: stats.destinations },
    { label: ui.stats.tourTypes, to: stats.tourTypes },
  ].filter(Boolean)

  return (
    <section aria-label={ui.stats.label} className="relative z-20 -mt-12 px-4 sm:-mt-16">
      <Stagger as="ul" gap={0.1} className="glass mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl shadow-lift lg:grid-cols-4">
        {counters.map((item) => (
          <StaggerItem as="li" key={item.label} className="bg-white/60 p-5 text-center sm:p-7">
            <p className="font-display text-4xl font-bold text-royal-500 sm:text-5xl">
              <Counter to={item.to} from={item.from} />
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-slate-600">{item.label}</p>
          </StaggerItem>
        ))}
        {security && (
          <StaggerItem as="li" className="col-span-2 flex items-center justify-center gap-3 bg-sun-500 p-5 text-left sm:p-7 lg:col-span-1">
            <ShieldCheck className="size-9 shrink-0 text-royal-900" aria-hidden="true" />
            <p className="font-display text-lg font-semibold leading-snug text-ink">{security}</p>
          </StaggerItem>
        )}
      </Stagger>
    </section>
  )
}
