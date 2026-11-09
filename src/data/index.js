import raw from './bluemoon-data.json'
import { OTHER_REGION, REGIONS, regionFor } from './regions.js'
import { slugify } from '../lib/slug.js'

// Anything unexpected in the JSON is reported in the dev console instead of being fixed silently.
const flag = (message) => {
  if (import.meta.env.DEV) console.warn(`[bluemoon-data] ${message}`)
}

const text = (value, where, { required = false } = {}) => {
  const cleaned = typeof value === 'string' ? value.trim() : ''
  if (!cleaned && required) flag(`${where} is missing or empty`)
  return cleaned
}

const textList = (list, where) => {
  if (list == null) return []
  if (!Array.isArray(list)) {
    flag(`${where} should be a list; ignored`)
    return []
  }
  return list.flatMap((item, index) => {
    const cleaned = text(item, `${where}[${index}]`)
    return cleaned ? [cleaned] : []
  })
}

const brand = {
  name: text(raw.brand?.name, 'brand.name', { required: true }),
  shortName: text(raw.brand?.shortName, 'brand.shortName') || 'BM',
  since: Number(raw.brand?.since) || null,
  location: text(raw.brand?.location, 'brand.location', { required: true }),
  slogan: text(raw.brand?.slogan, 'brand.slogan', { required: true }),
  tagline: text(raw.brand?.tagline, 'brand.tagline', { required: true }),
}
if (!brand.since) flag('brand.since is missing or not a number')

const phones = textList(raw.contact?.phones, 'contact.phones')
const footerPhones = textList(raw.contact?.footerPhones, 'contact.footerPhones')

const contact = {
  phones,
  // Numbers listed in the footer; falls back to the main phone list when the data file has none.
  footerPhones: footerPhones.length ? footerPhones : phones,
  social: {
    facebook: text(raw.contact?.social?.facebook, 'contact.social.facebook'),
    instagram: text(raw.contact?.social?.instagram, 'contact.social.instagram'),
  },
}

const services = (raw.services ?? []).flatMap((service, index) => {
  const title = text(service?.title, `services[${index}].title`)
  if (!title) return []
  return [{ id: text(service.id, `services[${index}].id`) || slugify(title), title, description: text(service.description, `services[${index}].description`) }]
})

const usedIds = new Set()
const destinations = (raw.destinations ?? []).flatMap((destination, index) => {
  const name = text(destination?.name, `destinations[${index}].name`)
  if (!name) return []
  const places = textList(destination.places, `destinations["${name}"].places`)
  if (!places.length) flag(`destinations["${name}"] has no places listed`)

  let id = slugify(name) || `destination-${index}`
  while (usedIds.has(id)) id += '-2'
  usedIds.add(id)

  return [{
    id,
    name,
    places,
    activities: textList(destination.activities, `destinations["${name}"].activities`),
    region: regionFor(name),
    featured: destination.featured === true,
  }]
})

const regions = [...REGIONS, OTHER_REGION]
  .map(({ id, label }) => ({ id, label, count: destinations.filter((d) => d.region.id === id).length }))
  .filter((region) => region.count > 0)

// Honour `featured: true` in the data; otherwise feature the destinations with the most places.
const flagged = destinations.filter((d) => d.featured)
const featured = flagged.length >= 3 ? flagged : [...destinations].sort((a, b) => b.places.length - a.places.length).slice(0, 6)

const meals = (raw.food?.meals ?? []).flatMap((meal, index) => {
  const name = text(meal?.name, `food.meals[${index}].name`)
  return name ? [{ name, items: textList(meal.items, `food.meals["${name}"].items`) }] : []
})

const stayBlock = (block, where) => ({
  title: text(block?.title, `${where}.title`),
  description: text(block?.description, `${where}.description`),
  points: textList(block?.points, `${where}.points`),
  range: textList(block?.range, `${where}.range`),
})

const data = {
  brand,
  contact,
  security: text(raw.highlights?.security, 'highlights.security'),
  services,
  destinations,
  regions,
  featured,
  food: { badge: text(raw.food?.badge, 'food.badge'), meals },
  inclusions: {
    items: textList(raw.inclusions?.items, 'inclusions.items'),
    disclaimer: text(raw.inclusions?.disclaimer, 'inclusions.disclaimer'),
  },
  stay: { hotels: stayBlock(raw.stay?.hotels, 'stay.hotels'), vehicle: stayBlock(raw.stay?.vehicle, 'stay.vehicle') },
  offerNote: text(raw.offerNote, 'offerNote'),
  // Counts shown in the stats strip are computed, never typed in.
  stats: { destinations: destinations.length, tourTypes: services.length },
}

export default data
