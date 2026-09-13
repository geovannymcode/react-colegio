import { Card } from './Card'

interface StatCardProps {
  value: string | number
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-1">
      <span className="text-stat text-content-primary">{value}</span>
      <span className="text-caption text-content-secondary">{label}</span>
    </Card>
  )
}
