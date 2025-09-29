import api from './api'

export const statusService = {
  // Lấy danh sách statuses
  getStatuses: async (params = {}) => {
    try {
      const response = await api.get('/statuses', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching statuses:', error)
      throw error
    }
  },

  // Lấy status theo ID
  getStatusById: async (id) => {
    try {
      const response = await api.get(`/statuses/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching status:', error)
      throw error
    }
  },

  // Tạo status mới
  createStatus: async (statusData) => {
    try {
      const response = await api.post('/statuses', statusData)
      return response.data
    } catch (error) {
      console.error('Error creating status:', error)
      throw error
    }
  },

  // Cập nhật status
  updateStatus: async ({ id, data }) => {
    try {
      const response = await api.put(`/statuses/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating status:', error)
      throw error
    }
  },

  // Xóa status
  deleteStatus: async (id) => {
    try {
      const response = await api.delete(`/statuses/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting status:', error)
      throw error
    }
  },

  // Lấy status theo tenant
  getStatusesByTenant: async (params = {}) => {
    try {
      const response = await api.get('/statuses/tenant', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching statuses by tenant:', error)
      throw error
    }
  }
}
