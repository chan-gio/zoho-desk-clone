import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { statusService } from '../services/statusService'

// Query keys
export const statusKeys = {
  all: ['statuses'],
  lists: () => [...statusKeys.all, 'list'],
  list: (filters) => [...statusKeys.lists(), { filters }],
  details: () => [...statusKeys.all, 'detail'],
  detail: (id) => [...statusKeys.details(), id],
  byTenant: (params) => [...statusKeys.all, 'tenant', params],
}

// Custom hooks for statuses
export const useStatuses = (params = {}) => {
  return useQuery({
    queryKey: statusKeys.list(params),
    queryFn: () => statusService.getStatuses(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useStatusesByTenant = (params = {}) => {
  return useQuery({
    queryKey: statusKeys.byTenant(params),
    queryFn: () => statusService.getStatusesByTenant(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useStatus = (id) => {
  return useQuery({
    queryKey: statusKeys.detail(id),
    queryFn: () => statusService.getStatusById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: statusService.createStatus,
    onSuccess: (data) => {
      // Invalidate và refetch statuses list
      queryClient.invalidateQueries({ queryKey: statusKeys.lists() })
      queryClient.invalidateQueries({ queryKey: statusKeys.all })
    },
    onError: (error) => {
      console.error('Create status failed:', error)
    },
  })
}

export const useUpdateStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: statusService.updateStatus,
    onSuccess: (data, variables) => {
      // Update cache cho status cụ thể
      queryClient.setQueryData(statusKeys.detail(variables.id), data)
      
      // Invalidate lists để refetch
      queryClient.invalidateQueries({ queryKey: statusKeys.lists() })
      queryClient.invalidateQueries({ queryKey: statusKeys.all })
    },
    onError: (error) => {
      console.error('Update status failed:', error)
    },
  })
}

export const useDeleteStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: statusService.deleteStatus,
    onSuccess: (data, variables) => {
      // Remove từ cache
      queryClient.removeQueries({ queryKey: statusKeys.detail(variables) })
      
      // Invalidate lists để refetch
      queryClient.invalidateQueries({ queryKey: statusKeys.lists() })
      queryClient.invalidateQueries({ queryKey: statusKeys.all })
    },
    onError: (error) => {
      console.error('Delete status failed:', error)
    },
  })
}
