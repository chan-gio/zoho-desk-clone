import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '../services/notificationService'

// Query keys
export const notificationKeys = {
  all: ['notifications'],
  lists: () => [...notificationKeys.all, 'list'],
  list: (filters) => [...notificationKeys.lists(), { filters }],
  details: () => [...notificationKeys.all, 'detail'],
  detail: (id) => [...notificationKeys.details(), id],
  unread: () => [...notificationKeys.all, 'unread'],
  unreadCount: () => [...notificationKeys.all, 'unreadCount'],
  settings: () => [...notificationKeys.all, 'settings'],
  templates: () => [...notificationKeys.all, 'templates'],
}

// Custom hooks for notifications
export const useNotifications = (params = {}) => {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => notificationService.getNotifications(params),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}

export const useNotification = (id) => {
  return useQuery({
    queryKey: notificationKeys.detail(id),
    queryFn: () => notificationService.getNotificationById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUnreadNotifications = (params = {}) => {
  return useQuery({
    queryKey: [...notificationKeys.unread(), params],
    queryFn: () => notificationService.getUnreadNotifications(params),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 15 * 1000, // Refetch every 15 seconds
  })
}

export const useUnreadCount = () => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: notificationService.getUnreadCount,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 15 * 1000, // Refetch every 15 seconds
  })
}

export const useNotificationSettings = () => {
  return useQuery({
    queryKey: notificationKeys.settings(),
    queryFn: notificationService.getNotificationSettings,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useNotificationTemplates = () => {
  return useQuery({
    queryKey: notificationKeys.templates(),
    queryFn: () => notificationService.getNotificationTemplates(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Mutations
export const useMarkAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: (data, variables) => {
      // Update the specific notification
      queryClient.setQueryData(notificationKeys.detail(variables), data)
      // Invalidate lists to refresh
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: notificationKeys.unread() })
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() })
    },
    onError: (error) => {
      console.error('Mark as read failed:', error)
    },
  })
}

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      // Invalidate all notification queries
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
    onError: (error) => {
      console.error('Mark all as read failed:', error)
    },
  })
}

export const useDeleteNotification = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: notificationKeys.unread() })
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() })
    },
    onError: (error) => {
      console.error('Delete notification failed:', error)
    },
  })
}

export const useDeleteAllRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.deleteAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: notificationKeys.unread() })
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() })
    },
    onError: (error) => {
      console.error('Delete all read failed:', error)
    },
  })
}

export const useCreateNotification = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
    },
    onError: (error) => {
      console.error('Create notification failed:', error)
    },
  })
}

export const useSendToUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, notificationData }) => 
      notificationService.sendToUser(userId, notificationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
    },
    onError: (error) => {
      console.error('Send to user failed:', error)
    },
  })
}

export const useSendToAll = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.sendToAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
    },
    onError: (error) => {
      console.error('Send to all failed:', error)
    },
  })
}

export const useSendToRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ role, notificationData }) => 
      notificationService.sendToRole(role, notificationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
    },
    onError: (error) => {
      console.error('Send to role failed:', error)
    },
  })
}

export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.updateNotificationSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(notificationKeys.settings(), data)
    },
    onError: (error) => {
      console.error('Update notification settings failed:', error)
    },
  })
}

export const useCreateNotificationTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.createNotificationTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.templates() })
    },
    onError: (error) => {
      console.error('Create notification template failed:', error)
    },
  })
}

export const useUpdateNotificationTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, templateData }) => 
      notificationService.updateNotificationTemplate(id, templateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.templates() })
    },
    onError: (error) => {
      console.error('Update notification template failed:', error)
    },
  })
}

export const useDeleteNotificationTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: notificationService.deleteNotificationTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.templates() })
    },
    onError: (error) => {
      console.error('Delete notification template failed:', error)
    },
  })
}

// Real-time subscription hook
export const useNotificationSubscription = (callback) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => {
      const eventSource = notificationService.subscribeToNotifications((notification) => {
        // Update cache with new notification
        queryClient.setQueryData(notificationKeys.detail(notification.id), notification)
        queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
        queryClient.invalidateQueries({ queryKey: notificationKeys.unread() })
        queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() })
        
        // Call the callback if provided
        if (callback) {
          callback(notification)
        }
      })
      
      return eventSource
    },
    onError: (error) => {
      console.error('Notification subscription failed:', error)
    },
  })
}
