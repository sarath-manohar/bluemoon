// Rounded white card. `border` adds the animated gradient ring, `lift` the hover lift and shadow.
export default function Card({ border = false, lift = true, className = '', children, ...props }) {
  return (
    <div
      className={`relative rounded-3xl bg-white shadow-soft ${border ? 'gradient-border' : ''} ${
        lift ? 'transition duration-300 hover:-translate-y-1.5 hover:shadow-lift' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
