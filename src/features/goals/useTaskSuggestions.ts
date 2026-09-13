import { useQuery } from '@tanstack/react-query'
import { goalsApi } from './api'

/** Sugerencias por palabra clave (01-SPEC.md §7) — se piden solo con un título de 3+ letras. */
export function useTaskSuggestions(title: string) {
  const trimmed = title.trim()

  return useQuery({
    queryKey: ['goals', 'suggest-tasks', trimmed],
    queryFn: () => goalsApi.suggestTasks(trimmed),
    enabled: trimmed.length >= 3,
    staleTime: Infinity,
  })
}
