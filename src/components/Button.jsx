import Magnetic from './Magnetic.jsx'

const variants = {
  primary: 'bg-sun-500 text-ink shadow-glow hover:bg-sun-400',
  blue: 'bg-royal-500 text-white shadow-lift hover:bg-royal-600',
  glass: 'border border-white/35 bg-white/10 text-white backdrop-blur hover:bg-white/20',
}
const sizes = { md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' }

// Renders an <a> when given `href`, otherwise a <button>. Wrapped in <Magnetic> unless `magnetic={false}`.
export default function Button({ href, external = false, variant = 'primary', size = 'md', magnetic = true, leading, className = '', children, ...props }) {
  const classes = `group inline-flex items-center justify-center gap-2.5 rounded-full font-bold transition duration-200 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`
  const element = href ? (
    <a href={href} className={classes} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} {...props}>
      {leading}
      {children}
    </a>
  ) : (
    <button type="button" className={classes} {...props}>
      {leading}
      {children}
    </button>
  )
  return magnetic ? <Magnetic>{element}</Magnetic> : element
}
