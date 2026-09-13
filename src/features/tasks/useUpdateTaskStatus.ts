import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi } from './api'
import { computeOptimisticProgress } from '../goals/progress'
import type { Goal, GoalSummary, TaskStatus } from '../../types/domain'

interface UpdateTaskStatusInput {
  id: string
  goalId: string
  status: TaskStatus
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: UpdateTaskStatusInput) => tasksApi.updateStatus(id, status),

    onMutate: async ({ id, goalId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['goals', goalId] })
      await queryClient.cancelQueries({ queryKey: ['goals'] })

      const previousGoal = queryClient.getQueryData<Goal>(['goals', goalId])
      const previousList = queryClient.getQueryData<GoalSummary[]>(['goals'])

      if (previousGoal) {
        const tasks = previousGoal.tasks.map((task) =>
          task.id === id
            ? { ...task, status, completedAt: status === 'COMPLETADA' ? new Date().toISOString() : null }
            : task,
        )
        const { progress, tasksTotal, tasksCompleted } = computeOptimisticProgress(tasks)
        queryClient.setQueryData<Goal>(['goals', goalId], {
          ...previousGoal,
          tasks,
          progress,
          tasksTotal,
          tasksCompleted,
        })

        if (previousList) {
          queryClient.setQueryData<GoalSummary[]>(
            ['goals'],
            previousList.map((goal) =>
              goal.id === goalId ? { ...goal, progress, tasksTotal, tasksCompleted } : goal,
            ),
          )
        }
      }

      return { previousGoal, previousList, goalId }
    },

    onError: (_error, _variables, context) => {
      if (!context) return
      if (context.previousGoal) {
        queryClient.setQueryData(['goals', context.goalId], context.previousGoal)
      }
      if (context.previousList) {
        queryClient.setQueryData(['goals'], context.previousList)
      }
    },

    onSettled: (_data, _error, { goalId }) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] })
      queryClient.invalidateQueries({ queryKey: ['goals', goalId] })
      queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['achievements'] })
    },
  })
}
