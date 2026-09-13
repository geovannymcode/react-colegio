import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { goalsApi, type CreateGoalPayload } from './api'

export function useGoals() {
  return useQuery({ queryKey: ['goals'], queryFn: goalsApi.list })
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: ['goals', id],
    queryFn: () => goalsApi.get(id),
    enabled: Boolean(id),
  })
}

export function useCreateGoal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateGoalPayload) => goalsApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  })
}

export function useArchiveGoal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => goalsApi.archive(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  })
}
