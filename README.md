# Bluemoon Tour Packages — website

Static React + Vite + Tailwind CSS v4 + Framer Motion site. No backend: `npm run build` produces a plain `dist/` folder.

> **Heads-up:** `src/data/bluemoon-data.json` is currently **stand-in content** (placeholder phone numbers, sample
> destinations and copy). Replace it with the real file — see "Edit content" below.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve dist/ locally
npm run lint
```

## Edit content

Everything on the page is rendered from three places — no text lives inside components.

| What | Where |
| --- | --- |
| Business content: brand, phones, social links, services, destinations, food, inclusions, stay & vehicle, footer note | `src/data/bluemoon-data.json` |
| Interface copy: nav labels, section headings, button/form labels, WhatsApp message templates | `src/data/content.js` |
| Region groups for the destination filter (the JSON has no region field) | `src/data/regions.js` |

Top-level keys the JSON is expected to have:

```text
brand        { name, shortName, since, location, slogan, tagline }
seo          { title, description }                       (optional — derived from brand if missing)
contact      { phones: [..], footerPhones?: [..], social: { facebook, instagram } }
             (phones → Contact section + hero "Call now"; footerPhones → footer, falls back to phones)
highlights   { security }
services     [ { id, title, description } ]
destinations [ { name, places: [..], activities?: [..], featured?: true } ]
food         { badge, meals: [ { name, items: [..] } ] }
inclusions   { items: [..], disclaimer }
stay         { hotels: { title, description, points }, vehicle: { title, description, range, points } }
offerNote
```

`src/data/index.js` is the single adapter between the JSON and the UI. It adds each destination's `region`, computes the
"destinations" and "tour types" counts, and picks the featured carousel (destinations marked `featured: true`, or else the
six with the most places). **Nothing is fixed silently:** a missing name, empty list or empty field is skipped or shown as
"coming soon" on the page, and a warning is printed to the browser console in `npm run dev`
(e.g. `destinations["Pondicherry"] has no places listed`).

Service icons are chosen by the service `id` (`college`, `school`, `pilgrim`, `honeymoon`, `family`, `train`) in
`src/sections/Services.jsx`; an unknown id gets a compass icon. To change which destinations sit in which filter group,
edit the keyword lists in `src/data/regions.js` (anything unmatched goes to **Others**).

## Swap placeholder images

Drop photos into these folders. They are picked up automatically — no code changes. The folders ship with **dummy
images** (coloured boxes showing their own file name) so you can see which file appears where; overwrite them with real
photos of the same name. Delete a file and a generated illustration is shown instead. A plain-language guide is in
`src/assets/HOW-TO-CHANGE-IMAGES.txt`.

| Folder | File name | Used for |
| --- | --- | --- |
| `src/assets/gallery/` | any `.jpg/.jpeg/.png/.webp/.avif` | Gallery grid + lightbox. Sorted by file name. The file name becomes the alt text: `munnar-tea-gardens.jpg` → "Munnar tea gardens". |
| `src/assets/destinations/` | `<destination-name>.jpg`, lower-case, hyphens — e.g. `munnar.jpg`, `kanyakumari.jpg` | Destination card header, featured carousel and the details modal. |
| `src/assets/stay/` | `hotels.jpg`, `vehicle.jpg` | The two Stay & Travel cards. |

Tips: export photos at about 1600px on the long edge and compress them (WebP is ideal); the gallery and card images are
lazy-loaded.

**Logo:** `src/assets/logo/logo.svg` (or `logo.png` / `.jpg` / `.webp` — keep only one). It is used in the navbar, footer,
intro screen and browser tab. Delete it to fall back to the drawn "moon" mark. Whether the business name is shown next
to it is set in `src/config/branding.js`.

**Footer:** all footer wording (about text, headings, email, address, YouTube link, bottom note, copyright, credits line)
is in `src/config/branding.js`. Phones and Facebook/Instagram links still come from `bluemoon-data.json`.

Other images: the fallback favicon (used when there is no logo file) is `public/favicon.svg`; the social-share image is `public/og-image.png` (1200×630). It contains
the slogan as text, so re-make it if the slogan changes.

## Change the WhatsApp number

Open `src/config/site.js`:

```js
whatsappNumber: '918848915326',   // digits only, with country code
countryCode: '91',
```

- Every "Book on WhatsApp" button, the "Enquire about <destination>" buttons and the enquiry form open this number.
- Leave it empty to fall back to the **first phone number** in `bluemoon-data.json` with `91` added.
- The `tel:` links always come from the phone lists in the data file.

The same file holds `url` (your production URL — used for the canonical link, Open Graph and JSON-LD) and `ogImage`.
Fill in `url` before you launch so link previews work.

## Deploy

`npm run build`, then publish the `dist/` folder. The build uses relative asset paths, so it works at a domain root and
in a sub-folder.

- **Netlify:** build command `npm run build`, publish directory `dist` (or drag-and-drop the `dist` folder).
- **Vercel:** framework preset "Vite"; output directory `dist`.
- **GitHub Pages:** push the repo, then publish `dist` (e.g. with the `gh-pages` branch or a GitHub Actions
  "build and deploy Pages" workflow that runs `npm ci && npm run build` and uploads `dist`).

## Project layout

```text
src/
  config/site.js      WhatsApp number, site URL, share image
  data/               JSON content, UI copy, region groups, adapter
  components/         Button, Card, Chip, Modal, SectionHeading, WhatsAppButton, Magnetic, Lightbox, …
  sections/           Navbar, Hero, Stats, Services, Destinations, Food, Inclusions, StayTravel, Gallery, Contact, Footer
  hooks/              useTilt, useCountUp, useModalBehavior (focus trap), useScrollSpy, useFinePointer
  lib/                WhatsApp links, asset lookup, placeholder illustrations, motion presets
  assets/             gallery/, destinations/, stay/  (your photos)
```

## Accessibility, performance and SEO notes

- Modals (destination details, lightbox) trap focus, close on `Esc`, lock page scroll, make the page behind inert and
  return focus to the button that opened them.
- `prefers-reduced-motion`: the intro is skipped, parallax / bus / tilt / magnetic buttons / cursor glow are disabled and
  CSS animations are switched off.
- The modal and lightbox are code-split and prefetched on hover/focus; Framer Motion's layout/drag engine loads
  asynchronously via `LazyMotion`.
- `<title>`, meta description, Open Graph tags and `TravelAgency` JSON-LD are generated from the data file at build time
  (`vite.config.js`).
