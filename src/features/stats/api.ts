import { apiClient } from '../../lib/api-client'
import type { Stats } from '../../types/domain'

export const statsApi = {
  get: () => apiClient.get<Stats>('/users/me/stats'),
}
