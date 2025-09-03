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

  // Cập nhật khách hàng
  updateCustomer: async (customerData) => {
    try {
      const response = await api.put(`/customers/${customerData.id}`, customerData)
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
  },
]
