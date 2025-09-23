import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { tenantService } from '../services/tenantService'

// Query keys
export const tenantKeys = {
  all: ['tenants'],
  lists: () => [...tenantKeys.all, 'list'],
  list: (filters) => [...tenantKeys.lists(), { filters }],
  details: () => [...tenantKeys.all, 'detail'],
  detail: (id) => [...tenantKeys.details(), id],
  users: (userId) => [...tenantKeys.all, 'users', userId],
  stats: (id) => [...tenantKeys.all, 'stats', id],
  usersInTenant: (tenantId) => [...tenantKeys.all, 'usersInTenant', tenantId],
  public: () => [...tenantKeys.all, 'public'],
}

// Custom hooks for tenants
export const useTenants = (params = {}) => {
  return useQuery({
    queryKey: tenantKeys.list(params),
    queryFn: () => tenantService.getAllTenants(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useTenant = (id) => {
  return useQuery({
    queryKey: tenantKeys.detail(id),
    queryFn: () => tenantService.getTenantById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

export const useTenantsByUserId = (userId) => {
  return useQuery({
    queryKey: tenantKeys.users(userId),
    queryFn: () => tenantService.getTenantsByUserId(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000,
  })
}

export const usePublicTenants = () => {
  return useQuery({
    queryKey: tenantKeys.public(),
    queryFn: tenantService.getPublicTenants,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useTenantStats = (id) => {
  return useQuery({
    queryKey: tenantKeys.stats(id),
    queryFn: () => tenantService.getTenantStats(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useTenantUsers = (tenantId, params = {}) => {
  return useQuery({
    queryKey: [...tenantKeys.usersInTenant(tenantId), params],
    queryFn: () => tenantService.getTenantUsers(tenantId, params),
    enabled: !!tenantId,
    staleTime: 5 * 60 * 1000,
  })
}

// Mutations
export const useCreateTenant = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: tenantService.createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.lists() })
      queryClient.invalidateQueries({ queryKey: tenantKeys.public() })
    },
    onError: (error) => {
      console.error('Create tenant failed:', error)
    },
  })
}

export const useUpdateTenant = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => tenantService.updateTenant(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.lists() })
      queryClient.setQueryData(tenantKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: tenantKeys.public() })
    },
    onError: (error) => {
      console.error('Update tenant failed:', error)
    },
  })
}

export const useDeleteTenant = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: tenantService.deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.lists() })
      queryClient.invalidateQueries({ queryKey: tenantKeys.public() })
    },
    onError: (error) => {
      console.error('Delete tenant failed:', error)
    },
  })
}

export const useAddUserToTenant = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ tenantId, userId, role }) => 
      tenantService.addUserToTenant(tenantId, userId, role),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.usersInTenant(variables.tenantId) })
      queryClient.invalidateQueries({ queryKey: tenantKeys.detail(variables.tenantId) })
    },
    onError: (error) => {
      console.error('Add user to tenant failed:', error)
    },
  })
}

export const useRemoveUserFromTenant = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ tenantId, userId }) => 
      tenantService.removeUserFromTenant(tenantId, userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.usersInTenant(variables.tenantId) })
      queryClient.invalidateQueries({ queryKey: tenantKeys.detail(variables.tenantId) })
    },
    onError: (error) => {
      console.error('Remove user from tenant failed:', error)
    },
  })
}

export const useUpdateUserTenantRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ tenantId, userId, role }) => 
      tenantService.updateUserTenantRole(tenantId, userId, role),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.usersInTenant(variables.tenantId) })
    },
    onError: (error) => {
      console.error('Update user tenant role failed:', error)
    },
  })
}
