import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { priorityService } from '../services/priorityService'

// Query keys
export const priorityKeys = {
  all: ['priorities'],
  lists: () => [...priorityKeys.all, 'list'],
  list: (filters) => [...priorityKeys.lists(), { filters }],
  details: () => [...priorityKeys.all, 'detail'],
  detail: (id) => [...priorityKeys.details(), id],
  byTenant: (params) => [...priorityKeys.all, 'tenant', params],
}

// Custom hooks for priorities
export const usePriorities = (params = {}) => {
  return useQuery({
    queryKey: priorityKeys.list(params),
    queryFn: () => priorityService.getPriorities(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const usePrioritiesByTenant = (params = {}) => {
  return useQuery({
    queryKey: priorityKeys.byTenant(params),
    queryFn: () => priorityService.getPrioritiesByTenant(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const usePriority = (id) => {
  return useQuery({
    queryKey: priorityKeys.detail(id),
    queryFn: () => priorityService.getPriorityById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreatePriority = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: priorityService.createPriority,
    onSuccess: (data) => {
      // Invalidate và refetch priorities list
      queryClient.invalidateQueries({ queryKey: priorityKeys.lists() })
      queryClient.invalidateQueries({ queryKey: priorityKeys.all })
    },
    onError: (error) => {
      console.error('Create priority failed:', error)
    },
  })
}

export const useUpdatePriority = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: priorityService.updatePriority,
    onSuccess: (data, variables) => {
      // Update cache cho priority cụ thể
      queryClient.setQueryData(priorityKeys.detail(variables.id), data)
      
      // Invalidate lists để refetch
      queryClient.invalidateQueries({ queryKey: priorityKeys.lists() })
      queryClient.invalidateQueries({ queryKey: priorityKeys.all })
    },
    onError: (error) => {
      console.error('Update priority failed:', error)
    },
  })
}

export const useDeletePriority = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: priorityService.deletePriority,
    onSuccess: (data, variables) => {
      // Remove từ cache
      queryClient.removeQueries({ queryKey: priorityKeys.detail(variables) })
      
      // Invalidate lists để refetch
      queryClient.invalidateQueries({ queryKey: priorityKeys.lists() })
      queryClient.invalidateQueries({ queryKey: priorityKeys.all })
    },
    onError: (error) => {
      console.error('Delete priority failed:', error)
    },
  })
}
