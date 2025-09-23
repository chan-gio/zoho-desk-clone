import api from './api'

export const columnService = {
  // Khởi tạo columns mặc định
  initializeDefaultColumns: async () => {
    try {
      const response = await api.post('/columns/initialize-defaults')
      return response.data
    } catch (error) {
      console.error('Error initializing default columns:', error)
      throw error
    }
  },

  // Lấy tickets theo column
  getTicketsByColumn: async (columnId, params = {}) => {
    try {
      const response = await api.get(`/columns/${columnId}/tickets`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching tickets by column:', error)
      return getMockTicketsByColumn(columnId)
    }
  },

  // Tạo column mới
  createColumn: async (columnData) => {
    try {
      const response = await api.post('/columns', columnData)
      return response.data
    } catch (error) {
      console.error('Error creating column:', error)
      throw error
    }
  },

  // Lấy columns theo tenant
  getColumnsByTenant: async (params = {}) => {
    try {
      const response = await api.get('/columns', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching columns by tenant:', error)
      return getMockColumns()
    }
  },

  // Lấy column theo ID
  getColumnById: async (id) => {
    try {
      const response = await api.get(`/columns/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching column:', error)
      return getMockColumnById(id)
    }
  },

  // Cập nhật column
  updateColumn: async (id, columnData) => {
    try {
      const response = await api.put(`/columns/${id}`, columnData)
      return response.data
    } catch (error) {
      console.error('Error updating column:', error)
      throw error
    }
  },

  // Xóa column
  deleteColumn: async (id) => {
    try {
      const response = await api.delete(`/columns/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting column:', error)
      throw error
    }
  },

  // Sắp xếp lại columns
  reorderColumns: async (columnOrder) => {
    try {
      const response = await api.put('/columns/reorder', { columnOrder })
      return response.data
    } catch (error) {
      console.error('Error reordering columns:', error)
      throw error
    }
  },

  // Di chuyển ticket sang column khác
  moveTicketToColumn: async (ticketId, fromColumnId, toColumnId, position = null) => {
    try {
      const response = await api.put('/columns/move-ticket', {
        ticketId,
        fromColumnId,
        toColumnId,
        position
      })
      return response.data
    } catch (error) {
      console.error('Error moving ticket to column:', error)
      throw error
    }
  },

  // Sắp xếp lại tickets trong column
  reorderTicketsInColumn: async (columnId, ticketOrder) => {
    try {
      const response = await api.put('/columns/reorder-tickets', {
        columnId,
        ticketOrder
      })
      return response.data
    } catch (error) {
      console.error('Error reordering tickets in column:', error)
      throw error
    }
  },

  // Lấy column settings
  getColumnSettings: async (id) => {
    try {
      const response = await api.get(`/columns/${id}/settings`)
      return response.data
    } catch (error) {
      console.error('Error fetching column settings:', error)
      return getMockColumnSettings(id)
    }
  },

  // Cập nhật column settings
  updateColumnSettings: async (id, settings) => {
    try {
      const response = await api.put(`/columns/${id}/settings`, settings)
      return response.data
    } catch (error) {
      console.error('Error updating column settings:', error)
      throw error
    }
  },

  // Lấy column statistics
  getColumnStats: async (id) => {
    try {
      const response = await api.get(`/columns/${id}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching column stats:', error)
      return getMockColumnStats(id)
    }
  },

  // Lấy column activity
  getColumnActivity: async (id, params = {}) => {
    try {
      const response = await api.get(`/columns/${id}/activity`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching column activity:', error)
      return getMockColumnActivity(id)
    }
  },

  // Clone column
  cloneColumn: async (id, newName) => {
    try {
      const response = await api.post(`/columns/${id}/clone`, { name: newName })
      return response.data
    } catch (error) {
      console.error('Error cloning column:', error)
      throw error
    }
  },

  // Archive column
  archiveColumn: async (id) => {
    try {
      const response = await api.patch(`/columns/${id}/archive`)
      return response.data
    } catch (error) {
      console.error('Error archiving column:', error)
      throw error
    }
  },

  // Restore column
  restoreColumn: async (id) => {
    try {
      const response = await api.patch(`/columns/${id}/restore`)
      return response.data
    } catch (error) {
      console.error('Error restoring column:', error)
      throw error
    }
  },

  // Lấy archived columns
  getArchivedColumns: async (params = {}) => {
    try {
      const response = await api.get('/columns/archived', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching archived columns:', error)
      return getMockArchivedColumns()
    }
  },

  // Bulk operations
  // Di chuyển nhiều tickets cùng lúc
  moveMultipleTickets: async (ticketIds, fromColumnId, toColumnId) => {
    try {
      const response = await api.put('/columns/move-multiple-tickets', {
        ticketIds,
        fromColumnId,
        toColumnId
      })
      return response.data
    } catch (error) {
      console.error('Error moving multiple tickets:', error)
      throw error
    }
  },

  // Cập nhật nhiều columns cùng lúc
  updateMultipleColumns: async (updates) => {
    try {
      const response = await api.put('/columns/bulk-update', { updates })
      return response.data
    } catch (error) {
      console.error('Error updating multiple columns:', error)
      throw error
    }
  }
}

// Mock data cho development
const getMockColumns = () => [
  {
    id: 'todo',
    name: 'To Do',
    description: 'Tickets cần được xử lý',
    color: '#8B5CF6',
    order: 1,
    ticketCount: 5,
    maxTickets: null,
    status: 'active',
    settings: {
      autoAssignment: false,
      allowTicketCreation: true,
      allowTicketEditing: true,
      requireApproval: false
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'in-progress',
    name: 'In Progress',
    description: 'Tickets đang được xử lý',
    color: '#3B82F6',
    order: 2,
    ticketCount: 3,
    maxTickets: null,
    status: 'active',
    settings: {
      autoAssignment: false,
      allowTicketCreation: false,
      allowTicketEditing: true,
      requireApproval: false
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'review',
    name: 'Review',
    description: 'Tickets cần được review',
    color: '#F59E0B',
    order: 3,
    ticketCount: 2,
    maxTickets: null,
    status: 'active',
    settings: {
      autoAssignment: false,
      allowTicketCreation: false,
      allowTicketEditing: true,
      requireApproval: true
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'done',
    name: 'Done',
    description: 'Tickets đã hoàn thành',
    color: '#10B981',
    order: 4,
    ticketCount: 8,
    maxTickets: null,
    status: 'active',
    settings: {
      autoAssignment: false,
      allowTicketCreation: false,
      allowTicketEditing: false,
      requireApproval: false
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
]

const getMockColumnById = (id) => {
  const columns = getMockColumns()
  return columns.find(column => column.id === id)
}

const getMockTicketsByColumn = (columnId) => [
  {
    id: 1,
    title: 'Fix login issue',
    description: 'Users cannot login with Google account',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-01-15',
    tags: ['bug', 'auth'],
    columnId: columnId,
    order: 1
  },
  {
    id: 2,
    title: 'Update documentation',
    description: 'Update API documentation for new endpoints',
    priority: 'medium',
    assignee: 'Jane Smith',
    dueDate: '2024-01-20',
    tags: ['documentation'],
    columnId: columnId,
    order: 2
  }
]

const getMockColumnSettings = (id) => ({
  autoAssignment: false,
  allowTicketCreation: true,
  allowTicketEditing: true,
  requireApproval: false,
  maxTickets: null,
  color: '#8B5CF6',
  notifications: {
    onTicketAdded: true,
    onTicketMoved: true,
    onTicketUpdated: false
  },
  permissions: {
    canMoveTickets: true,
    canEditTickets: true,
    canDeleteTickets: false
  }
})

const getMockColumnStats = (id) => ({
  totalTickets: 5,
  avgResolutionTime: 24.5,
  avgResponseTime: 2.3,
  satisfactionRating: 4.2,
  throughput: 12, // tickets per week
  trends: {
    daily: [
      { date: '2024-01-15', tickets: 2 },
      { date: '2024-01-14', tickets: 3 },
      { date: '2024-01-13', tickets: 1 }
    ]
  }
})

const getMockColumnActivity = (id) => [
  {
    id: 1,
    action: 'Ticket Moved',
    description: 'Ticket #123 was moved to this column',
    user: 'Agent 1',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    action: 'Column Updated',
    description: 'Column settings were updated',
    user: 'Admin',
    timestamp: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    action: 'Ticket Created',
    description: 'New ticket #124 was created in this column',
    user: 'Customer',
    timestamp: '2024-01-13T09:15:00Z'
  }
]

const getMockArchivedColumns = () => [
  {
    id: 'archived-1',
    name: 'Old Backlog',
    description: 'Old tickets that are no longer relevant',
    color: '#6B7280',
    order: 0,
    ticketCount: 0,
    status: 'archived',
    archivedAt: '2024-01-10T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  }
]
