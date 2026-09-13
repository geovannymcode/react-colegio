import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = true,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'rounded-md py-4 text-body-strong transition-colors disabled:opacity-50'
  const variants = {
    primary: 'bg-lime-500 text-navy-900 hover:bg-lime-400',
    ghost: 'border border-navy-700 text-content-primary hover:bg-navy-800',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    />
  )
}
