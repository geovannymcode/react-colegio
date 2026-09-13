import type { ButtonHTMLAttributes } from 'react'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  dotColor?: string
}

export function Chip({ active = false, dotColor, className = '', children, ...props }: ChipProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-caption font-semibold transition-colors ${
        active ? 'bg-lime-500 text-navy-900' : 'bg-navy-700 text-content-secondary'
      } ${className}`}
      {...props}
    >
      {dotColor && (
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dotColor }} />
      )}
      {children}
    </button>
  )
}
