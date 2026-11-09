import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import { branding } from '../config/branding.js'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../components/Icons.jsx'
import Logo from '../components/Logo.jsx'
import { telHref } from '../lib/whatsapp.js'

// All footer wording is set in src/config/branding.js; phones and social links come from bluemoon-data.json.
export default function Footer() {
  const { brand, contact, offerNote } = data
  const f = branding.footer
  const socials = [
    contact.social.facebook && { href: contact.social.facebook, label: ui.contact.facebook, Icon: FacebookIcon },
    contact.social.instagram && { href: contact.social.instagram, label: ui.contact.instagram, Icon: InstagramIcon },
    f.youtube && { href: f.youtube, label: 'YouTube', Icon: YoutubeIcon },
  ].filter(Boolean)
  const address = f.address || brand.location
  const note = f.note === 'none' ? '' : f.note || offerNote
  const copyright = (f.copyright || '© {year} {name}. All rights reserved.')
    .replace('{year}', new Date().getFullYear())
    .replace('{name}', brand.name)
  const heading = 'font-display text-lg font-semibold text-sun-400'
  const linkRow = 'inline-flex items-center gap-2 transition hover:text-sun-400'

  return (
    <footer className="on-dark bg-royal-950 pt-14 text-royal-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="#home" className="inline-block rounded-full" aria-label={`${brand.name} — ${ui.nav[0].label}`}>
            <Logo brand={brand} light />
          </a>
          {f.about ? (
            <p className="mt-4 max-w-xs text-royal-200">{f.about}</p>
          ) : (
            <>
              <p className="mt-4 max-w-xs text-royal-200">{brand.slogan}</p>
              <p className="mt-1 max-w-xs capitalize text-royal-300">{brand.tagline}</p>
            </>
          )}
        </div>

        {f.showQuickLinks !== false && (
          <nav aria-label={f.quickLinksHeading}>
            <h2 className={heading}>{f.quickLinksHeading}</h2>
            <ul className="mt-4 grid gap-2">
              {ui.nav.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="transition hover:text-sun-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div>
          <h2 className={heading}>{f.contactHeading}</h2>
          <ul className="mt-4 grid gap-2">
            {contact.footerPhones.map((phone) => (
              <li key={phone}>
                <a href={telHref(phone)} className={linkRow}>
                  <Phone className="size-4" aria-hidden="true" />
                  {phone}
                </a>
              </li>
            ))}
            {f.email && (
              <li>
                <a href={`mailto:${f.email}`} className={`${linkRow} break-all`}>
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {f.email}
                </a>
              </li>
            )}
            {address && (
              <li className="inline-flex items-start gap-2 text-royal-300">
                <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
                {address}
              </li>
            )}
          </ul>
        </div>

        {socials.length > 0 && (
          <div>
            <h2 className={heading}>{f.socialHeading}</h2>
            <ul className="mt-4 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-sun-500 hover:text-ink">
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-4 py-6 text-sm text-royal-300 sm:flex-row sm:px-6">
        <p className="text-center sm:text-left">
          {note && <span className="block font-semibold text-royal-100">{note}</span>}
          {copyright}
          {f.credits && <span className="mt-1 block text-xs text-royal-400">{f.credits}</span>}
        </p>
        <a href="#home" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold text-white transition hover:bg-sun-500 hover:text-ink">
          <ArrowUp className="size-4" aria-hidden="true" />
          {ui.cta.backToTop}
        </a>
      </div>
    </footer>
  )
}
