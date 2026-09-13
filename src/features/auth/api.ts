import { apiClient } from '../../lib/api-client'
import type { components } from '../../lib/api-types'
import type { User } from '../../types/domain'

export type RegisterPayload = components['schemas']['RegisterDto']
export type LoginPayload = components['schemas']['LoginDto']

export interface AuthResponse {
  user: { id: string; nickname: string; email: string }
  accessToken: string
  refreshToken: string
}

export const authApi = {
  login: (payload: LoginPayload) => apiClient.post<AuthResponse>('/auth/login', payload),
  register: (payload: RegisterPayload) => apiClient.post<AuthResponse>('/auth/register', payload),
  me: () => apiClient.get<User>('/users/me'),
}
