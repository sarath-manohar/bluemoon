import { useId, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Coffee, Moon, Sun, Sunrise, Utensils } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import Chip from '../components/Chip.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import { ease, fadeUp, stagger } from '../lib/motion.js'

const BY_NAME = { breakfast: Sunrise, lunch: Sun, dinner: Moon }
const BY_POSITION = [Sunrise, Sun, Moon]
const iconFor = (name, index) => BY_NAME[name.toLowerCase()] ?? BY_POSITION[index] ?? Utensils

export default function Food() {
  const { meals, badge } = data.food
  const [active, setActive] = useState(0)
  const uid = useId()
  if (!meals.length) return null

  const meal = meals[active]
  const onKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    const next = (active + step + meals.length) % meals.length
    setActive(next)
    document.getElementById(`${uid}-tab-${next}`)?.focus()
  }

  return (
    <section id="food" aria-labelledby="food-title" className="mesh-warm relative scroll-mt-20 overflow-hidden pb-24 pt-20 sm:pb-36 sm:pt-28">
      <Coffee aria-hidden="true" className="absolute left-[6%] top-32 hidden size-14 animate-float text-sun-500/40 [--r:-12deg] md:block" />
      <Utensils aria-hidden="true" className="absolute right-[7%] top-48 hidden size-16 animate-float-slow text-royal-400/30 [--r:14deg] md:block" />
      <SectionHeading id="food-title" {...ui.sections.food} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Timeline of meals: the yellow line fills as you move through the day */}
        <div role="tablist" aria-label={ui.food.mealsLabel} onKeyDown={onKeyDown} className="relative mb-8 grid" style={{ gridTemplateColumns: `repeat(${meals.length}, 1fr)` }}>
          <span aria-hidden="true" className="absolute top-8 h-1 -translate-y-1/2 rounded-full bg-royal-100" style={{ left: `${50 / meals.length}%`, right: `${50 / meals.length}%` }} />
          <m.span
            aria-hidden="true"
            className="absolute top-8 h-1 origin-left -translate-y-1/2 rounded-full bg-sun-500"
            style={{ left: `${50 / meals.length}%`, right: `${50 / meals.length}%` }}
            animate={{ scaleX: meals.length > 1 ? active / (meals.length - 1) : 0 }}
            transition={{ duration: 0.5, ease }}
          />
          {meals.map((item, index) => {
            const Icon = iconFor(item.name, index)
            const selected = index === active
            return (
              <button
                key={item.name}
                id={`${uid}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className="group relative flex flex-col items-center gap-2 rounded-2xl pb-1 outline-offset-4"
              >
                <span
                  className={`grid size-16 place-items-center rounded-full ring-4 ring-white transition duration-300 ${
                    selected ? 'scale-110 bg-royal-500 text-white shadow-lift' : index < active ? 'bg-sun-500 text-ink shadow-soft' : 'bg-white text-royal-500 shadow-soft group-hover:scale-105'
                  }`}
                >
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <span className={`font-display text-lg font-semibold ${selected ? 'text-royal-600' : 'text-slate-600'}`}>{item.name}</span>
              </button>
            )
          })}
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} tabIndex={0} className="gradient-border relative overflow-hidden rounded-3xl bg-white p-6 shadow-lift sm:p-9">
          {badge && <span className="ribbon">{badge}</span>}
          <AnimatePresence mode="wait">
            <m.div key={meal.name} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3, ease }}>
              <h3 className="pr-16 font-display text-3xl font-semibold text-royal-900 sm:pr-24 sm:text-4xl">{meal.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-slate-600">{ui.food.items}</p>
              {meal.items.length ? (
                <m.ul initial="hidden" animate="show" variants={stagger(0.06, 0.1)} className="mt-6 flex flex-wrap gap-2.5">
                  {meal.items.map((item) => (
                    <m.li key={item} variants={{ hidden: { opacity: 0, scale: 0.7, y: 12 }, show: { ...fadeUp.show, scale: 1 } }}>
                      <Chip tone="blue" size="lg" className="transition hover:-translate-y-0.5 hover:bg-sun-100 hover:text-ink hover:ring-sun-300">
                        {item}
                      </Chip>
                    </m.li>
                  ))}
                </m.ul>
              ) : (
                <p className="mt-6 italic text-slate-500">{ui.food.noItems}</p>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
      <WaveDivider className="text-mist" />
    </section>
  )
}
