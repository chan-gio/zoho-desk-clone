import api from './api'

export const userService = {
  // Lấy danh sách users (admin/agent)
  getUsers: async (params = {}) => {
    try {
      const response = await api.get('/users', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching users:', error)
      return getMockUsers()
    }
  },

  getUsersByTenant: async ( params = {}) => {
    try {
      const response = await api.get('/users/tenant', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching users by tenant:', error)
      return getMockUsersByTenant()
    }
  },

  // Lấy user theo ID (admin/agent)
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      return getMockUserById(id)
    }
  },

  // Lấy user theo email (admin only)
  getUserByEmail: async (email) => {
    try {
      const response = await api.get(`/user/email/${email}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user by email:', error)
      return getMockUserByEmail(email)
    }
  },

  // Tạo user mới (admin only)
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData)
      return response.data
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  // Cập nhật user (admin only)
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData)
      return response.data
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  },

  // Xóa user (soft delete - admin only)
  softDeleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  },

  // Cập nhật profile của user hiện tại
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData)
      const { user } = response.data
      
      // Cập nhật thông tin user trong localStorage
      localStorage.setItem('user', JSON.stringify(user))
      
      return user
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },

  // Upload avatar
  uploadAvatar: async (file, onProgress) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            onProgress(percentCompleted)
          }
        },
      })

      const { user } = response.data
      localStorage.setItem('user', JSON.stringify(user))
      
      return user
    } catch (error) {
      console.error('Error uploading avatar:', error)
      throw error
    }
  },

  // Xóa avatar
  deleteAvatar: async () => {
    try {
      const response = await api.delete('/users/avatar')
      const { user } = response.data
      
      localStorage.setItem('user', JSON.stringify(user))
      
      return user
    } catch (error) {
      console.error('Error deleting avatar:', error)
      throw error
    }
  },

  // Lấy danh sách agents
  getAgents: async (params = {}) => {
    try {
      const response = await api.get('/users/agents', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching agents:', error)
      return getMockAgents()
    }
  },

  // Lấy danh sách admins
  getAdmins: async (params = {}) => {
    try {
      const response = await api.get('/users/admins', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching admins:', error)
      return getMockAdmins()
    }
  },

  // Cập nhật trạng thái user (active/inactive)
  updateUserStatus: async (id, status) => {
    try {
      const response = await api.patch(`/users/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating user status:', error)
      throw error
    }
  },

  // Cập nhật role của user
  updateUserRole: async (id, role) => {
    try {
      const response = await api.patch(`/users/${id}/role`, { role })
      return response.data
    } catch (error) {
      console.error('Error updating user role:', error)
      throw error
    }
  },

  // Gửi lời mời tham gia
  inviteUser: async (inviteData) => {
    try {
      const response = await api.post('/users/invite', inviteData)
      return response.data
    } catch (error) {
      console.error('Error inviting user:', error)
      throw error
    }
  },

  // Chấp nhận lời mời
  acceptInvitation: async (token) => {
    try {
      const response = await api.post('/users/accept-invitation', { token })
      return response.data
    } catch (error) {
      console.error('Error accepting invitation:', error)
      throw error
    }
  },

  // Từ chối lời mời
  rejectInvitation: async (token) => {
    try {
      const response = await api.post('/users/reject-invitation', { token })
      return response.data
    } catch (error) {
      console.error('Error rejecting invitation:', error)
      throw error
    }
  },

  // Lấy thống kê user
  getUserStats: async () => {
    try {
      const response = await api.get('/users/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching user stats:', error)
      return getMockUserStats()
    }
  },

  // Lấy hoạt động gần đây của user
  getUserActivity: async (userId, params = {}) => {
    try {
      const response = await api.get(`/users/${userId}/activity`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching user activity:', error)
      return getMockUserActivity(userId)
    }
  },

  // Tìm kiếm users
  searchUsers: async (query, params = {}) => {
    try {
      const response = await api.get('/users/search', {
        params: { q: query, ...params }
      })
      return response.data || []
    } catch (error) {
      console.error('Error searching users:', error)
      return getMockSearchUsers(query)
    }
  }
}

// Mock data cho development
const getMockUsers = () => [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    avatar: '/avatars/user1.jpg',
    role: 'admin',
    status: 'active',
    department: 'IT',
    position: 'System Administrator',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    permissions: ['read', 'write', 'delete', 'admin']
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0987654321',
    avatar: '/avatars/user2.jpg',
    role: 'agent',
    status: 'active',
    department: 'Support',
    position: 'Support Agent',
    lastLogin: '2024-01-15T09:15:00Z',
    createdAt: '2024-01-02T00:00:00Z',
    permissions: ['read', 'write']
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    phone: '0369852147',
    avatar: '/avatars/user3.jpg',
    role: 'agent',
    status: 'inactive',
    department: 'Support',
    position: 'Support Agent',
    lastLogin: '2024-01-10T14:20:00Z',
    createdAt: '2024-01-03T00:00:00Z',
    permissions: ['read', 'write']
  }
]

const getMockUserById = (id) => {
  const users = getMockUsers()
  return users.find(user => user.id === parseInt(id))
}

const getMockUserByEmail = (email) => {
  const users = getMockUsers()
  return users.find(user => user.email === email)
}

const getMockAgents = () => [
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    avatar: '/avatars/user2.jpg',
    status: 'active',
    ticketsAssigned: 15,
    ticketsResolved: 12,
    avgResolutionTime: 2.5
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    avatar: '/avatars/user3.jpg',
    status: 'inactive',
    ticketsAssigned: 8,
    ticketsResolved: 6,
    avgResolutionTime: 3.2
  }
]

const getMockAdmins = () => [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: '/avatars/user1.jpg',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z'
  }
]

const getMockUserStats = () => ({
  totalUsers: 3,
  activeUsers: 2,
  inactiveUsers: 1,
  admins: 1,
  agents: 2,
  newUsersThisMonth: 1
})

const getMockUserActivity = (userId) => [
  {
    id: 1,
    action: 'Login',
    description: 'User logged in',
    timestamp: '2024-01-15T10:30:00Z',
    ip: '192.168.1.100'
  },
  {
    id: 2,
    action: 'Update Profile',
    description: 'Updated profile information',
    timestamp: '2024-01-15T09:15:00Z',
    ip: '192.168.1.100'
  },
  {
    id: 3,
    action: 'Create Ticket',
    description: 'Created new ticket #123',
    timestamp: '2024-01-14T16:45:00Z',
    ip: '192.168.1.100'
  }
]

const getMockSearchUsers = (query) => {
  const users = getMockUsers()
  return users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  )
}