import api from './api'

export const customerService = {
  // Lấy danh sách khách hàng
  getCustomers: async (params = {}) => {
    try {
      const response = await api.get('/customers', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching customers:', error)
      return getMockCustomers()
    }
  },

  // Lấy khách hàng theo ID
  getCustomerById: async (id) => {
    try {
      const response = await api.get(`/customers/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching customer:', error)
      return getMockCustomerById(id)
    }
  },

  // Tạo khách hàng mới
  createCustomer: async (customerData) => {
    try {
      const response = await api.post('/customers', customerData)
      return response.data
    } catch (error) {
      console.error('Error creating customer:', error)
      throw error
    }
  },

  // Cập nhật khách hàng
  updateCustomer: async (id, customerData) => {
    try {
      const response = await api.put(`/customers/${id}`, customerData)
      return response.data
    } catch (error) {
      console.error('Error updating customer:', error)
      throw error
    }
  },

  // Xóa khách hàng
  deleteCustomer: async (id) => {
    try {
      const response = await api.delete(`/customers/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting customer:', error)
      throw error
    }
  },

  // Tìm kiếm khách hàng
  searchCustomers: async (query, params = {}) => {
    try {
      const response = await api.get('/customers/search', {
        params: { q: query, ...params }
      })
      return response.data || []
    } catch (error) {
      console.error('Error searching customers:', error)
      return getMockSearchCustomers(query)
    }
  },

  // Lấy tickets của khách hàng
  getCustomerTickets: async (customerId, params = {}) => {
    try {
      const response = await api.get(`/customers/${customerId}/tickets`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching customer tickets:', error)
      return getMockCustomerTickets(customerId)
    }
  },

  // Lấy thống kê khách hàng
  getCustomerStats: async (customerId) => {
    try {
      const response = await api.get(`/customers/${customerId}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching customer stats:', error)
      return getMockCustomerStats(customerId)
    }
  },

  // Cập nhật trạng thái khách hàng
  updateCustomerStatus: async (id, status) => {
    try {
      const response = await api.patch(`/customers/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating customer status:', error)
      throw error
    }
  },

  // Thêm ghi chú cho khách hàng
  addCustomerNote: async (customerId, note) => {
    try {
      const response = await api.post(`/customers/${customerId}/notes`, { note })
      return response.data
    } catch (error) {
      console.error('Error adding customer note:', error)
      throw error
    }
  },

  // Lấy ghi chú của khách hàng
  getCustomerNotes: async (customerId) => {
    try {
      const response = await api.get(`/customers/${customerId}/notes`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching customer notes:', error)
      return getMockCustomerNotes(customerId)
    }
  },

  // Upload avatar khách hàng
  uploadCustomerAvatar: async (customerId, file, onProgress) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await api.post(`/customers/${customerId}/avatar`, formData, {
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
      console.error('Error uploading customer avatar:', error)
      throw error
    }
  },

  // Lấy danh sách khách hàng VIP
  getVipCustomers: async () => {
    try {
      const response = await api.get('/customers/vip')
      return response.data || []
    } catch (error) {
      console.error('Error fetching VIP customers:', error)
      return getMockVipCustomers()
    }
  },

  // Cập nhật thông tin liên hệ khách hàng
  updateCustomerContact: async (customerId, contactData) => {
    try {
      const response = await api.patch(`/customers/${customerId}/contact`, contactData)
      return response.data
    } catch (error) {
      console.error('Error updating customer contact:', error)
      throw error
    }
  },

  // Lấy lịch sử hoạt động của khách hàng
  getCustomerActivity: async (customerId, params = {}) => {
    try {
      const response = await api.get(`/customers/${customerId}/activity`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching customer activity:', error)
      return getMockCustomerActivity(customerId)
    }
  }
}

// Mock data cho development
const getMockCustomers = () => [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    company: 'Công ty ABC',
    status: 'active',
    ticketCount: 5,
    createdAt: '2024-01-10T10:30:00Z',
    avatar: '/avatars/customer1.jpg',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    notes: ['Khách hàng VIP', 'Thường xuyên liên hệ']
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0987654321',
    company: 'Công ty XYZ',
    status: 'active',
    ticketCount: 3,
    createdAt: '2024-01-09T14:20:00Z',
    avatar: '/avatars/customer2.jpg',
    address: '456 Đường XYZ, Quận 2, TP.HCM',
    notes: ['Khách hàng mới']
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    phone: '0369852147',
    company: 'Công ty DEF',
    status: 'inactive',
    ticketCount: 1,
    createdAt: '2024-01-08T09:15:00Z',
    avatar: '/avatars/customer3.jpg',
    address: '789 Đường DEF, Quận 3, TP.HCM',
    notes: ['Khách hàng cũ']
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    phone: '0741258963',
    company: 'Công ty GHI',
    status: 'active',
    ticketCount: 8,
    createdAt: '2024-01-07T16:45:00Z',
    avatar: '/avatars/customer4.jpg',
    address: '321 Đường GHI, Quận 4, TP.HCM',
    notes: ['Khách hàng VIP', 'Cần hỗ trợ đặc biệt']
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    phone: '0852369741',
    company: 'Công ty JKL',
    status: 'pending',
    ticketCount: 2,
    createdAt: '2024-01-06T11:30:00Z',
    avatar: '/avatars/customer5.jpg',
    address: '654 Đường JKL, Quận 5, TP.HCM',
    notes: ['Khách hàng tiềm năng']
  }
]

const getMockCustomerById = (id) => {
  const customers = getMockCustomers()
  return customers.find(customer => customer.id === parseInt(id))
}

const getMockSearchCustomers = (query) => {
  const customers = getMockCustomers()
  return customers.filter(customer => 
    customer.name.toLowerCase().includes(query.toLowerCase()) ||
    customer.email.toLowerCase().includes(query.toLowerCase()) ||
    customer.company.toLowerCase().includes(query.toLowerCase())
  )
}

const getMockCustomerTickets = (customerId) => [
  {
    id: 1,
    subject: 'Không thể đăng nhập',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    subject: 'Lỗi hiển thị',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-01-14T14:20:00Z'
  }
]

const getMockCustomerStats = (customerId) => ({
  totalTickets: 5,
  openTickets: 2,
  resolvedTickets: 3,
  avgResolutionTime: 2.5,
  satisfactionRating: 4.2
})

const getMockCustomerNotes = (customerId) => [
  {
    id: 1,
    content: 'Khách hàng VIP, cần hỗ trợ đặc biệt',
    author: 'Agent 1',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    content: 'Thường xuyên liên hệ về các vấn đề kỹ thuật',
    author: 'Agent 2',
    createdAt: '2024-01-14T14:20:00Z'
  }
]

const getMockVipCustomers = () => [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    company: 'Công ty ABC',
    ticketCount: 5,
    vipLevel: 'gold'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    company: 'Công ty GHI',
    ticketCount: 8,
    vipLevel: 'platinum'
  }
]

const getMockCustomerActivity = (customerId) => [
  {
    id: 1,
    action: 'Created Ticket',
    description: 'Created ticket #123',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    action: 'Updated Profile',
    description: 'Updated contact information',
    timestamp: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    action: 'Login',
    description: 'Logged into portal',
    timestamp: '2024-01-13T09:15:00Z'
  }
]
