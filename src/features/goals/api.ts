import { apiClient } from '../../lib/api-client'
import type { components } from '../../lib/api-types'
import type { Goal, GoalSummary } from '../../types/domain'

export type CreateGoalPayload = components['schemas']['CreateGoalDto']
export type UpdateGoalPayload = components['schemas']['UpdateGoalDto']
export type CreateTaskPayload = components['schemas']['CreateTaskDto']

export interface TaskSuggestions {
  matched: string | null
  tasks: string[]
}

export const goalsApi = {
  list: () => apiClient.get<GoalSummary[]>('/goals'),
  get: (id: string) => apiClient.get<Goal>(`/goals/${id}`),
  create: (payload: CreateGoalPayload) => apiClient.post<Goal>('/goals', payload),
  archive: (id: string) =>
    apiClient.patch<GoalSummary>(`/goals/${id}`, { status: 'ARCHIVADA' } as UpdateGoalPayload),
  remove: (id: string) => apiClient.delete<void>(`/goals/${id}`),
  suggestTasks: (title: string) =>
    apiClient.get<TaskSuggestions>(`/goals/suggestions?title=${encodeURIComponent(title)}`),
  addTask: (goalId: string, payload: CreateTaskPayload) =>
    apiClient.post(`/goals/${goalId}/tasks`, payload),
}
