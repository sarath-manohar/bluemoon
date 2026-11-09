import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site } from './src/config/site.js'

// Builds <title>, meta, Open Graph and JSON-LD from the data file so SEO never drifts from the content.
function seo() {
  return {
    name: 'bluemoon-seo',
    transformIndexHtml() {
      const data = JSON.parse(readFileSync(new URL('./src/data/bluemoon-data.json', import.meta.url), 'utf8'))
      const { brand, contact } = data
      const title = data.seo?.title ?? `${brand.name} | ${brand.location}`
      const description = data.seo?.description ?? `${brand.slogan} — ${brand.tagline}.`
      const absolute = (path) => (site.url ? new URL(path, site.url).href : path)
      const image = absolute(site.ogImage)
      const [locality, region] = brand.location.split(',').map((part) => part.trim())

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: brand.name,
        description,
        slogan: brand.slogan,
        foundingDate: String(brand.since),
        image,
        ...(site.url && { url: site.url }),
        telephone: [...new Set([...(contact.phones ?? []), ...(contact.footerPhones ?? [])])],
        address: { '@type': 'PostalAddress', addressLocality: locality, addressRegion: region, addressCountry: 'IN' },
        sameAs: Object.values(contact.social ?? {}),
      }

      const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
      return [
        { tag: 'title', children: title, injectTo: 'head' },
        meta({ name: 'description', content: description }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: brand.name }),
        meta({ property: 'og:title', content: title }),
        meta({ property: 'og:description', content: description }),
        meta({ property: 'og:image', content: image }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        ...(site.url
          ? [
              meta({ property: 'og:url', content: site.url }),
              { tag: 'link', attrs: { rel: 'canonical', href: site.url }, injectTo: 'head' },
            ]
          : []),
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(jsonLd), injectTo: 'head' },
      ]
    },
  }
}

export default defineConfig({
  // Relative base so the build works on Netlify, Vercel and GitHub Pages project sites alike.
  base: './',
  plugins: [react(), tailwindcss(), seo()],
})
