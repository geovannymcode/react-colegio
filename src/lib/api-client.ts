import { useAuthStore } from '../features/auth/authStore'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const API_URL = import.meta.env.VITE_API_URL

interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

/** Varios 401 al tiempo comparten este único refresh en vuelo, nunca uno por petición. */
let inFlightRefresh: Promise<boolean> | null = null

async function refreshSession(): Promise<boolean> {
  const refreshToken = useAuthStore.getState().refreshToken
  if (!refreshToken) return false

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!response.ok) return false

    const data = (await response.json()) as RefreshResponse
    useAuthStore.getState().setSession(data.accessToken, data.refreshToken)
    return true
  } catch {
    return false
  }
}

/** El refresh es stateless: si el servidor lo rechaza, la sesión está muerta, sin reintentos. */
function getOrCreateRefresh(): Promise<boolean> {
  if (!inFlightRefresh) {
    inFlightRefresh = refreshSession().finally(() => {
      inFlightRefresh = null
    })
  }
  return inFlightRefresh
}

function extractMessage(body: unknown): string {
  if (body && typeof body === 'object' && 'message' in body) {
    const message = (body as { message: unknown }).message
    if (Array.isArray(message)) return message.join(' ')
    if (typeof message === 'string') return message
  }
  return 'Revisa tu conexión e intenta de nuevo.'
}

async function request<T>(path: string, options: RequestInit = {}, isRetry = false): Promise<T> {
  const accessToken = useAuthStore.getState().accessToken

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  })

  if (response.ok) {
    if (response.status === 204) return undefined as T
    return response.json() as Promise<T>
  }

  if (response.status === 401 && !isRetry && path !== '/auth/refresh') {
    const refreshed = await getOrCreateRefresh()
    if (refreshed) {
      return request<T>(path, options, true)
    }
    useAuthStore.getState().logout()
    throw new ApiError(401, 'Tu sesión expiró. Inicia sesión de nuevo.')
  }

  const body = await response.json().catch(() => null)
  throw new ApiError(response.status, extractMessage(body))
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
