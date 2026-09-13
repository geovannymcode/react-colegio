import { apiClient } from '../../lib/api-client'
import type { components } from '../../lib/api-types'
import type { Task } from '../../types/domain'

export type UpdateTaskPayload = components['schemas']['UpdateTaskDto']

export const tasksApi = {
  updateStatus: (id: string, status: Task['status']) =>
    apiClient.patch<Task>(`/tasks/${id}`, { status } satisfies UpdateTaskPayload),
}
