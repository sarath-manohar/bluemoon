import { useSyncExternalStore } from 'react'

// True on devices with a real hover-capable pointer (desktop). Used to skip cursor-driven effects on touch.
const query = '(hover: hover) and (pointer: fine)'
const subscribe = (callback) => {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

export const useFinePointer = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
