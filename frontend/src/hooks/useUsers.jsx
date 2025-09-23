import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'

// Query keys
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), { filters }],
  details: () => [...userKeys.all, 'detail'],
  detail: (id) => [...userKeys.details(), id],
  byEmail: (email) => [...userKeys.all, 'email', email],
  agents: () => [...userKeys.all, 'agents'],
  admins: () => [...userKeys.all, 'admins'],
  stats: () => [...userKeys.all, 'stats'],
  activity: (userId) => [...userKeys.all, 'activity', userId],
  search: (query) => [...userKeys.all, 'search', query],
}

// Custom hooks for users
export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUser = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useUserByEmail = (email) => {
  return useQuery({
    queryKey: userKeys.byEmail(email),
    queryFn: () => userService.getUserByEmail(email),
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
  })
}

export const useAgents = (params = {}) => {
  return useQuery({
    queryKey: [...userKeys.agents(), params],
    queryFn: () => userService.getAgents(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useAdmins = (params = {}) => {
  return useQuery({
    queryKey: [...userKeys.admins(), params],
    queryFn: () => userService.getAdmins(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useUserStats = () => {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: userService.getUserStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useUserActivity = (userId, params = {}) => {
  return useQuery({
    queryKey: [...userKeys.activity(userId), params],
    queryFn: () => userService.getUserActivity(userId, params),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useSearchUsers = (query, params = {}) => {
  return useQuery({
    queryKey: userKeys.search(query),
    queryFn: () => userService.searchUsers(query, params),
    enabled: !!query && query.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// Mutations
export const useCreateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.stats() })
    },
    onError: (error) => {
      console.error('Create user failed:', error)
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.setQueryData(userKeys.detail(variables.id), data)
    },
    onError: (error) => {
      console.error('Update user failed:', error)
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.softDeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.stats() })
    },
    onError: (error) => {
      console.error('Delete user failed:', error)
    },
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      // Update current user data
      queryClient.setQueryData(['auth', 'currentUser'], data)
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
    },
    onError: (error) => {
      console.error('Update profile failed:', error)
    },
  })
}

export const useUploadAvatar = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ file, onProgress }) => userService.uploadAvatar(file, onProgress),
    onSuccess: (data) => {
      // Update current user data
      queryClient.setQueryData(['auth', 'currentUser'], data)
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
    },
    onError: (error) => {
      console.error('Upload avatar failed:', error)
    },
  })
}

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.deleteAvatar,
    onSuccess: (data) => {
      // Update current user data
      queryClient.setQueryData(['auth', 'currentUser'], data)
      queryClient.invalidateQueries({ queryKey: userKeys.details() })
    },
    onError: (error) => {
      console.error('Delete avatar failed:', error)
    },
  })
}

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, status }) => userService.updateUserStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.setQueryData(userKeys.detail(variables.id), data)
    },
    onError: (error) => {
      console.error('Update user status failed:', error)
    },
  })
}

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, role }) => userService.updateUserRole(id, role),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.setQueryData(userKeys.detail(variables.id), data)
    },
    onError: (error) => {
      console.error('Update user role failed:', error)
    },
  })
}

export const useInviteUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.inviteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
    onError: (error) => {
      console.error('Invite user failed:', error)
    },
  })
}

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.acceptInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
    onError: (error) => {
      console.error('Accept invitation failed:', error)
    },
  })
}

export const useRejectInvitation = () => {
  return useMutation({
    mutationFn: userService.rejectInvitation,
    onError: (error) => {
      console.error('Reject invitation failed:', error)
    },
  })
}
