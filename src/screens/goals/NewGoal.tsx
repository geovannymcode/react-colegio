import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Chip } from '../../components/ui/Chip'
import { Input } from '../../components/ui/Input'
import { useCreateGoal } from '../../features/goals/useGoals'
import { useTaskSuggestions } from '../../features/goals/useTaskSuggestions'
import { ApiError } from '../../lib/api-client'
import { CATEGORY_COLOR, CATEGORY_LABEL, PRIORITY_COLOR, PRIORITY_LABEL } from '../../lib/category'
import type { Category, Priority } from '../../types/domain'

const CATEGORIES: Category[] = ['ACADEMICA', 'PERSONAL', 'HABITO', 'PROFESIONAL']
const PRIORITIES: Priority[] = ['ALTA', 'MEDIA', 'BAJA']

interface DraftTask {
  id: string
  title: string
}

export function NewGoal() {
  const navigate = useNavigate()
  const createGoal = useCreateGoal()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('ACADEMICA')
  const [priority, setPriority] = useState<Priority>('MEDIA')
  const [dueDate, setDueDate] = useState('')
  const [tasks, setTasks] = useState<DraftTask[]>([])
  const [error, setError] = useState<string | null>(null)

  const { data: suggestions } = useTaskSuggestions(title)
  const availableSuggestions = (suggestions?.tasks ?? []).filter(
    (suggestionTitle) => !tasks.some((task) => task.title === suggestionTitle),
  )

  function addTask(taskTitle: string) {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title: taskTitle }])
  }

  function updateTask(id: string, taskTitle: string) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, title: taskTitle } : task)))
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  async function handleSubmit() {
    if (!title.trim()) return
    setError(null)
    try {
      const goal = await createGoal.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        dueDate: dueDate || undefined,
        tasks: tasks.map((task) => task.title).filter(Boolean),
      })
      navigate(`/app/metas/${goal.id}`)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Revisa tu conexión e intenta de nuevo.')
    }
  }

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      <h1 className="text-h1">Nueva meta</h1>

      <Input
        label="Nombre de la meta"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Subir promedio a 4.5"
      />

      <div className="flex flex-col gap-2">
        <label className="text-label text-content-secondary">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Organizar mejor mis horas de estudio y entregar las tareas a tiempo."
          className="rounded-[12px] border border-navy-700 bg-navy-800 px-4 py-3.5 text-body text-content-primary placeholder:text-content-muted focus:border-lime-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="text-label text-content-secondary">Categoría</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.map((value) => (
            <Chip
              key={value}
              active={category === value}
              dotColor={CATEGORY_COLOR[value]}
              onClick={() => setCategory(value)}
            >
              {CATEGORY_LABEL[value]}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <label className="text-label text-content-secondary">Prioridad</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRIORITIES.map((value) => (
            <Chip
              key={value}
              active={priority === value}
              dotColor={PRIORITY_COLOR[value]}
              onClick={() => setPriority(value)}
            >
              {PRIORITY_LABEL[value]}
            </Chip>
          ))}
        </div>
      </div>

      <Input
        label="Fecha límite"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {availableSuggestions.length > 0 && (
        <Card className="border-lime-500/40">
          <p className="text-body-strong">Sugerencias</p>
          <p className="mt-1 text-caption text-content-secondary">
            Toca una para agregarla a tu lista. Luego puedes editarla o quitarla.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {availableSuggestions.map((suggestionTitle) => (
              <Chip key={suggestionTitle} onClick={() => addTask(suggestionTitle)}>
                <Plus size={12} /> {suggestionTitle}
              </Chip>
            ))}
          </div>
        </Card>
      )}

      <div>
        <div className="flex items-center justify-between">
          <label className="text-label text-content-secondary">Tareas</label>
          <button
            type="button"
            onClick={() => addTask('')}
            className="flex items-center gap-1 text-caption text-lime-500"
          >
            <Plus size={14} /> Nueva tarea
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-2">
              <input
                value={task.title}
                onChange={(e) => updateTask(task.id, e.target.value)}
                placeholder="Título de la tarea"
                className="flex-1 rounded-[12px] border border-navy-700 bg-navy-800 px-4 py-3 text-body text-content-primary placeholder:text-content-muted focus:border-lime-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeTask(task.id)}
                aria-label="Quitar tarea"
                className="text-content-muted"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-caption text-state-danger">{error}</p>}

      <Button onClick={handleSubmit} disabled={!title.trim() || createGoal.isPending}>
        Crear meta
      </Button>
    </div>
  )
}
