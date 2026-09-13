import { Card } from '../../components/ui/Card'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { StatCard } from '../../components/ui/StatCard'
import { toPercent } from '../../features/goals/progress'
import { useStats } from '../../features/stats/useStats'
import { CATEGORY_COLOR, CATEGORY_LABEL } from '../../lib/category'

export function Progress() {
  const { data: stats } = useStats()

  const maxWeekday = Math.max(1, ...(stats?.tasksByWeekday.map((day) => day.count) ?? [1]))

  return (
    <div className="flex flex-col gap-6 px-5 pt-4 pb-8">
      <h1 className="text-h1">Mis avances</h1>

      <div className="grid grid-cols-2 gap-3">
        <StatCard value={stats?.tasksCompleted ?? 0} label="Tareas completadas" />
        <StatCard value={stats?.activeGoals ?? 0} label="Metas activas" />
        <StatCard value={stats?.streakCount ?? 0} label="Días de racha" />
        <StatCard value={`${stats ? toPercent(stats.overallProgress) : 0}%`} label="Progreso general" />
      </div>

      <section>
        <h2 className="text-h2">Tareas por día</h2>
        <Card className="mt-3">
          <div className="flex h-32 items-end justify-between gap-2">
            {(stats?.tasksByWeekday ?? []).map((day) => {
              const heightPercent = (day.count / maxWeekday) * 100
              return (
                <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-24 w-full items-end">
                    <div
                      className="w-full rounded-sm bg-lime-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-caption text-content-muted">{day.weekday}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-h2">Por categoría</h2>
        <Card className="mt-3 flex flex-col gap-4">
          {(stats?.progressByCategory ?? []).map((entry) => (
            <div key={entry.category}>
              <div className="mb-1.5 flex items-center justify-between text-caption">
                <span className="text-content-secondary">{CATEGORY_LABEL[entry.category]}</span>
                <span className="text-content-secondary">{toPercent(entry.progress)}%</span>
              </div>
              <ProgressBar value={toPercent(entry.progress)} color={CATEGORY_COLOR[entry.category]} />
            </div>
          ))}
        </Card>
      </section>
    </div>
  )
}
