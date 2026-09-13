import { apiClient } from '../../lib/api-client'
import type { components } from '../../lib/api-types'

export type SubscribePushPayload = components['schemas']['SubscribePushDto']

export const pushApi = {
  subscribe: (payload: SubscribePushPayload) =>
    apiClient.post<void>('/push/subscribe', payload),
}
