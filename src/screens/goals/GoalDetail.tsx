import { ChevronLeft, Lightbulb } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { TaskRow } from '../../components/ui/TaskRow'
import { useGoal } from '../../features/goals/useGoals'
import { isReadyToEvaluate, toPercent } from '../../features/goals/progress'
import { useUpdateTaskStatus } from '../../features/tasks/useUpdateTaskStatus'
import { CATEGORY_COLOR, CATEGORY_LABEL, PRIORITY_LABEL } from '../../lib/category'

export function GoalDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: goal, isLoading } = useGoal(id!)
  const updateTaskStatus = useUpdateTaskStatus()

  if (isLoading || !goal) {
    return <p className="px-5 pt-4 text-body text-content-muted">Cargando...</p>
  }

  const progress = toPercent(goal.progress)
  const readyToEvaluate = isReadyToEvaluate(goal)

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      <Link to="/app/metas" className="flex items-center gap-1 text-caption text-content-secondary">
        <ChevronLeft size={16} /> Volver
      </Link>

      <div>
        <div className="flex items-center gap-1.5 text-caption text-content-secondary">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: CATEGORY_COLOR[goal.category] }}
          />
          {CATEGORY_LABEL[goal.category]}
        </div>
        <h1 className="mt-1 text-h1">{goal.title}</h1>
        <p className="mt-1 text-body text-content-secondary">
          {PRIORITY_LABEL[goal.priority]}
          {goal.dueDate ? ` · Vence ${new Date(goal.dueDate).toLocaleDateString('es-CO')}` : ''}
        </p>
      </div>

      <Card>
        <div className="flex items-center justify-between text-caption text-content-secondary">
          <span>
            {goal.tasksCompleted} de {goal.tasksTotal} tareas completadas
          </span>
          <span className="text-lime-500">{progress}%</span>
        </div>
        <div className="mt-3">
          <ProgressBar value={progress} color={CATEGORY_COLOR[goal.category]} />
        </div>
      </Card>

      {readyToEvaluate && (
        <Card className="flex items-center gap-3 border-lime-500">
          <Lightbulb size={20} className="text-lime-500" />
          <div className="flex-1">
            <p className="text-body-strong">Terminaste esta meta.</p>
            <p className="text-caption text-content-secondary">Es momento de evaluarla.</p>
          </div>
        </Card>
      )}

      {goal.evaluation && (
        <Card>
          <p className="text-body-strong">Ya evaluaste esta meta</p>
          <p className="mt-1 text-caption text-content-secondary">
            Calificación: {goal.evaluation.rating} / 5
          </p>
        </Card>
      )}

      <section>
        <h2 className="text-h2">Tareas</h2>
        <Card className="mt-3">
          <div className="divide-y divide-navy-700">
            {goal.tasks.map((task) => (
              <TaskRow
                key={task.id}
                title={task.title}
                status={task.status}
                meta={
                  task.dueDate ? `Vence ${new Date(task.dueDate).toLocaleDateString('es-CO')}` : undefined
                }
                onStatusChange={(status) =>
                  updateTaskStatus.mutate({ id: task.id, goalId: goal.id, status })
                }
              />
            ))}
          </div>
        </Card>
      </section>

      <Button disabled={!readyToEvaluate} onClick={() => navigate(`/app/metas/${goal.id}/evaluar`)}>
        Evaluar esta meta
      </Button>
    </div>
  )
}
