import { useState } from 'react'
import { Star, ChevronLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useGoal } from '../../features/goals/useGoals'
import { useSubmitEvaluation } from '../../features/evaluation/useSubmitEvaluation'
import { ApiError } from '../../lib/api-client'

export function Evaluation() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: goal } = useGoal(id!)
  const submitEvaluation = useSubmitEvaluation(id!)

  const [rating, setRating] = useState(0)
  const [didWell, setDidWell] = useState('')
  const [difficulties, setDifficulties] = useState('')
  const [improvements, setImprovements] = useState('')
  const [error, setError] = useState<string | null>(null)

  const canSubmit = rating > 0 && didWell.trim() && difficulties.trim() && improvements.trim()

  async function handleSubmit() {
    if (!id || !canSubmit) return
    setError(null)
    try {
      await submitEvaluation.mutateAsync({
        rating,
        didWell: didWell.trim(),
        difficulties: difficulties.trim(),
        improvements: improvements.trim(),
      })
      navigate('/app/metas')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Revisa tu conexión e intenta de nuevo.')
    }
  }

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      <Link to={`/app/metas/${id}`} className="flex items-center gap-1 text-caption text-content-secondary">
        <ChevronLeft size={16} /> Volver
      </Link>

      <div>
        <h1 className="text-h1">Evalúa tu meta</h1>
        {goal && (
          <p className="mt-1 text-body text-content-secondary">
            {goal.title} · completada el {new Date().toLocaleDateString('es-CO')}
          </p>
        )}
      </div>

      <div>
        <p className="text-body-strong">¿Qué tanto lograste tu objetivo?</p>
        <div className="mt-2 flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} estrellas`}>
              <Star
                size={32}
                className={value <= rating ? 'fill-lime-500 text-lime-500' : 'text-navy-700'}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-label text-content-secondary">¿Qué hice bien?</label>
        <textarea
          value={didWell}
          onChange={(e) => setDidWell(e.target.value)}
          rows={3}
          className="rounded-[12px] border border-navy-700 bg-navy-800 px-4 py-3.5 text-body text-content-primary focus:border-lime-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-label text-content-secondary">¿Qué se me dificultó?</label>
        <textarea
          value={difficulties}
          onChange={(e) => setDifficulties(e.target.value)}
          rows={3}
          className="rounded-[12px] border border-navy-700 bg-navy-800 px-4 py-3.5 text-body text-content-primary focus:border-lime-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-label text-content-secondary">¿Qué puedo mejorar en la próxima meta?</label>
        <textarea
          value={improvements}
          onChange={(e) => setImprovements(e.target.value)}
          rows={3}
          className="rounded-[12px] border border-navy-700 bg-navy-800 px-4 py-3.5 text-body text-content-primary focus:border-lime-500 focus:outline-none"
        />
      </div>

      {error && <p className="text-caption text-state-danger">{error}</p>}

      <Button disabled={!canSubmit || submitEvaluation.isPending} onClick={handleSubmit}>
        Guardar evaluación
      </Button>
    </div>
  )
}
