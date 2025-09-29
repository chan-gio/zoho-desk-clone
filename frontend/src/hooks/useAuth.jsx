import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'

// Query keys
export const authKeys = {
  all: ['auth'],
  currentUser: () => [...authKeys.all, 'currentUser'],
  tenants: () => [...authKeys.all, 'tenants'],
}

// Custom hooks for authentication
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })
}

export const useUserTenants = () => {
  return useQuery({
    queryKey: authKeys.tenants(),
    queryFn: authService.getUserTenants,
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!authService.getToken(), // Chỉ fetch khi đã đăng nhập
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.setQueryData(authKeys.currentUser(), data.user)
      queryClient.invalidateQueries({ queryKey: authKeys.tenants() })
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
    onError: (error) => {
      console.error('Registration failed:', error)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear()
    },
    onError: (error) => {
      console.error('Logout failed:', error)
    },
  })
}

export const useRefreshToken = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (token) => {
      // Token đã được lưu trong authService.refreshToken
      console.log('Token refreshed successfully')
    },
    onError: (error) => {
      console.error('Token refresh failed:', error)
      // Clear all data on refresh failure
      queryClient.clear()
    },
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onError: (error) => {
      console.error('Forgot password failed:', error)
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, password }) => authService.resetPassword(token, password),
    onError: (error) => {
      console.error('Reset password failed:', error)
    },
  })
}

export const useChangePassword = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }) => 
      authService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      // Invalidate user data to refresh
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() })
    },
    onError: (error) => {
      console.error('Change password failed:', error)
    },
  })
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: authService.verifyEmail,
    onError: (error) => {
      console.error('Email verification failed:', error)
    },
  })
}

export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: authService.resendVerificationEmail,
    onError: (error) => {
      console.error('Resend verification failed:', error)
    },
  })
}

export const useSelectTenant = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: authService.selectTenant,
    onSuccess: (data) => {
      // Update current user data với tenantId mới
      const currentUser = authService.getCurrentUser()
      if (currentUser) {
        queryClient.setQueryData(authKeys.currentUser(), {
          ...currentUser,
          tenantId: data.data.tenant.id
        })
      }
      queryClient.invalidateQueries({ queryKey: authKeys.tenants() })
    },
    onError: (error) => {
      console.error('Select tenant failed:', error)
    },
  })
}

export const useSwitchTenant = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: authService.switchTenant,
    onSuccess: (data) => {
      // Update current user data
      queryClient.setQueryData(authKeys.currentUser(), data.user)
      queryClient.invalidateQueries({ queryKey: authKeys.tenants() })
    },
    onError: (error) => {
      console.error('Switch tenant failed:', error)
    },
  })
}

// Utility hooks
export const useIsAuthenticated = () => {
  const { data: user } = useCurrentUser()
  return !!user && authService.isAuthenticated()
}

export const useHasPermission = (permission) => {
  const { data: user } = useCurrentUser()
  return user ? authService.hasPermission(permission) : false
}

export const useHasRole = (role) => {
  const { data: user } = useCurrentUser()
  return user ? authService.hasRole(role) : false
}
