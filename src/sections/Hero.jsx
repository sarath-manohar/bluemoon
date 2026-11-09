import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Phone } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import Bus from '../components/Bus.jsx'
import Button from '../components/Button.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { telHref } from '../lib/whatsapp.js'
import { ease } from '../lib/motion.js'

const PINS = [
  { className: 'left-[7%] top-[26%]', size: 'size-9', delay: '0s', rotate: '-12deg' },
  { className: 'right-[9%] top-[44%] hidden sm:block', size: 'size-11', delay: '1.2s', rotate: '10deg' },
  { className: 'left-[16%] bottom-[34%] hidden md:block', size: 'size-8', delay: '2.1s', rotate: '-6deg' },
  { className: 'right-[24%] top-[20%] hidden lg:block', size: 'size-8', delay: '0.6s', rotate: '14deg' },
]
const CLOUDS = [
  { top: '16%', scale: 1, duration: '75s', delay: '-20s', opacity: 0.16 },
  { top: '34%', scale: 0.7, duration: '95s', delay: '-60s', opacity: 0.12 },
  { top: '58%', scale: 1.2, duration: '120s', delay: '-35s', opacity: 0.1 },
]

const Cloud = () => (
  <svg viewBox="0 0 200 70" className="w-56" fill="currentColor" aria-hidden="true">
    <path d="M40 62a28 28 0 0 1-2-55 36 36 0 0 1 66-6 30 30 0 0 1 48 18 24 24 0 0 1 6 43z" />
  </svg>
)

function Stamp({ since, location }) {
  const label = `${ui.hero.since} ${since} • ${location} • `
  return (
    <div className="relative hidden size-36 lg:block xl:size-40" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="stamp-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontFamily="'Fredoka Variable', sans-serif" fontWeight="600" fontSize="18" fill="#ffdd45">
          <textPath href="#stamp-circle" textLength="486" lengthAdjust="spacing">
            {label.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] grid place-items-center rounded-full bg-sun-500 text-center font-display text-ink shadow-glow">
        <span className="leading-none">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-widest">{ui.hero.since}</span>
          <span className="block text-2xl font-bold">{since}</span>
        </span>
      </div>
    </div>
  )
}

export default function Hero({ ready }) {
  const { brand } = data
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  // Parallax layers and the bus: all driven by page scroll, all static for reduced motion.
  const moonY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 180])
  const contentY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 90])
  const busX = useTransform(scrollY, [0, 1100], reduce ? ['12vw', '12vw'] : ['6vw', '108vw'])
  const wheelRotate = useTransform(scrollY, [0, 1100], [0, reduce ? 0 : 1800])
  const words = brand.slogan.split(' ')
  const highlightFrom = Math.max(words.length - 2, 0)
  const firstPhone = data.contact.phones[0]

  return (
    <section id="home" aria-labelledby="hero-title" className="on-dark hero-bg relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white">
      {/* Decorative background: blobs, moon, stars, clouds, pins */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 size-[26rem] animate-blob rounded-full bg-royal-400/30 blur-3xl" />
        <div className="absolute -right-20 top-1/3 size-[30rem] animate-blob rounded-full bg-sun-500/15 blur-3xl [animation-delay:-8s]" />
        <div className="absolute bottom-0 left-1/3 size-[24rem] animate-blob rounded-full bg-royal-300/20 blur-3xl [animation-delay:-14s]" />

        <m.div style={{ y: moonY }} className="absolute right-[-4rem] top-24 sm:right-[6%] sm:top-28">
          <div className="relative size-40 rounded-full bg-[radial-gradient(circle_at_32%_30%,#fff,#dce8ff_45%,#93b3ff)] shadow-[0_0_90px_20px_rgb(147_179_255/0.35)] sm:size-56 lg:size-72">
            <span className="absolute left-[24%] top-[30%] size-[14%] rounded-full bg-royal-300/40" />
            <span className="absolute left-[52%] top-[54%] size-[20%] rounded-full bg-royal-300/30" />
            <span className="absolute left-[36%] top-[66%] size-[9%] rounded-full bg-royal-300/35" />
          </div>
        </m.div>

        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className="absolute size-1 animate-twinkle rounded-full bg-white"
            style={{ left: `${(i * 37 + 11) % 97}%`, top: `${(i * 23 + 7) % 60}%`, animationDelay: `${(i % 6) * 0.55}s` }}
          />
        ))}

        {CLOUDS.map((cloud, i) => (
          <div key={i} className="absolute left-0 animate-drift text-white" style={{ top: cloud.top, opacity: cloud.opacity, animationDuration: cloud.duration, animationDelay: cloud.delay }}>
            <div style={{ transform: `scale(${cloud.scale})`, transformOrigin: 'left center' }}>
              <Cloud />
            </div>
          </div>
        ))}

        {PINS.map((pin, i) => (
          <span
            key={i}
            className={`absolute grid animate-float place-items-center rounded-full bg-white/95 shadow-lift ${pin.size} ${pin.className}`}
            style={{ animationDelay: pin.delay, '--r': pin.rotate }}
          >
            <MapPin className="size-[60%] fill-pin/20 text-pin" />
          </span>
        ))}
      </div>

      <m.div style={{ y: contentY }} className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-48 pt-32 text-center sm:px-8 sm:pb-56 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-4xl">
          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="glass-dark mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-sun-300 lg:mx-0"
          >
            <span className="size-2 animate-pulse rounded-full bg-sun-500" />
            {ui.hero.since} {brand.since} · {brand.location}
          </m.p>

          <h1 id="hero-title" className="font-display text-[2.6rem] font-bold leading-[1.04] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <m.span
                  initial={{ y: '110%' }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 0.75, ease, delay: 0.1 + i * 0.07 }}
                  className={`inline-block ${i >= highlightFrom ? 'text-gradient-sun' : ''}`}
                >
                  {word}
                  {i < words.length - 1 && ' '}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
            className="mt-5 text-lg font-medium capitalize text-royal-100 sm:text-2xl"
          >
            {brand.tagline}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.95 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start"
          >
            <WhatsAppButton size="lg" />
            {firstPhone && (
              <Button href={telHref(firstPhone)} variant="glass" size="lg" leading={<Phone className="size-5" aria-hidden="true" />}>
                {ui.cta.call}
              </Button>
            )}
          </m.div>
        </div>

        <m.div initial={{ opacity: 0, scale: 0.6, rotate: -30 }} animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}} transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 1 }}>
          <Stamp since={brand.since} location={brand.location} />
        </m.div>
      </m.div>

      {/* Road, driving bus and animated waves */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-44 sm:h-52">
        <m.div style={{ x: busX }} className="absolute bottom-[3.3rem] left-0 w-32 sm:bottom-[4.2rem] sm:w-48 lg:w-56">
          <Bus label={brand.shortName} wheelRotate={wheelRotate} className="animate-bob w-full" />
        </m.div>
        <div className="absolute inset-x-0 bottom-[3rem] h-3 bg-royal-950/70 sm:bottom-[3.6rem]">
          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#ffd21f_0_28px,transparent_28px_56px)] opacity-80" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 overflow-hidden text-royal-200/40 sm:h-20">
          <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="h-full w-[200%] animate-wave" fill="currentColor">
            <path d="M0,70 Q180,10 360,70 T720,70 T1080,70 T1440,70 T1800,70 T2160,70 T2520,70 T2880,70 L2880,120 L0,120 Z" />
          </svg>
        </div>
      </div>
      <WaveDivider className="z-10 text-mist" />
    </section>
  )
}
