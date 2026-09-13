import { Trophy } from 'lucide-react'

interface AchievementRowProps {
  title: string
  description: string
  unlocked: boolean
}

export function AchievementRow({ title, description, unlocked }: AchievementRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          unlocked ? 'bg-lime-500 text-navy-900' : 'bg-navy-700 text-content-muted'
        }`}
      >
        <Trophy size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-body-strong ${unlocked ? 'text-content-primary' : 'text-content-muted'}`}>
          {title}
        </p>
        <p className="text-caption text-content-muted">{description}</p>
      </div>
    </div>
  )
}
