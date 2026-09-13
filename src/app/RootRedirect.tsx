import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../features/auth/authStore'

export function RootRedirect() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return <Navigate to={isAuthenticated ? '/app' : '/bienvenida'} replace />
}
