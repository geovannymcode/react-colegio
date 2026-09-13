import { apiClient } from '../../lib/api-client'
import type { components } from '../../lib/api-types'
import type { Evaluation } from '../../types/domain'

export type CreateEvaluationPayload = components['schemas']['CreateEvaluationDto']

export const evaluationApi = {
  submit: (goalId: string, payload: CreateEvaluationPayload) =>
    apiClient.post<Evaluation>(`/goals/${goalId}/evaluation`, payload),
}
