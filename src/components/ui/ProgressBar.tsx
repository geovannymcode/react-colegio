interface ProgressBarProps {
  value: number
  color?: string
}

export function ProgressBar({ value, color = 'var(--color-lime-500)' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="h-2 w-full rounded-pill bg-navy-700">
      <div
        className="h-2 rounded-pill transition-all"
        style={{ width: `${clamped}%`, backgroundColor: color }}
      />
    </div>
  )
}
