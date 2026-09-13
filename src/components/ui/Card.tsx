import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-navy-700 bg-navy-800 p-4 ${className}`}
      {...props}
    />
  )
}
