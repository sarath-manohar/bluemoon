import { useCallback, useState } from 'react'
import { AnimatePresence, LazyMotion, MotionConfig } from 'framer-motion'
import data from './data/index.js'
import { ui } from './data/content.js'
import CursorGlow from './components/CursorGlow.jsx'
import Intro from './components/Intro.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Contact from './sections/Contact.jsx'
import Destinations from './sections/Destinations.jsx'
import Food from './sections/Food.jsx'
import Footer from './sections/Footer.jsx'
import Gallery from './sections/Gallery.jsx'
import Hero from './sections/Hero.jsx'
import Inclusions from './sections/Inclusions.jsx'
import Navbar from './sections/Navbar.jsx'
import Services from './sections/Services.jsx'
import Stats from './sections/Stats.jsx'
import StayTravel from './sections/StayTravel.jsx'

const loadFeatures = () => import('./lib/motionFeatures.js').then((module) => module.default)

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <AnimatePresence>{!introDone && <Intro brand={data.brand} skipLabel={ui.intro.skip} onDone={finishIntro} />}</AnimatePresence>
        <a href="#main" className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-full bg-sun-500 px-5 py-2.5 font-bold text-ink shadow-lift transition focus:translate-y-0">
          {ui.skipToContent}
        </a>
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main id="main">
          <Hero ready={introDone} />
          <Stats />
          <Services />
          <Destinations />
          <Food />
          <Inclusions />
          <StayTravel />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </LazyMotion>
    </MotionConfig>
  )
}
