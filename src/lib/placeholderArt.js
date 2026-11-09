// Generates illustrative SVG scenes (sky, sun/moon, layered hills) used wherever a real photo has not been added yet.
const PALETTES = [
  { sky: ['#1e4fbf', '#6f9bf5'], light: '#ffd21f', hills: ['#2f63d4', '#1a43a3', '#0b1f4d'], cloud: '#ffffff' },
  { sky: ['#ff9a3c', '#ffd21f'], light: '#fff6c7', hills: ['#e0592a', '#a63a2b', '#5a1f3a'], cloud: '#fff1d6' },
  { sky: ['#7fb2ff', '#dce8ff'], light: '#ffe66d', hills: ['#3aa17e', '#23785f', '#14513f'], cloud: '#ffffff' },
  { sky: ['#07123a', '#1e4fbf'], light: '#e8f0ff', hills: ['#1a43a3', '#102a64', '#07123a'], cloud: '#93b3ff' },
  { sky: ['#e5322d', '#ffb347'], light: '#fff3b0', hills: ['#b3262f', '#7a1d3a', '#3b1235'], cloud: '#ffe9d6' },
  { sky: ['#5e88ee', '#bfd3ff'], light: '#ffd21f', hills: ['#2a8fb0', '#1c6a8a', '#0f4560'], cloud: '#ffffff' },
]

const hash = (text) => {
  let h = 2166136261
  for (const char of String(text)) h = Math.imul(h ^ char.charCodeAt(0), 16777619)
  return h >>> 0
}

// Small seeded PRNG so a given name always produces the same scene.
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const hillPath = (rand, w, h, top, bottom) => {
  const points = Array.from({ length: 7 }, (_, i) => [(i / 6) * w, h * (top + rand() * (bottom - top))])
  let d = `M${points[0][0]},${points[0][1].toFixed(1)}`
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i]
    const [nx, ny] = points[i + 1]
    d += ` Q${x.toFixed(1)},${y.toFixed(1)} ${((x + nx) / 2).toFixed(1)},${((y + ny) / 2).toFixed(1)}`
  }
  const last = points.at(-1)
  return `${d} L${last[0]},${last[1].toFixed(1)} L${w},${h} L0,${h} Z`
}

export function sceneSvg(seedText, w = 800, h = 600) {
  const seed = hash(seedText)
  const rand = rng(seed)
  const p = PALETTES[seed % PALETTES.length]
  const lightX = w * (0.2 + rand() * 0.6)
  const lightY = h * (0.2 + rand() * 0.15)
  const r = h * 0.085
  const cloud = (x, y, s) =>
    `<g fill="${p.cloud}" opacity=".55"><ellipse cx="${x}" cy="${y}" rx="${70 * s}" ry="${16 * s}"/><ellipse cx="${x + 30 * s}" cy="${y - 12 * s}" rx="${36 * s}" ry="${16 * s}"/></g>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset="1" stop-color="${p.sky[1]}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#s)"/>
<circle cx="${lightX}" cy="${lightY}" r="${r * 2.2}" fill="${p.light}" opacity=".22"/>
<circle cx="${lightX}" cy="${lightY}" r="${r}" fill="${p.light}"/>
${cloud(w * 0.18, h * 0.2, 1.1)}${cloud(w * 0.72, h * 0.34, 0.8)}${cloud(w * 0.45, h * 0.12, 0.6)}
<path d="${hillPath(rand, w, h, 0.45, 0.62)}" fill="${p.hills[0]}" opacity=".7"/>
<path d="${hillPath(rand, w, h, 0.58, 0.74)}" fill="${p.hills[1]}"/>
<path d="${hillPath(rand, w, h, 0.76, 0.88)}" fill="${p.hills[2]}"/>
</svg>`
}

export const sceneUri = (seedText, w, h) => `data:image/svg+xml;utf8,${encodeURIComponent(sceneSvg(seedText, w, h))}`
