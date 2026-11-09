import { useMemo } from 'react'
import { destinationPhoto } from '../lib/assets.js'
import { sceneUri } from '../lib/placeholderArt.js'

// Uses src/assets/destinations/<slug>.jpg when it exists, otherwise a generated illustrative scene.
// Decorative: the destination name is always shown as text beside it.
export default function DestinationImage({ name, width = 800, height = 600, className = '' }) {
  const src = useMemo(() => destinationPhoto(name) ?? sceneUri(name, width, height), [name, width, height])
  return <img src={src} alt="" width={width} height={height} loading="lazy" decoding="async" className={`object-cover ${className}`} />
}
