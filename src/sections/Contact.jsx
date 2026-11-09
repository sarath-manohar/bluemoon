import { m } from 'framer-motion'
import { Phone, Send } from 'lucide-react'
import data from '../data/index.js'
import { ui } from '../data/content.js'
import { FacebookIcon, InstagramIcon } from '../components/Icons.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import Button from '../components/Button.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx'
import { enquiryMessage, telHref, whatsappHref } from '../lib/whatsapp.js'

const fieldClass = 'w-full rounded-2xl border-2 border-royal-100 bg-white px-4 py-3 font-medium text-ink transition placeholder:text-slate-500 focus:border-royal-500 focus:outline-hidden focus:ring-4 focus:ring-royal-500/20'

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-royal-900">
        {label}
      </label>
      {children}
    </div>
  )
}

function EnquiryForm() {
  const { labels } = ui.form

  // No backend: the values are folded into a WhatsApp message and the chat opens in a new tab.
  const onSubmit = (event) => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    window.open(whatsappHref(enquiryMessage(values)), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-5 text-ink shadow-lift sm:p-8">
      <h3 className="font-display text-2xl font-semibold text-royal-900">{ui.form.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{ui.form.hint}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="enq-name" label={labels.name}>
          <input id="enq-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field id="enq-phone" label={labels.phone}>
          <input id="enq-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={fieldClass} />
        </Field>
        <Field id="enq-tour" label={labels.tourType}>
          <select id="enq-tour" name="tourType" defaultValue="" className={fieldClass}>
            <option value="">{ui.form.choose}</option>
            {data.services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>
        <Field id="enq-destination" label={labels.destination}>
          <select id="enq-destination" name="destination" defaultValue="" className={fieldClass}>
            <option value="">{ui.form.choose}</option>
            <option value={ui.form.notSure}>{ui.form.notSure}</option>
            {data.destinations.map((destination) => (
              <option key={destination.id} value={destination.name}>
                {destination.name}
              </option>
            ))}
          </select>
        </Field>
        <Field id="enq-travellers" label={labels.travellers}>
          <input id="enq-travellers" name="travellers" type="number" min="1" inputMode="numeric" className={fieldClass} />
        </Field>
        <Field id="enq-date" label={labels.date}>
          <input id="enq-date" name="date" type="date" className={fieldClass} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="enq-message" label={labels.message}>
            <textarea id="enq-message" name="message" rows={3} className={`${fieldClass} resize-y`} />
          </Field>
        </div>
      </div>

      <Button type="submit" variant="blue" size="lg" className="mt-6 w-full" leading={<Send className="size-5" aria-hidden="true" />}>
        {ui.form.submit}
      </Button>
    </form>
  )
}

export default function Contact() {
  const { phones, social } = data.contact
  const socials = [
    social.facebook && { href: social.facebook, label: ui.contact.facebook, Icon: FacebookIcon },
    social.instagram && { href: social.instagram, label: ui.contact.instagram, Icon: InstagramIcon },
  ].filter(Boolean)

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark contact-bg relative isolate scroll-mt-20 overflow-hidden pb-28 pt-24 text-white sm:pb-40 sm:pt-32">
      <WaveDivider top className="text-mist" />
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-20 top-1/4 size-[26rem] animate-blob rounded-full bg-sun-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 size-[28rem] animate-blob rounded-full bg-royal-300/25 blur-3xl [animation-delay:-9s]" />
      </div>

      <SectionHeading id="contact-title" dark pill={ui.sections.contact.pill} lead={ui.sections.contact.lead} />

      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="font-display text-4xl font-bold leading-tight sm:text-5xl">{ui.sections.contact.title}</p>
          </Reveal>

          {phones.length > 0 && (
            <Stagger as="ul" gap={0.1} className="mt-8 grid gap-3">
              {phones.map((phone) => (
                <StaggerItem as="li" key={phone}>
                  <a href={telHref(phone)} className="glass-dark group flex items-center gap-4 rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sun-500 text-ink transition duration-300 group-hover:rotate-12">
                      <Phone className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-royal-200">{ui.contact.callUs}</span>
                      <span className="block font-display text-2xl font-semibold">{phone}</span>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <Reveal delay={0.2} className="mt-6 flex flex-wrap items-center gap-4">
            <WhatsAppButton size="lg">{ui.contact.whatsappCta}</WhatsAppButton>
          </Reveal>

          {socials.length > 0 && (
            <Reveal delay={0.3} className="mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-royal-200">{ui.contact.follow}</p>
              <ul className="flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <m.a whileHover={{ y: -4, rotate: -6 }} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="glass-dark grid size-12 place-items-center rounded-full transition hover:bg-sun-500 hover:text-ink">
                      <Icon className="size-5" />
                    </m.a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1}>
          <EnquiryForm />
        </Reveal>
      </div>
      <WaveDivider className="text-royal-950" />
    </section>
  )
}
