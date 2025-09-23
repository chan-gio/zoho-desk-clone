import api from './api'

export const departmentService = {
  // Lấy danh sách departments
  getDepartments: async (params = {}) => {
    try {
      const response = await api.get('/departments', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching departments:', error)
      return getMockDepartments()
    }
  },

  // Lấy department theo ID
  getDepartmentById: async (id) => {
    try {
      const response = await api.get(`/departments/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching department:', error)
      return getMockDepartmentById(id)
    }
  },

  // Tạo department mới (admin only)
  createDepartment: async (departmentData) => {
    try {
      const response = await api.post('/departments', departmentData)
      return response.data
    } catch (error) {
      console.error('Error creating department:', error)
      throw error
    }
  },

  // Cập nhật department (admin only)
  updateDepartment: async (id, departmentData) => {
    try {
      const response = await api.put(`/departments/${id}`, departmentData)
      return response.data
    } catch (error) {
      console.error('Error updating department:', error)
      throw error
    }
  },

  // Xóa department (admin only)
  deleteDepartment: async (id) => {
    try {
      const response = await api.delete(`/departments/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting department:', error)
      throw error
    }
  },

  // Lấy users trong department
  getDepartmentUsers: async (id, params = {}) => {
    try {
      const response = await api.get(`/departments/${id}/users`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching department users:', error)
      return getMockDepartmentUsers(id)
    }
  },

  // Thêm user vào department
  addUserToDepartment: async (departmentId, userId, role = 'member') => {
    try {
      const response = await api.post(`/departments/${departmentId}/users`, {
        userId,
        role
      })
      return response.data
    } catch (error) {
      console.error('Error adding user to department:', error)
      throw error
    }
  },

  // Xóa user khỏi department
  removeUserFromDepartment: async (departmentId, userId) => {
    try {
      const response = await api.delete(`/departments/${departmentId}/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Error removing user from department:', error)
      throw error
    }
  },

  // Cập nhật role của user trong department
  updateUserDepartmentRole: async (departmentId, userId, role) => {
    try {
      const response = await api.patch(`/departments/${departmentId}/users/${userId}`, {
        role
      })
      return response.data
    } catch (error) {
      console.error('Error updating user department role:', error)
      throw error
    }
  },

  // Lấy tickets của department
  getDepartmentTickets: async (id, params = {}) => {
    try {
      const response = await api.get(`/departments/${id}/tickets`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching department tickets:', error)
      return getMockDepartmentTickets(id)
    }
  },

  // Lấy thống kê department
  getDepartmentStats: async (id) => {
    try {
      const response = await api.get(`/departments/${id}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching department stats:', error)
      return getMockDepartmentStats(id)
    }
  },

  // Lấy performance của department
  getDepartmentPerformance: async (id, params = {}) => {
    try {
      const response = await api.get(`/departments/${id}/performance`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching department performance:', error)
      return getMockDepartmentPerformance(id)
    }
  },

  // Tìm kiếm departments
  searchDepartments: async (query, params = {}) => {
    try {
      const response = await api.get('/departments/search', {
        params: { q: query, ...params }
      })
      return response.data || []
    } catch (error) {
      console.error('Error searching departments:', error)
      return getMockSearchDepartments(query)
    }
  },

  // Lấy department hierarchy
  getDepartmentHierarchy: async () => {
    try {
      const response = await api.get('/departments/hierarchy')
      return response.data
    } catch (error) {
      console.error('Error fetching department hierarchy:', error)
      return getMockDepartmentHierarchy()
    }
  },

  // Cập nhật department hierarchy
  updateDepartmentHierarchy: async (hierarchyData) => {
    try {
      const response = await api.put('/departments/hierarchy', hierarchyData)
      return response.data
    } catch (error) {
      console.error('Error updating department hierarchy:', error)
      throw error
    }
  },

  // Lấy department settings
  getDepartmentSettings: async (id) => {
    try {
      const response = await api.get(`/departments/${id}/settings`)
      return response.data
    } catch (error) {
      console.error('Error fetching department settings:', error)
      return getMockDepartmentSettings(id)
    }
  },

  // Cập nhật department settings
  updateDepartmentSettings: async (id, settings) => {
    try {
      const response = await api.put(`/departments/${id}/settings`, settings)
      return response.data
    } catch (error) {
      console.error('Error updating department settings:', error)
      throw error
    }
  },

  // Lấy department activity
  getDepartmentActivity: async (id, params = {}) => {
    try {
      const response = await api.get(`/departments/${id}/activity`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching department activity:', error)
      return getMockDepartmentActivity(id)
    }
  }
}

// Mock data cho development
const getMockDepartments = () => [
  {
    id: 1,
    name: 'Technical Support',
    description: 'Hỗ trợ kỹ thuật cho các vấn đề về hệ thống',
    manager: {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: '/avatars/manager1.jpg'
    },
    parentId: null,
    level: 1,
    userCount: 8,
    ticketCount: 45,
    status: 'active',
    settings: {
      autoAssignment: true,
      sla: 'standard',
      workingHours: '9:00-18:00',
      timezone: 'Asia/Ho_Chi_Minh'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Billing Support',
    description: 'Hỗ trợ các vấn đề về thanh toán và hóa đơn',
    manager: {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      avatar: '/avatars/manager2.jpg'
    },
    parentId: null,
    level: 1,
    userCount: 5,
    ticketCount: 25,
    status: 'active',
    settings: {
      autoAssignment: false,
      sla: 'premium',
      workingHours: '8:00-20:00',
      timezone: 'Asia/Ho_Chi_Minh'
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    name: 'General Support',
    description: 'Hỗ trợ chung cho các câu hỏi và yêu cầu',
    manager: {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      avatar: '/avatars/manager3.jpg'
    },
    parentId: null,
    level: 1,
    userCount: 12,
    ticketCount: 80,
    status: 'active',
    settings: {
      autoAssignment: true,
      sla: 'basic',
      workingHours: '9:00-17:00',
      timezone: 'Asia/Ho_Chi_Minh'
    },
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    name: 'Level 2 Support',
    description: 'Hỗ trợ cấp độ 2 cho các vấn đề phức tạp',
    manager: {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: '/avatars/manager1.jpg'
    },
    parentId: 1,
    level: 2,
    userCount: 3,
    ticketCount: 15,
    status: 'active',
    settings: {
      autoAssignment: false,
      sla: 'premium',
      workingHours: '9:00-18:00',
      timezone: 'Asia/Ho_Chi_Minh'
    },
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  }
]

const getMockDepartmentById = (id) => {
  const departments = getMockDepartments()
  return departments.find(department => department.id === parseInt(id))
}

const getMockDepartmentUsers = (id) => [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: '/avatars/user1.jpg',
    role: 'manager',
    joinedAt: '2024-01-01T00:00:00Z',
    status: 'active'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    avatar: '/avatars/user2.jpg',
    role: 'agent',
    joinedAt: '2024-01-02T00:00:00Z',
    status: 'active'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    avatar: '/avatars/user3.jpg',
    role: 'agent',
    joinedAt: '2024-01-03T00:00:00Z',
    status: 'active'
  }
]

const getMockDepartmentTickets = (id) => [
  {
    id: 123,
    subject: 'Không thể đăng nhập vào hệ thống',
    status: 'open',
    priority: 'high',
    customer: 'Nguyễn Văn D',
    assignedTo: 'Agent 1',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 124,
    subject: 'Lỗi hiển thị trên trang chủ',
    status: 'pending',
    priority: 'medium',
    customer: 'Trần Thị E',
    assignedTo: 'Agent 2',
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 125,
    subject: 'Yêu cầu thêm tính năng mới',
    status: 'resolved',
    priority: 'low',
    customer: 'Lê Văn F',
    assignedTo: 'Agent 3',
    createdAt: '2024-01-13T09:15:00Z'
  }
]

const getMockDepartmentStats = (id) => ({
  totalTickets: 45,
  openTickets: 8,
  pendingTickets: 5,
  resolvedTickets: 30,
  closedTickets: 2,
  avgResolutionTime: 18.5,
  avgResponseTime: 2.1,
  satisfactionRating: 4.3,
  userCount: 8,
  activeUsers: 7,
  workload: 75
})

const getMockDepartmentPerformance = (id) => ({
  period: '30d',
  metrics: {
    ticketsResolved: 30,
    avgResolutionTime: 18.5,
    avgResponseTime: 2.1,
    satisfactionRating: 4.3,
    efficiency: 88.5,
    productivity: 92.0
  },
  trends: {
    daily: [
      { date: '2024-01-15', resolved: 3, responseTime: 1.8 },
      { date: '2024-01-14', resolved: 4, responseTime: 2.2 },
      { date: '2024-01-13', resolved: 2, responseTime: 1.9 }
    ],
    weekly: [
      { week: '2024-W03', resolved: 18, avgResolutionTime: 17.2 },
      { week: '2024-W02', resolved: 15, avgResolutionTime: 19.8 },
      { week: '2024-W01', resolved: 22, avgResolutionTime: 16.5 }
    ]
  },
  topPerformers: [
    { agent: 'Agent 1', resolved: 12, rating: 4.5 },
    { agent: 'Agent 2', resolved: 10, rating: 4.2 },
    { agent: 'Agent 3', resolved: 8, rating: 4.0 }
  ]
})

const getMockSearchDepartments = (query) => {
  const departments = getMockDepartments()
  return departments.filter(department => 
    department.name.toLowerCase().includes(query.toLowerCase()) ||
    department.description.toLowerCase().includes(query.toLowerCase())
  )
}

const getMockDepartmentHierarchy = () => ({
  root: {
    id: 0,
    name: 'Organization',
    children: [
      {
        id: 1,
        name: 'Technical Support',
        children: [
          {
            id: 4,
            name: 'Level 2 Support',
            children: []
          }
        ]
      },
      {
        id: 2,
        name: 'Billing Support',
        children: []
      },
      {
        id: 3,
        name: 'General Support',
        children: []
      }
    ]
  }
})

const getMockDepartmentSettings = (id) => ({
  autoAssignment: true,
  sla: 'standard',
  workingHours: {
    start: '09:00',
    end: '18:00',
    timezone: 'Asia/Ho_Chi_Minh',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  },
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  escalation: {
    enabled: true,
    levels: [
      { time: 2, action: 'notify_supervisor' },
      { time: 8, action: 'notify_manager' }
    ]
  },
  permissions: {
    canAssignTickets: true,
    canEscalateTickets: true,
    canViewAllTickets: false
  }
})

const getMockDepartmentActivity = (id) => [
  {
    id: 1,
    action: 'User Added',
    description: 'Trần Thị B was added to the department',
    user: 'Admin',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    action: 'Settings Updated',
    description: 'Department settings were updated',
    user: 'Manager',
    timestamp: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    action: 'Ticket Assigned',
    description: 'Ticket #123 was assigned to Agent 1',
    user: 'System',
    timestamp: '2024-01-13T09:15:00Z'
  }
]
