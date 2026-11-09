const tones = {
  blue: 'bg-royal-50 text-royal-700 ring-royal-100',
  sun: 'bg-sun-100 text-ink ring-sun-300',
  white: 'bg-white text-royal-800 ring-royal-100',
}

const sizes = { sm: 'px-3 py-1 text-xs sm:text-sm', lg: 'px-4 py-2 text-sm sm:text-base' }

export default function Chip({ tone = 'blue', size = 'sm', icon: Icon, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ring-1 ring-inset ${sizes[size]} ${tones[tone]} ${className}`}
    >
      {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  )
}
