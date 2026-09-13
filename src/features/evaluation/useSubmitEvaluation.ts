import { useMutation, useQueryClient } from '@tanstack/react-query'
import { evaluationApi, type CreateEvaluationPayload } from './api'

/** Guardar la evaluación es lo único que cierra la meta (01-SPEC.md §6.2) — nunca es automático. */
export function useSubmitEvaluation(goalId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEvaluationPayload) => evaluationApi.submit(goalId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] })
      queryClient.invalidateQueries({ queryKey: ['achievements'] })
    },
  })
}
