import api from './api'

export const notificationService = {
  // Lấy danh sách thông báo
  getNotifications: async (params = {}) => {
    try {
      const response = await api.get('/notifications', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return getMockNotifications()
    }
  },

  // Lấy thông báo theo ID
  getNotificationById: async (id) => {
    try {
      const response = await api.get(`/notifications/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching notification:', error)
      return getMockNotificationById(id)
    }
  },

  // Đánh dấu thông báo đã đọc
  markAsRead: async (id) => {
    try {
      const response = await api.patch(`/notifications/${id}/read`)
      return response.data
    } catch (error) {
      console.error('Error marking notification as read:', error)
      throw error
    }
  },

  // Đánh dấu tất cả thông báo đã đọc
  markAllAsRead: async () => {
    try {
      const response = await api.patch('/notifications/read-all')
      return response.data
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      throw error
    }
  },

  // Xóa thông báo
  deleteNotification: async (id) => {
    try {
      const response = await api.delete(`/notifications/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting notification:', error)
      throw error
    }
  },

  // Xóa tất cả thông báo đã đọc
  deleteAllRead: async () => {
    try {
      const response = await api.delete('/notifications/read')
      return response.data
    } catch (error) {
      console.error('Error deleting read notifications:', error)
      throw error
    }
  },

  // Tạo thông báo mới
  createNotification: async (notificationData) => {
    try {
      const response = await api.post('/notifications', notificationData)
      return response.data
    } catch (error) {
      console.error('Error creating notification:', error)
      throw error
    }
  },

  // Gửi thông báo đến user cụ thể
  sendToUser: async (userId, notificationData) => {
    try {
      const response = await api.post(`/notifications/send/user/${userId}`, notificationData)
      return response.data
    } catch (error) {
      console.error('Error sending notification to user:', error)
      throw error
    }
  },

  // Gửi thông báo đến tất cả users
  sendToAll: async (notificationData) => {
    try {
      const response = await api.post('/notifications/send/all', notificationData)
      return response.data
    } catch (error) {
      console.error('Error sending notification to all users:', error)
      throw error
    }
  },

  // Gửi thông báo đến role cụ thể
  sendToRole: async (role, notificationData) => {
    try {
      const response = await api.post(`/notifications/send/role/${role}`, notificationData)
      return response.data
    } catch (error) {
      console.error('Error sending notification to role:', error)
      throw error
    }
  },

  // Lấy số lượng thông báo chưa đọc
  getUnreadCount: async () => {
    try {
      const response = await api.get('/notifications/unread-count')
      return response.data.count || 0
    } catch (error) {
      console.error('Error fetching unread count:', error)
      return getMockUnreadCount()
    }
  },

  // Lấy thông báo chưa đọc
  getUnreadNotifications: async (params = {}) => {
    try {
      const response = await api.get('/notifications/unread', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching unread notifications:', error)
      return getMockUnreadNotifications()
    }
  },

  // Cập nhật cài đặt thông báo
  updateNotificationSettings: async (settings) => {
    try {
      const response = await api.put('/notifications/settings', settings)
      return response.data
    } catch (error) {
      console.error('Error updating notification settings:', error)
      throw error
    }
  },

  // Lấy cài đặt thông báo
  getNotificationSettings: async () => {
    try {
      const response = await api.get('/notifications/settings')
      return response.data
    } catch (error) {
      console.error('Error fetching notification settings:', error)
      return getMockNotificationSettings()
    }
  },

  // Subscribe to real-time notifications
  subscribeToNotifications: (callback) => {
    // WebSocket hoặc Server-Sent Events implementation
    if (typeof window !== 'undefined' && window.EventSource) {
      const eventSource = new EventSource('/api/notifications/stream')
      
      eventSource.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data)
          callback(notification)
        } catch (error) {
          console.error('Error parsing notification:', error)
        }
      }

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error)
      }

      return eventSource
    }
    
    return null
  },

  // Unsubscribe from notifications
  unsubscribeFromNotifications: (eventSource) => {
    if (eventSource) {
      eventSource.close()
    }
  }
}

// Mock data cho development
const getMockNotifications = () => [
  {
    id: 1,
    title: 'Ticket mới được tạo',
    message: 'Ticket #123 đã được tạo bởi Nguyễn Văn A',
    type: 'ticket_created',
    priority: 'medium',
    isRead: false,
    userId: 2,
    createdAt: '2024-01-15T10:30:00Z',
    data: {
      ticketId: 123,
      customerName: 'Nguyễn Văn A'
    }
  },
  {
    id: 2,
    title: 'Ticket được giao cho bạn',
    message: 'Ticket #124 đã được giao cho bạn để xử lý',
    type: 'ticket_assigned',
    priority: 'high',
    isRead: false,
    userId: 2,
    createdAt: '2024-01-15T09:15:00Z',
    data: {
      ticketId: 124,
      assignedBy: 'Admin'
    }
  },
  {
    id: 3,
    title: 'Thông báo hệ thống',
    message: 'Hệ thống sẽ bảo trì vào lúc 2:00 AM ngày mai',
    type: 'system',
    priority: 'low',
    isRead: true,
    userId: 2,
    createdAt: '2024-01-14T16:45:00Z',
    data: {
      maintenanceTime: '2024-01-16T02:00:00Z'
    }
  },
  {
    id: 4,
    title: 'Ticket đã được giải quyết',
    message: 'Ticket #120 đã được giải quyết bởi Agent khác',
    type: 'ticket_resolved',
    priority: 'medium',
    isRead: true,
    userId: 2,
    createdAt: '2024-01-14T14:20:00Z',
    data: {
      ticketId: 120,
      resolvedBy: 'Trần Thị B'
    }
  }
]

const getMockNotificationById = (id) => {
  const notifications = getMockNotifications()
  return notifications.find(notification => notification.id === parseInt(id))
}

const getMockUnreadCount = () => 2

const getMockUnreadNotifications = () => [
  {
    id: 1,
    title: 'Ticket mới được tạo',
    message: 'Ticket #123 đã được tạo bởi Nguyễn Văn A',
    type: 'ticket_created',
    priority: 'medium',
    isRead: false,
    userId: 2,
    createdAt: '2024-01-15T10:30:00Z',
    data: {
      ticketId: 123,
      customerName: 'Nguyễn Văn A'
    }
  },
  {
    id: 2,
    title: 'Ticket được giao cho bạn',
    message: 'Ticket #124 đã được giao cho bạn để xử lý',
    type: 'ticket_assigned',
    priority: 'high',
    isRead: false,
    userId: 2,
    createdAt: '2024-01-15T09:15:00Z',
    data: {
      ticketId: 124,
      assignedBy: 'Admin'
    }
  }
]

const getMockNotificationSettings = () => ({
  email: {
    ticketAssigned: true,
    ticketResolved: true,
    ticketCreated: false,
    systemUpdates: true
  },
  push: {
    ticketAssigned: true,
    ticketResolved: false,
    ticketCreated: false,
    systemUpdates: false
  },
  inApp: {
    ticketAssigned: true,
    ticketResolved: true,
    ticketCreated: true,
    systemUpdates: true
  }
})
