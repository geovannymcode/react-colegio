import { Check } from 'lucide-react'
import type { TaskStatus } from '../../types/domain'

interface TaskRowProps {
  title: string
  status: TaskStatus
  meta?: string
  onStatusChange: (next: TaskStatus) => void
}

const STATUS_LABEL: Record<TaskStatus, string> = {
  PENDIENTE: 'Pendiente',
  EN_PROGRESO: 'En progreso',
  COMPLETADA: 'Completada',
}

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  PENDIENTE: 'EN_PROGRESO',
  EN_PROGRESO: 'COMPLETADA',
  COMPLETADA: 'PENDIENTE',
}

export function TaskRow({ title, status, meta, onStatusChange }: TaskRowProps) {
  const isCompleted = status === 'COMPLETADA'
  const isInProgress = status === 'EN_PROGRESO'

  return (
    <div className="flex items-center gap-3 py-2.5">
      <button
        type="button"
        aria-label={`Marcar tarea como ${STATUS_LABEL[NEXT_STATUS[status]].toLowerCase()}`}
        onClick={() => onStatusChange(NEXT_STATUS[status])}
        className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] border transition-colors ${
          isCompleted
            ? 'border-lime-500 bg-lime-500'
            : isInProgress
              ? 'border-state-warning'
              : 'border-navy-700'
        }`}
      >
        {isCompleted && <Check size={14} className="text-navy-900" strokeWidth={3} />}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-body-strong ${isCompleted ? 'text-content-muted line-through' : 'text-content-primary'}`}
        >
          {title}
        </p>
        <p
          className={`text-caption ${isInProgress ? 'text-state-warning' : 'text-content-muted'}`}
        >
          {STATUS_LABEL[status]}
          {meta ? ` · ${meta}` : ''}
        </p>
      </div>
    </div>
  )
}
