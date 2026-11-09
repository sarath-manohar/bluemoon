import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BusFront, Check, Hotel } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import Card from '../components/Card.jsx'
import Chip from '../components/Chip.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import { Stagger, StaggerItem } from '../components/Reveal.jsx'
import { stayPhoto } from '../lib/assets.js'
import { sceneUri } from '../lib/placeholderArt.js'

// Uses src/assets/stay/<photoKey>.jpg when present, otherwise a generated scene. Drifts slowly as you scroll.
function StayCard({ block, photoKey, icon: Icon }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-9%', '9%'])
  const src = stayPhoto(photoKey) ?? sceneUri(`stay-${photoKey}`, 900, 700)

  return (
    <Card ref={ref} border className="group flex h-full flex-col overflow-hidden">
      <div className="relative h-60 overflow-hidden rounded-t-3xl sm:h-72">
        <m.img src={src} alt="" width="900" height="700" loading="lazy" decoding="async" style={{ y, scale: 1.22 }} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-royal-950/70 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 grid size-14 place-items-center rounded-2xl bg-sun-500 text-ink shadow-glow transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
          <Icon className="size-7" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="font-display text-2xl font-semibold text-royal-900 sm:text-3xl">{block.title}</h3>
        {block.description && <p className="mt-2 text-slate-600">{block.description}</p>}

        {block.range.length > 0 && (
          <div className="mt-5 rounded-2xl bg-royal-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-royal-600">{ui.stay.fleet}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {block.range.map((item, index) => (
                <span key={item} className="contents">
                  {index > 0 && (
                    <span aria-hidden="true" className="relative mx-1 hidden h-0.5 min-w-8 flex-1 border-t-2 border-dashed border-royal-300 sm:block">
                      <BusFront className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 animate-bob rounded-full bg-royal-50 text-royal-500" />
                    </span>
                  )}
                  <Chip tone="white" size="lg">
                    {item}
                  </Chip>
                </span>
              ))}
            </div>
          </div>
        )}

        {block.points.length > 0 && (
          <Stagger as="ul" gap={0.08} className="mt-5 grid gap-2.5">
            {block.points.map((point) => (
              <StaggerItem as="li" key={point} className="flex items-start gap-2.5 font-medium text-royal-900">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sun-500 text-ink">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </Card>
  )
}

export default function StayTravel() {
  const { hotels, vehicle } = data.stay
  return (
    <section id="stay" aria-labelledby="stay-title" className="mesh-white relative scroll-mt-20 pb-24 pt-20 sm:pb-36 sm:pt-28">
      <SectionHeading id="stay-title" {...ui.sections.stay} />
      <Stagger gap={0.15} className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:gap-8">
        {hotels.title && (
          <StaggerItem>
            <StayCard block={hotels} photoKey="hotels" icon={Hotel} />
          </StaggerItem>
        )}
        {vehicle.title && (
          <StaggerItem>
            <StayCard block={vehicle} photoKey="vehicle" icon={BusFront} />
          </StaggerItem>
        )}
      </Stagger>
      <WaveDivider className="text-mist" />
    </section>
  )
}
