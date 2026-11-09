import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import { InstagramIcon } from '../components/Icons.jsx'
import Logo from '../components/Logo.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { useScrollSpy } from '../hooks/useScrollSpy.js'
import { ease } from '../lib/motion.js'

const navIds = ui.nav.map((link) => link.id)
const instagram = data.contact.social.instagram

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(navIds)
  const solid = scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = (id) =>
    `relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
      solid ? 'text-royal-900 hover:text-royal-500' : 'text-white/90 hover:text-white'
    } ${active === id ? (solid ? 'text-royal-500' : 'text-sun-400') : ''}`

  return (
    <header
      className={`fixed inset-x-0 top-1 z-50 transition-all duration-300 ${solid ? 'px-2 sm:px-4' : 'px-3 sm:px-6'}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-300 sm:px-5 ${
          solid ? 'glass shadow-soft' : 'on-dark border border-white/15 bg-royal-950/25 backdrop-blur-md'
        }`}
      >
        <a href="#home" aria-label={`${data.brand.name} — ${ui.nav[0].label}`} className="rounded-full">
          <Logo brand={data.brand} light={!solid} />
        </a>

        <nav aria-label={ui.menu.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {ui.nav.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={linkClass(link.id)} aria-current={active === link.id ? 'true' : undefined}>
                  {active === link.id && (
                    <m.span
                      layoutId="nav-active"
                      className={`absolute inset-0 -z-10 rounded-full ${solid ? 'bg-royal-50' : 'bg-white/15'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ui.menu.instagram}
              className={`hidden size-11 place-items-center rounded-full transition sm:grid ${solid ? 'text-royal-900 hover:bg-royal-50 hover:text-royal-500' : 'text-white hover:bg-white/10'}`}
            >
              <InstagramIcon className="size-5" />
            </a>
          )}
          <div className="hidden sm:block">
            <WhatsAppButton size="md" />
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.menu.close : ui.menu.open}
            className={`grid size-11 place-items-center rounded-full transition lg:hidden ${solid ? 'text-royal-900 hover:bg-royal-50' : 'text-white hover:bg-white/10'}`}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease }}
            className="glass mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl p-3 shadow-lift lg:hidden"
          >
            <nav aria-label={ui.menu.mainNav}>
              <ul className="grid gap-1">
                {ui.nav.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.id ? 'true' : undefined}
                      className={`block rounded-2xl px-4 py-3 font-semibold ${active === link.id ? 'bg-royal-500 text-white' : 'text-royal-900 hover:bg-royal-50'}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {instagram && (
                  <li>
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold text-royal-900 hover:bg-royal-50"
                    >
                      <InstagramIcon className="size-5" />
                      {ui.menu.instagram}
                    </a>
                  </li>
                )}
              </ul>
            </nav>
            <div className="mt-3 sm:hidden">
              <WhatsAppButton size="lg" magnetic={false} className="w-full" />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
