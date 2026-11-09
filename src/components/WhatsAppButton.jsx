import { MessageCircle } from 'lucide-react'
import Button from './Button.jsx'
import { whatsappHref } from '../lib/whatsapp.js'
import { ui } from '../data/content.js'

export default function WhatsAppButton({ message, children = ui.cta.whatsapp, ...props }) {
  return (
    <Button
      href={whatsappHref(message)}
      external
      leading={
        <span className="grid size-6 place-items-center rounded-full bg-[#25d366] text-white">
          <MessageCircle className="size-3.5" aria-hidden="true" />
        </span>
      }
      {...props}
    >
      {children}
    </Button>
  )
}
