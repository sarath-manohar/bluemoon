import { ArrowUpRight, Compass, GraduationCap, Heart, Landmark, School, TrainFront, Users } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import Card from '../components/Card.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import { Stagger, StaggerItem } from '../components/Reveal.jsx'
import { serviceMessage, whatsappHref } from '../lib/whatsapp.js'

// Icon per service id; any new service in the data falls back to the compass.
const ICONS = { college: GraduationCap, school: School, pilgrim: Landmark, honeymoon: Heart, family: Users, train: TrainFront }

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="mesh-light relative scroll-mt-20 pb-24 pt-20 sm:pb-36 sm:pt-28">
      <SectionHeading id="services-title" {...ui.sections.services} />
      <Stagger as="ul" gap={0.09} className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-7">
        {data.services.map((service, index) => {
          const Icon = ICONS[service.id] ?? Compass
          return (
            <StaggerItem as="li" key={service.id}>
              <Card border className="group flex h-full flex-col overflow-hidden p-6 hover:shadow-glow sm:p-7">
                <span aria-hidden="true" className="absolute -right-2 -top-4 select-none font-display text-8xl font-bold text-royal-50 transition-colors duration-300 group-hover:text-sun-100">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="relative mb-5 grid size-14 place-items-center rounded-2xl bg-linear-to-br from-royal-400 to-royal-600 text-white shadow-lift transition duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:from-sun-400 group-hover:to-sun-500 group-hover:text-ink">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="relative font-display text-2xl font-semibold text-royal-900">{service.title}</h3>
                {service.description && <p className="relative mt-2 flex-1 text-slate-600">{service.description}</p>}
                <a
                  href={whatsappHref(serviceMessage(service.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-5 inline-flex items-center gap-1.5 self-start font-semibold text-royal-500 transition-colors hover:text-royal-700"
                >
                  {ui.services.plan}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  <span className="sr-only"> — {service.title}</span>
                </a>
              </Card>
            </StaggerItem>
          )
        })}
      </Stagger>
      <WaveDivider className="text-white" />
    </section>
  )
}
