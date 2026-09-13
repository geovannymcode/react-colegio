import { apiClient } from '../../lib/api-client'
import type { Achievement } from '../../types/domain'

export const achievementsApi = {
  list: () => apiClient.get<Achievement[]>('/users/me/achievements'),
}
