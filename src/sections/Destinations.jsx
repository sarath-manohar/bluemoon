import { lazy, Suspense, useDeferredValue, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, m } from 'framer-motion'
import { Search, X } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import DestinationCard from '../components/DestinationCard.jsx'
import FeaturedCarousel from '../components/FeaturedCarousel.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'

const loadModal = () => import('../components/DestinationModal.jsx')
const DestinationModal = lazy(loadModal)

const ALL = { id: 'all', label: ui.destinations.all }

export default function Destinations() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState(ALL.id)
  const [selected, setSelected] = useState(null)
  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase()
    return data.destinations.filter(
      (d) =>
        (region === ALL.id || d.region.id === region) &&
        (!term || [d.name, d.region.label, ...d.places, ...d.activities].some((text) => text.toLowerCase().includes(term))),
    )
  }, [deferredQuery, region])

  const clearAll = () => {
    setQuery('')
    setRegion(ALL.id)
  }
  const regions = [ALL, ...data.regions]
  const status = filtered.length === 1 ? ui.destinations.resultsOne : ui.destinations.results.replace('{count}', filtered.length)

  return (
    <section id="destinations" aria-labelledby="destinations-title" className="mesh-white relative scroll-mt-20 pb-24 pt-16 sm:pb-36 sm:pt-24">
      <SectionHeading id="destinations-title" {...ui.sections.destinations} />

      {data.featured.length > 0 && <FeaturedCarousel items={data.featured} onOpen={setSelected} onPreload={loadModal} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <label htmlFor="destination-search" className="sr-only">
              {ui.destinations.searchLabel}
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-royal-400" aria-hidden="true" />
            <input
              id="destination-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={ui.destinations.searchPlaceholder}
              autoComplete="off"
              className="w-full rounded-full border-2 border-royal-100 bg-white py-3 pl-12 pr-11 font-medium text-ink shadow-soft transition placeholder:text-slate-500 focus:border-royal-500 focus:outline-hidden focus:ring-4 focus:ring-royal-500/20 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={ui.destinations.clearSearch}
                className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-slate-500 hover:bg-royal-50 hover:text-royal-700"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <LayoutGroup id="region-filter">
            <div role="group" aria-label={ui.destinations.filterLabel} className="flex flex-wrap gap-2">
              {regions.map((item) => {
                const active = region === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setRegion(item.id)}
                    className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${active ? 'text-white' : 'bg-white text-royal-700 shadow-soft hover:bg-royal-50'}`}
                  >
                    {active && (
                      <m.span layoutId="region-active" className="absolute inset-0 rounded-full bg-royal-500 shadow-lift" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </div>

        <p role="status" aria-live="polite" className="mb-5 text-sm font-semibold text-slate-600">
          {status}
        </p>

        {filtered.length > 0 ? (
          <m.ul layout className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((destination, index) => (
                <DestinationCard key={destination.id} destination={destination} index={index} onOpen={setSelected} onPreload={loadModal} />
              ))}
            </AnimatePresence>
          </m.ul>
        ) : (
          <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-soft">
            <p className="font-display text-xl font-semibold text-royal-900">{ui.destinations.noResultsTitle}</p>
            <p className="mt-2 text-slate-600">{ui.destinations.noResultsHelp}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={clearAll} className="rounded-full border-2 border-royal-500 px-5 py-2 text-sm font-bold text-royal-600 hover:bg-royal-50">
                {ui.destinations.clearFilters}
              </button>
              <WhatsAppButton>{ui.destinations.askUs}</WhatsAppButton>
            </div>
          </m.div>
        )}
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>
          {selected && <DestinationModal key={selected.id} destination={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      </Suspense>

      <WaveDivider className="text-[#fffdf3]" />
    </section>
  )
}
