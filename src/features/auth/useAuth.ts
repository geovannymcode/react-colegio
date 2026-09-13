import { useMutation, useQuery } from '@tanstack/react-query'
import { authApi, type LoginPayload, type RegisterPayload } from './api'
import { useAuthStore } from './authStore'

export function useMe() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: ['me'],
    queryFn: authApi.me,
    enabled: isAuthenticated,
  })
}

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: ({ accessToken, refreshToken }) => setSession(accessToken, refreshToken),
  })
}

export function useRegister() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: ({ accessToken, refreshToken }) => setSession(accessToken, refreshToken),
  })
}
