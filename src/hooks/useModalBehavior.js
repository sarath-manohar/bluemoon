import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Shared dialog behaviour: Esc to close, Tab focus trap, background made inert, scroll lock, focus restored on close.
export function useModalBehavior(panelRef, onClose) {
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    const panel = panelRef.current
    const root = document.getElementById('root')
    const previouslyFocused = document.activeElement
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    const { overflow, paddingRight } = document.body.style
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    if (root) root.inert = true

    const focusable = () => [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
    ;(focusable()[0] ?? panel).focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusable()
      if (!items.length) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      if (root) root.inert = false
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [panelRef])
}
