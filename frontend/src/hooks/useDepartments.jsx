import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { departmentService } from '../services/departmentService'

// Query keys
export const departmentKeys = {
  all: ['departments'],
  lists: () => [...departmentKeys.all, 'list'],
  list: (filters) => [...departmentKeys.lists(), { filters }],
  details: () => [...departmentKeys.all, 'detail'],
  detail: (id) => [...departmentKeys.details(), id],
  users: (id) => [...departmentKeys.all, 'users', id],
  tickets: (id) => [...departmentKeys.all, 'tickets', id],
  stats: (id) => [...departmentKeys.all, 'stats', id],
  performance: (id) => [...departmentKeys.all, 'performance', id],
  settings: (id) => [...departmentKeys.all, 'settings', id],
  activity: (id) => [...departmentKeys.all, 'activity', id],
  hierarchy: () => [...departmentKeys.all, 'hierarchy'],
  search: (query) => [...departmentKeys.all, 'search', query],
}

// Custom hooks for departments
export const useDepartments = (params = {}) => {
  return useQuery({
    queryKey: departmentKeys.list(params),
    queryFn: () => departmentService.getDepartments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDepartment = (id) => {
  return useQuery({
    queryKey: departmentKeys.detail(id),
    queryFn: () => departmentService.getDepartmentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useDepartmentUsers = (id, params = {}) => {
  return useQuery({
    queryKey: [...departmentKeys.users(id), params],
    queryFn: () => departmentService.getDepartmentUsers(id, params),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useDepartmentTickets = (id, params = {}) => {
  return useQuery({
    queryKey: [...departmentKeys.tickets(id), params],
    queryFn: () => departmentService.getDepartmentTickets(id, params),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useDepartmentStats = (id) => {
  return useQuery({
    queryKey: departmentKeys.stats(id),
    queryFn: () => departmentService.getDepartmentStats(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDepartmentPerformance = (id, params = {}) => {
  return useQuery({
    queryKey: [...departmentKeys.performance(id), params],
    queryFn: () => departmentService.getDepartmentPerformance(id, params),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDepartmentSettings = (id) => {
  return useQuery({
    queryKey: departmentKeys.settings(id),
    queryFn: () => departmentService.getDepartmentSettings(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useDepartmentActivity = (id, params = {}) => {
  return useQuery({
    queryKey: [...departmentKeys.activity(id), params],
    queryFn: () => departmentService.getDepartmentActivity(id, params),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useDepartmentHierarchy = () => {
  return useQuery({
    queryKey: departmentKeys.hierarchy(),
    queryFn: departmentService.getDepartmentHierarchy,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useSearchDepartments = (query, params = {}) => {
  return useQuery({
    queryKey: departmentKeys.search(query),
    queryFn: () => departmentService.searchDepartments(query, params),
    enabled: !!query && query.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// Mutations
export const useCreateDepartment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: departmentService.createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: departmentKeys.hierarchy() })
    },
    onError: (error) => {
      console.error('Create department failed:', error)
    },
  })
}

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => departmentService.updateDepartment(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() })
      queryClient.setQueryData(departmentKeys.detail(variables.id), data)
    },
    onError: (error) => {
      console.error('Update department failed:', error)
    },
  })
}

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: departmentService.deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: departmentKeys.hierarchy() })
    },
    onError: (error) => {
      console.error('Delete department failed:', error)
    },
  })
}

export const useAddUserToDepartment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ departmentId, userId, role }) => 
      departmentService.addUserToDepartment(departmentId, userId, role),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.users(variables.departmentId) })
      queryClient.invalidateQueries({ queryKey: departmentKeys.detail(variables.departmentId) })
    },
    onError: (error) => {
      console.error('Add user to department failed:', error)
    },
  })
}

export const useRemoveUserFromDepartment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ departmentId, userId }) => 
      departmentService.removeUserFromDepartment(departmentId, userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.users(variables.departmentId) })
      queryClient.invalidateQueries({ queryKey: departmentKeys.detail(variables.departmentId) })
    },
    onError: (error) => {
      console.error('Remove user from department failed:', error)
    },
  })
}

export const useUpdateUserDepartmentRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ departmentId, userId, role }) => 
      departmentService.updateUserDepartmentRole(departmentId, userId, role),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.users(variables.departmentId) })
    },
    onError: (error) => {
      console.error('Update user department role failed:', error)
    },
  })
}

export const useUpdateDepartmentSettings = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, settings }) => departmentService.updateDepartmentSettings(id, settings),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(departmentKeys.settings(variables.id), data)
      queryClient.invalidateQueries({ queryKey: departmentKeys.detail(variables.id) })
    },
    onError: (error) => {
      console.error('Update department settings failed:', error)
    },
  })
}

export const useUpdateDepartmentHierarchy = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: departmentService.updateDepartmentHierarchy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.hierarchy() })
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() })
    },
    onError: (error) => {
      console.error('Update department hierarchy failed:', error)
    },
  })
}

