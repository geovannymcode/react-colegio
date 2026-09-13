import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-label text-content-secondary">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`rounded-[12px] border border-navy-700 bg-navy-800 px-4 py-3.5 text-body text-content-primary placeholder:text-content-muted focus:border-lime-500 focus:outline-none ${className}`}
          {...props}
        />
        {error && <span className="text-caption text-state-danger">{error}</span>}
      </div>
    )
  },
)
Input.displayName = 'Input'
