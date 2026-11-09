import { m } from 'framer-motion'
import { Bus, Hotel, Info, Luggage, Utensils } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import busPhoto from '../assets/busimages/1.jpeg'
import Card from '../components/Card.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx'

// The tick is drawn in with pathLength as each row's reveal fires.
const drawTick = { hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.5, delay: 0.25 } } }

function Tick() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 shrink-0" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" className="fill-royal-50 stroke-royal-200" strokeWidth="1.5" />
      <m.path d="M7 12.5l3.2 3.2L17 8.8" className="stroke-royal-500" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" variants={drawTick} />
    </svg>
  )
}

export default function Inclusions() {
  const { items, disclaimer } = data.inclusions
  if (!items.length) return null

  return (
    <section id="inclusions" aria-labelledby="inclusions-title" className="mesh-light relative scroll-mt-20 pb-24 pt-20 sm:pb-36 sm:pt-28">
      <SectionHeading id="inclusions-title" {...ui.sections.inclusions} />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="relative flex aspect-[3/4] -rotate-3 flex-col overflow-hidden rounded-[2rem] bg-royal-800 p-8 text-white shadow-lift">
            {/* Fleet photo: src/assets/busimages/1.jpeg. Decorative — the tagline carries the meaning. */}
            <img src={busPhoto} alt="" width="960" height="1280" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
            {/* Darkens the sky behind the text and the gravel behind the icons; the buses in between stay clear. */}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-royal-950/75 via-royal-950/25 via-50% to-royal-950/70" />
            <span className="relative grid size-20 place-items-center rounded-3xl bg-sun-500 text-ink shadow-glow">
              <Luggage className="size-10" aria-hidden="true" />
            </span>
            <p className="relative mt-6 font-display text-3xl font-semibold leading-tight [text-shadow:0_2px_14px_rgb(0_0_0/0.5)]">{data.brand.tagline}</p>
            <div className="relative mt-auto flex gap-3 pt-6 text-white" aria-hidden="true">
              {[Bus, Hotel, Utensils].map((Icon, i) => (
                <span key={i} className="grid size-11 animate-float place-items-center rounded-2xl bg-white/15" style={{ animationDelay: `${i * 0.5}s` }}>
                  <Icon className="size-5" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <Card lift={false} border className="p-5 sm:p-8">
            <Stagger as="ul" gap={0.09} className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {items.map((item) => (
                <StaggerItem as="li" key={item} className="flex items-start gap-3">
                  <Tick />
                  <span className="pt-0.5 font-semibold text-royal-900">{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Card>
          {disclaimer && (
            <Reveal delay={0.2} className="mt-5 flex gap-3 rounded-2xl border border-dashed border-royal-200 bg-white/60 p-4 text-sm text-slate-600">
              <Info className="mt-0.5 size-5 shrink-0 text-royal-400" aria-hidden="true" />
              <p>
                <strong className="font-bold text-royal-800">{ui.sections.inclusions.pill}:</strong> {disclaimer}
              </p>
            </Reveal>
          )}
        </div>
      </div>
      <WaveDivider className="text-white" />
    </section>
  )
}
