import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { Chip } from '../../components/ui/Chip'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { useGoals } from '../../features/goals/useGoals'
import { toPercent } from '../../features/goals/progress'
import { CATEGORY_COLOR, CATEGORY_LABEL } from '../../lib/category'
import type { Category } from '../../types/domain'

const CATEGORIES: Category[] = ['ACADEMICA', 'PERSONAL', 'HABITO', 'PROFESIONAL']

export function GoalsList() {
  const { data: goals } = useGoals()
  const [filter, setFilter] = useState<Category | 'TODAS'>('TODAS')

  const filtered = (goals ?? []).filter(
    (goal) => filter === 'TODAS' || goal.category === filter,
  )

  return (
    <div className="flex flex-col gap-6 px-5 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Mis metas</h1>
        <Link
          to="/app/metas/nueva"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-500 text-navy-900"
          aria-label="Nueva meta"
        >
          <Plus size={20} />
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip active={filter === 'TODAS'} onClick={() => setFilter('TODAS')}>
          Todas
        </Chip>
        {CATEGORIES.map((category) => (
          <Chip
            key={category}
            active={filter === category}
            dotColor={CATEGORY_COLOR[category]}
            onClick={() => setFilter(category)}
          >
            {CATEGORY_LABEL[category]}
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-3 pb-8">
        {filtered.length === 0 && (
          <p className="text-body text-content-muted">No hay metas en esta categoría todavía.</p>
        )}
        {filtered.map((goal) => {
          const progress = toPercent(goal.progress)
          return (
            <Link key={goal.id} to={`/app/metas/${goal.id}`}>
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-caption text-content-secondary">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLOR[goal.category] }}
                    />
                    {CATEGORY_LABEL[goal.category]}
                  </div>
                  {goal.status !== 'ACTIVA' && (
                    <span className="text-caption text-content-muted">
                      {goal.status === 'COMPLETADA' ? 'Completada' : 'Archivada'}
                    </span>
                  )}
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
    </div>
  )
}
