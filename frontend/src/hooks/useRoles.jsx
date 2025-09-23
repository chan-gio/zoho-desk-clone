import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { roleService } from '../services/roleService'

// Query keys
export const roleKeys = {
  all: ['roles'],
  lists: () => [...roleKeys.all, 'list'],
  list: (filters) => [...roleKeys.lists(), { filters }],
  details: () => [...roleKeys.all, 'detail'],
  detail: (id) => [...roleKeys.details(), id],
  permissions: (id) => [...roleKeys.all, 'permissions', id],
  users: (id) => [...roleKeys.all, 'users', id],
  allPermissions: () => [...roleKeys.all, 'allPermissions'],
  hierarchy: () => [...roleKeys.all, 'hierarchy'],
  stats: () => [...roleKeys.all, 'stats'],
  validation: (role) => [...roleKeys.all, 'validation', role],
}

// Custom hooks for roles
export const useRoles = (params = {}) => {
  return useQuery({
    queryKey: roleKeys.list(params),
    queryFn: () => roleService.getAllRoles(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useRole = (id) => {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => roleService.getRoleById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

export const useRolePermissions = (id) => {
  return useQuery({
    queryKey: roleKeys.permissions(id),
    queryFn: () => roleService.getRolePermissions(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

export const useRoleUsers = (id, params = {}) => {
  return useQuery({
    queryKey: [...roleKeys.users(id), params],
    queryFn: () => roleService.getRoleUsers(id, params),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useAllPermissions = () => {
  return useQuery({
    queryKey: roleKeys.allPermissions(),
    queryFn: roleService.getAllPermissions,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useRoleHierarchy = () => {
  return useQuery({
    queryKey: roleKeys.hierarchy(),
    queryFn: roleService.getRoleHierarchy,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useRoleStats = () => {
  return useQuery({
    queryKey: roleKeys.stats(),
    queryFn: roleService.getRoleStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useRoleValidation = (role) => {
  return useQuery({
    queryKey: roleKeys.validation(role),
    queryFn: () => roleService.isValidRole(role),
    enabled: !!role,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Mutations
export const useCreateRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: roleService.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
      queryClient.invalidateQueries({ queryKey: roleKeys.stats() })
      queryClient.invalidateQueries({ queryKey: roleKeys.hierarchy() })
    },
    onError: (error) => {
      console.error('Create role failed:', error)
    },
  })
}

export const useUpdateRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => roleService.updateRole(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
      queryClient.setQueryData(roleKeys.detail(variables.id), data)
    },
    onError: (error) => {
      console.error('Update role failed:', error)
    },
  })
}

export const useDeleteRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: roleService.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
      queryClient.invalidateQueries({ queryKey: roleKeys.stats() })
      queryClient.invalidateQueries({ queryKey: roleKeys.hierarchy() })
    },
    onError: (error) => {
      console.error('Delete role failed:', error)
    },
  })
}

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, permissions }) => 
      roleService.updateRolePermissions(id, permissions),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.permissions(variables.id) })
      queryClient.invalidateQueries({ queryKey: roleKeys.detail(variables.id) })
    },
    onError: (error) => {
      console.error('Update role permissions failed:', error)
    },
  })
}

export const useAssignRoleToUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ roleId, userId }) => 
      roleService.assignRoleToUser(roleId, userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.users(variables.roleId) })
    },
    onError: (error) => {
      console.error('Assign role to user failed:', error)
    },
  })
}

export const useRemoveRoleFromUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ roleId, userId }) => 
      roleService.removeRoleFromUser(roleId, userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.users(variables.roleId) })
    },
    onError: (error) => {
      console.error('Remove role from user failed:', error)
    },
  })
}

export const useCloneRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, newName }) => roleService.cloneRole(id, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
    },
    onError: (error) => {
      console.error('Clone role failed:', error)
    },
  })
}
