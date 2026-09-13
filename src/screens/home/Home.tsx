import { Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { useMe } from '../../features/auth/useAuth'
import { useGoals } from '../../features/goals/useGoals'
import { toPercent } from '../../features/goals/progress'
import { useStats } from '../../features/stats/useStats'
import { CATEGORY_COLOR, CATEGORY_LABEL } from '../../lib/category'

export function Home() {
  const { data: user } = useMe()
  const { data: goals } = useGoals()
  const { data: stats } = useStats()

  const activeGoals = goals?.filter((goal) => goal.status === 'ACTIVA') ?? []
  const overallProgress = stats ? toPercent(stats.overallProgress) : 0

  return (
    <div className="flex flex-col gap-6 px-5 pt-4">
      <div>
        <h1 className="text-h1">Hola, {user?.nickname ?? '...'}</h1>
        {user && user.streakCount > 0 && (
          <p className="mt-1 flex items-center gap-1.5 text-body text-content-secondary">
            <Flame size={16} className="text-state-warning" />
            Llevas {user.streakCount} días seguidos completando tareas
          </p>
        )}
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <span className="text-h2">Progreso general</span>
          <span className="text-h2 text-lime-500">{overallProgress}%</span>
        </div>
        <div className="mt-3">
          <ProgressBar value={overallProgress} />
        </div>
      </Card>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-h2">Metas activas</h2>
          <Link to="/app/metas" className="text-caption text-lime-500">
            Ver todas
          </Link>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {activeGoals.length === 0 && (
            <p className="text-body text-content-muted">Todavía no tienes metas activas.</p>
          )}
          {activeGoals.slice(0, 4).map((goal) => {
            const progress = toPercent(goal.progress)
            return (
              <Link key={goal.id} to={`/app/metas/${goal.id}`}>
                <Card>
                  <div className="flex items-center gap-1.5 text-caption text-content-secondary">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLOR[goal.category] }}
                    />
                    {CATEGORY_LABEL[goal.category]}
                  </div>
                  <p className="mt-1 text-body-strong">{goal.title}</p>
                  <p className="mt-0.5 text-caption text-content-muted">
                    {goal.tasksCompleted} de {goal.tasksTotal} tareas
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar value={progress} color={CATEGORY_COLOR[goal.category]} />
                    <span className="text-caption text-content-secondary">{progress}%</span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
