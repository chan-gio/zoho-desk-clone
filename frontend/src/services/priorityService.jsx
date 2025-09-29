import api from './api'

export const priorityService = {
  // Lấy danh sách priorities
  getPriorities: async (params = {}) => {
    try {
      const response = await api.get('/priorities', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching priorities:', error)
      throw error
    }
  },

  // Lấy priority theo ID
  getPriorityById: async (id) => {
    try {
      const response = await api.get(`/priorities/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching priority:', error)
      throw error
    }
  },

  // Tạo priority mới
  createPriority: async (priorityData) => {
    try {
      const response = await api.post('/priorities', priorityData)
      return response.data
    } catch (error) {
      console.error('Error creating priority:', error)
      throw error
    }
  },

  // Cập nhật priority
  updatePriority: async ({ id, data }) => {
    try {
      const response = await api.put(`/priorities/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating priority:', error)
      throw error
    }
  },

  // Xóa priority
  deletePriority: async (id) => {
    try {
      const response = await api.delete(`/priorities/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting priority:', error)
      throw error
    }
  },

  // Lấy priority theo tenant
  getPrioritiesByTenant: async (params = {}) => {
    try {
      const response = await api.get('/priorities/tenant', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching priorities by tenant:', error)
      throw error
    }
  }
}
