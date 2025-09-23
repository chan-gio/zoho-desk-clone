import api from './api'

export const tenantService = {
  // Lấy tất cả tenants (public route)
  getAllTenants: async () => {
    try {
      const response = await api.get('/tenants')
      return response.data || []
    } catch (error) {
      console.error('Error fetching all tenants:', error)
      return getMockAllTenants()
    }
  },

  // Lấy tenant theo ID (public route)
  getTenantById: async (id) => {
    try {
      const response = await api.get(`/tenants/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching tenant:', error)
      return getMockTenantById(id)
    }
  },

  // Lấy tenants theo user ID
  getTenantsByUserId: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/tenants`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching user tenants:', error)
      return getMockUserTenants(userId)
    }
  },

  // Tạo tenant mới (admin/super_admin only)
  createTenant: async (tenantData) => {
    try {
      const response = await api.post('/tenants', tenantData)
      return response.data
    } catch (error) {
      console.error('Error creating tenant:', error)
      throw error
    }
  },

  // Cập nhật tenant (admin/super_admin only)
  updateTenant: async (id, tenantData) => {
    try {
      const response = await api.put(`/tenants/${id}`, tenantData)
      return response.data
    } catch (error) {
      console.error('Error updating tenant:', error)
      throw error
    }
  },

  // Xóa tenant (admin/super_admin only)
  deleteTenant: async (id) => {
    try {
      const response = await api.delete(`/tenants/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting tenant:', error)
      throw error
    }
  },

  // Lấy thống kê tenant (admin/agent)
  getTenantStats: async (id) => {
    try {
      const response = await api.get(`/tenants/${id}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching tenant stats:', error)
      return getMockTenantStats(id)
    }
  },

  // Thêm user vào tenant (admin/super_admin only)
  addUserToTenant: async (tenantId, userData) => {
    try {
      const response = await api.post(`/tenants/${tenantId}/users`, userData)
      return response.data
    } catch (error) {
      console.error('Error adding user to tenant:', error)
      throw error
    }
  },

  // Xóa user khỏi tenant (admin/super_admin only)
  removeUserFromTenant: async (tenantId, userId) => {
    try {
      const response = await api.delete(`/tenants/${tenantId}/users`, {
        data: { userId }
      })
      return response.data
    } catch (error) {
      console.error('Error removing user from tenant:', error)
      throw error
    }
  },

  // Lấy danh sách users trong tenant
  getTenantUsers: async (tenantId, params = {}) => {
    try {
      const response = await api.get(`/tenants/${tenantId}/users`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching tenant users:', error)
      return getMockTenantUsers(tenantId)
    }
  },

  // Cập nhật cài đặt tenant
  updateTenantSettings: async (tenantId, settings) => {
    try {
      const response = await api.put(`/tenants/${tenantId}/settings`, settings)
      return response.data
    } catch (error) {
      console.error('Error updating tenant settings:', error)
      throw error
    }
  },

  // Lấy cài đặt tenant
  getTenantSettings: async (tenantId) => {
    try {
      const response = await api.get(`/tenants/${tenantId}/settings`)
      return response.data
    } catch (error) {
      console.error('Error fetching tenant settings:', error)
      return getMockTenantSettings(tenantId)
    }
  },

  // Upload logo tenant
  uploadTenantLogo: async (tenantId, file, onProgress) => {
    try {
      const formData = new FormData()
      formData.append('logo', file)

      const response = await api.post(`/tenants/${tenantId}/logo`, formData, {
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

      return response.data
    } catch (error) {
      console.error('Error uploading tenant logo:', error)
      throw error
    }
  },

  // Xóa logo tenant
  deleteTenantLogo: async (tenantId) => {
    try {
      const response = await api.delete(`/tenants/${tenantId}/logo`)
      return response.data
    } catch (error) {
      console.error('Error deleting tenant logo:', error)
      throw error
    }
  },

  // Lấy hoạt động của tenant
  getTenantActivity: async (tenantId, params = {}) => {
    try {
      const response = await api.get(`/tenants/${tenantId}/activity`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching tenant activity:', error)
      return getMockTenantActivity(tenantId)
    }
  },

  // Tìm kiếm tenants
  searchTenants: async (query, params = {}) => {
    try {
      const response = await api.get('/tenants/search', {
        params: { q: query, ...params }
      })
      return response.data || []
    } catch (error) {
      console.error('Error searching tenants:', error)
      return getMockSearchTenants(query)
    }
  },

  // Lấy billing information của tenant
  getTenantBilling: async (tenantId) => {
    try {
      const response = await api.get(`/tenants/${tenantId}/billing`)
      return response.data
    } catch (error) {
      console.error('Error fetching tenant billing:', error)
      return getMockTenantBilling(tenantId)
    }
  },

  // Cập nhật billing information
  updateTenantBilling: async (tenantId, billingData) => {
    try {
      const response = await api.put(`/tenants/${tenantId}/billing`, billingData)
      return response.data
    } catch (error) {
      console.error('Error updating tenant billing:', error)
      throw error
    }
  }
}

// Mock data cho development
const getMockAllTenants = () => [
  {
    id: 1,
    name: 'Công ty ABC',
    domain: 'abc.com',
    logo: '/logos/abc.png',
    status: 'active',
    plan: 'premium',
    createdAt: '2024-01-01T00:00:00Z',
    settings: {
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      currency: 'VND',
      features: ['tickets', 'reports', 'custom_fields']
    }
  },
  {
    id: 2,
    name: 'Công ty XYZ',
    domain: 'xyz.com',
    logo: '/logos/xyz.png',
    status: 'active',
    plan: 'basic',
    createdAt: '2024-01-02T00:00:00Z',
    settings: {
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'en',
      currency: 'USD',
      features: ['tickets', 'reports']
    }
  },
  {
    id: 3,
    name: 'Công ty DEF',
    domain: 'def.com',
    logo: '/logos/def.png',
    status: 'inactive',
    plan: 'trial',
    createdAt: '2024-01-03T00:00:00Z',
    settings: {
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      currency: 'VND',
      features: ['tickets']
    }
  }
]

const getMockTenantById = (id) => {
  const tenants = getMockAllTenants()
  return tenants.find(tenant => tenant.id === parseInt(id))
}

const getMockUserTenants = (userId) => [
  {
    id: 1,
    name: 'Công ty ABC',
    domain: 'abc.com',
    logo: '/logos/abc.png',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Công ty XYZ',
    domain: 'xyz.com',
    logo: '/logos/xyz.png',
    role: 'agent',
    status: 'active',
    joinedAt: '2024-01-02T00:00:00Z'
  }
]

const getMockTenantStats = (id) => ({
  totalUsers: 25,
  activeUsers: 20,
  totalTickets: 150,
  openTickets: 30,
  resolvedTickets: 120,
  avgResolutionTime: 24.5,
  customerSatisfaction: 4.2,
  monthlyGrowth: 15.5
})

const getMockTenantUsers = (tenantId) => [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    role: 'agent',
    status: 'active',
    joinedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    role: 'agent',
    status: 'inactive',
    joinedAt: '2024-01-03T00:00:00Z'
  }
]

const getMockTenantSettings = (tenantId) => ({
  timezone: 'Asia/Ho_Chi_Minh',
  language: 'vi',
  currency: 'VND',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '24h',
  features: {
    tickets: true,
    reports: true,
    customFields: true,
    workflows: true,
    integrations: false
  },
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  branding: {
    primaryColor: '#1890ff',
    secondaryColor: '#52c41a',
    logo: '/logos/tenant.png',
    favicon: '/favicons/tenant.ico'
  }
})

const getMockTenantActivity = (tenantId) => [
  {
    id: 1,
    action: 'User Added',
    description: 'Nguyễn Văn A was added to the tenant',
    user: 'Admin',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    action: 'Settings Updated',
    description: 'Tenant settings were updated',
    user: 'Admin',
    timestamp: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    action: 'Plan Changed',
    description: 'Plan upgraded to Premium',
    user: 'Admin',
    timestamp: '2024-01-13T09:15:00Z'
  }
]

const getMockSearchTenants = (query) => {
  const tenants = getMockAllTenants()
  return tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(query.toLowerCase()) ||
    tenant.domain.toLowerCase().includes(query.toLowerCase())
  )
}

const getMockTenantBilling = (tenantId) => ({
  plan: 'premium',
  status: 'active',
  billingCycle: 'monthly',
  nextBillingDate: '2024-02-01T00:00:00Z',
  amount: 99.99,
  currency: 'USD',
  paymentMethod: 'credit_card',
  lastPayment: {
    date: '2024-01-01T00:00:00Z',
    amount: 99.99,
    status: 'success'
  },
  usage: {
    users: 20,
    tickets: 150,
    storage: '2.5GB',
    apiCalls: 15000
  }
})
