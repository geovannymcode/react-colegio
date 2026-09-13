import type { GoalSummary, Task } from '../../types/domain'

/**
 * El servidor manda `progress`/`tasksTotal`/`tasksCompleted` ya calculados
 * (01-SPEC.md §6.1) — esto NO se usa para mostrar progreso, solo para el
 * update optimista al marcar una tarea, antes de reconciliar con la respuesta
 * real del servidor.
 */
export function computeOptimisticProgress(tasks: Task[]) {
  const tasksTotal = tasks.length
  const tasksCompleted = tasks.filter((task) => task.status === 'COMPLETADA').length
  const progress = tasksTotal === 0 ? 0 : tasksCompleted / tasksTotal
  return { progress, tasksTotal, tasksCompleted }
}

export function toPercent(progress: number): number {
  return Math.round(progress * 100)
}

export function isReadyToEvaluate(goal: GoalSummary): boolean {
  return goal.status === 'ACTIVA' && goal.progress === 1 && !goal.hasEvaluation
}
