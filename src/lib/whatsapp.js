import { site } from '../config/site.js'
import data from '../data/index.js'
import { ui } from '../data/content.js'

const digits = (value) => String(value).replace(/\D/g, '')

// Normalises "98765 43210", "+91 98765 43210" or "0474 2345678" to digits with the country code.
export function toInternational(phone) {
  const number = digits(phone).replace(/^0+/, '')
  return number.length > 10 ? number : site.countryCode + number
}

const whatsappNumber = site.whatsappNumber
  ? digits(site.whatsappNumber)
  : data.contact.phones[0]
    ? toInternational(data.contact.phones[0])
    : ''

export const telHref = (phone) => `tel:+${toInternational(phone)}`

export const whatsappHref = (message = ui.whatsapp.general) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

export const destinationMessage = (destination) => ui.whatsapp.destination.replace('{destination}', destination)
export const serviceMessage = (service) => ui.whatsapp.service.replace('{service}', service)

export function enquiryMessage(values) {
  const { labels } = ui.form
  const lines = Object.entries(labels)
    .filter(([key]) => values[key]?.trim())
    .map(([key, label]) => `${label}: ${values[key].trim()}`)
  return [ui.whatsapp.general, '', ...lines].join('\n')
}
