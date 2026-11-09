import { slugify } from './slug.js'

// Photos dropped into these folders are picked up automatically — no code changes needed.
// (Vite requires the glob options to be written inline as an object literal.)
const gallery = import.meta.glob('/src/assets/gallery/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })
const destinations = import.meta.glob('/src/assets/destinations/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })
const stay = import.meta.glob('/src/assets/stay/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })

const basename = (path) => path.split('/').pop().replace(/\.[^.]+$/, '')

// Looks up `<folder>/<slug>.<ext>` — e.g. src/assets/destinations/munnar.jpg
const byName = (modules) => {
  const map = new Map(Object.entries(modules).map(([path, url]) => [basename(path).toLowerCase(), url]))
  return (name) => map.get(slugify(name)) ?? null
}

export const destinationPhoto = byName(destinations)
export const stayPhoto = byName(stay)

// "03-munnar-tea-gardens.jpg" -> alt text "Munnar tea gardens" (a leading number only sets the order)
const altFromFilename = (path) => {
  const words = basename(path).replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

export const galleryPhotos = Object.entries(gallery)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({ src, alt: altFromFilename(path) }))

// The site logo: src/assets/logo/logo.svg (or .png / .jpg / .webp). Used in the navbar, footer, intro and browser tab.
// If the folder is empty, the built-in drawn "moon" mark is used instead.
const logoFiles = import.meta.glob('/src/assets/logo/logo.{svg,png,jpg,jpeg,webp,avif}', { eager: true, query: '?url', import: 'default' })
export const logoUrl = Object.values(logoFiles)[0] ?? null
