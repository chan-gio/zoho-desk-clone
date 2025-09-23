import api from './api'

export const roleService = {
  // Lấy tất cả roles
  getAllRoles: async () => {
    try {
      const response = await api.get('/roles')
      return response.data || []
    } catch (error) {
      console.error('Error fetching all roles:', error)
      return getMockAllRoles()
    }
  },

  // Lấy role theo ID
  getRoleById: async (id) => {
    try {
      const response = await api.get(`/roles/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching role:', error)
      return getMockRoleById(id)
    }
  },

  // Tạo role mới (admin only)
  createRole: async (roleData) => {
    try {
      const response = await api.post('/roles', roleData)
      return response.data
    } catch (error) {
      console.error('Error creating role:', error)
      throw error
    }
  },

  // Cập nhật role (admin only)
  updateRole: async (id, roleData) => {
    try {
      const response = await api.put(`/roles/${id}`, roleData)
      return response.data
    } catch (error) {
      console.error('Error updating role:', error)
      throw error
    }
  },

  // Xóa role (admin only)
  deleteRole: async (id) => {
    try {
      const response = await api.delete(`/roles/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting role:', error)
      throw error
    }
  },

  // Kiểm tra role có hợp lệ không
  isValidRole: async (role) => {
    try {
      const response = await api.get(`/roles/validate/${role}`)
      return response.data
    } catch (error) {
      console.error('Error validating role:', error)
      return getMockRoleValidation(role)
    }
  },

  // Lấy permissions của role
  getRolePermissions: async (id) => {
    try {
      const response = await api.get(`/roles/${id}/permissions`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching role permissions:', error)
      return getMockRolePermissions(id)
    }
  },

  // Cập nhật permissions của role
  updateRolePermissions: async (id, permissions) => {
    try {
      const response = await api.put(`/roles/${id}/permissions`, { permissions })
      return response.data
    } catch (error) {
      console.error('Error updating role permissions:', error)
      throw error
    }
  },

  // Lấy users có role này
  getRoleUsers: async (id, params = {}) => {
    try {
      const response = await api.get(`/roles/${id}/users`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching role users:', error)
      return getMockRoleUsers(id)
    }
  },

  // Gán role cho user
  assignRoleToUser: async (roleId, userId) => {
    try {
      const response = await api.post(`/roles/${roleId}/users`, { userId })
      return response.data
    } catch (error) {
      console.error('Error assigning role to user:', error)
      throw error
    }
  },

  // Xóa role khỏi user
  removeRoleFromUser: async (roleId, userId) => {
    try {
      const response = await api.delete(`/roles/${roleId}/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Error removing role from user:', error)
      throw error
    }
  },

  // Lấy tất cả permissions có sẵn
  getAllPermissions: async () => {
    try {
      const response = await api.get('/roles/permissions')
      return response.data || []
    } catch (error) {
      console.error('Error fetching all permissions:', error)
      return getMockAllPermissions()
    }
  },

  // Clone role
  cloneRole: async (id, newName) => {
    try {
      const response = await api.post(`/roles/${id}/clone`, { name: newName })
      return response.data
    } catch (error) {
      console.error('Error cloning role:', error)
      throw error
    }
  },

  // Lấy role hierarchy
  getRoleHierarchy: async () => {
    try {
      const response = await api.get('/roles/hierarchy')
      return response.data
    } catch (error) {
      console.error('Error fetching role hierarchy:', error)
      return getMockRoleHierarchy()
    }
  },

  // Lấy thống kê role
  getRoleStats: async () => {
    try {
      const response = await api.get('/roles/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching role stats:', error)
      return getMockRoleStats()
    }
  }
}

// Mock data cho development
const getMockAllRoles = () => [
  {
    id: 1,
    name: 'super_admin',
    displayName: 'Super Administrator',
    description: 'Toàn quyền hệ thống',
    level: 100,
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.delete',
      'tickets.create', 'tickets.read', 'tickets.update', 'tickets.delete',
      'roles.create', 'roles.read', 'roles.update', 'roles.delete',
      'system.admin', 'system.config'
    ],
    isSystem: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'admin',
    displayName: 'Administrator',
    description: 'Quản trị viên',
    level: 80,
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.delete',
      'tickets.create', 'tickets.read', 'tickets.update', 'tickets.delete',
      'roles.read', 'roles.update',
      'reports.read', 'reports.export'
    ],
    isSystem: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 3,
    name: 'agent',
    displayName: 'Support Agent',
    description: 'Nhân viên hỗ trợ',
    level: 50,
    permissions: [
      'tickets.create', 'tickets.read', 'tickets.update',
      'customers.read',
      'reports.read'
    ],
    isSystem: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 4,
    name: 'customer',
    displayName: 'Customer',
    description: 'Khách hàng',
    level: 10,
    permissions: [
      'tickets.create', 'tickets.read',
      'profile.read', 'profile.update'
    ],
    isSystem: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 5,
    name: 'manager',
    displayName: 'Manager',
    description: 'Quản lý',
    level: 70,
    permissions: [
      'tickets.create', 'tickets.read', 'tickets.update', 'tickets.delete',
      'users.read',
      'reports.read', 'reports.export',
      'analytics.read'
    ],
    isSystem: false,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
]

const getMockRoleById = (id) => {
  const roles = getMockAllRoles()
  return roles.find(role => role.id === parseInt(id))
}

const getMockRoleValidation = (role) => ({
  isValid: ['super_admin', 'admin', 'agent', 'customer', 'manager'].includes(role),
  role: role,
  message: ['super_admin', 'admin', 'agent', 'customer', 'manager'].includes(role) 
    ? 'Role is valid' 
    : 'Role is not valid'
})

const getMockRolePermissions = (id) => {
  const role = getMockRoleById(id)
  return role ? role.permissions : []
}

const getMockRoleUsers = (id) => [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: '/avatars/user1.jpg',
    assignedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    avatar: '/avatars/user2.jpg',
    assignedAt: '2024-01-02T00:00:00Z'
  }
]

const getMockAllPermissions = () => [
  {
    id: 'users.create',
    name: 'Create Users',
    description: 'Tạo user mới',
    category: 'users'
  },
  {
    id: 'users.read',
    name: 'Read Users',
    description: 'Xem danh sách users',
    category: 'users'
  },
  {
    id: 'users.update',
    name: 'Update Users',
    description: 'Cập nhật thông tin user',
    category: 'users'
  },
  {
    id: 'users.delete',
    name: 'Delete Users',
    description: 'Xóa user',
    category: 'users'
  },
  {
    id: 'tickets.create',
    name: 'Create Tickets',
    description: 'Tạo ticket mới',
    category: 'tickets'
  },
  {
    id: 'tickets.read',
    name: 'Read Tickets',
    description: 'Xem danh sách tickets',
    category: 'tickets'
  },
  {
    id: 'tickets.update',
    name: 'Update Tickets',
    description: 'Cập nhật ticket',
    category: 'tickets'
  },
  {
    id: 'tickets.delete',
    name: 'Delete Tickets',
    description: 'Xóa ticket',
    category: 'tickets'
  },
  {
    id: 'roles.create',
    name: 'Create Roles',
    description: 'Tạo role mới',
    category: 'roles'
  },
  {
    id: 'roles.read',
    name: 'Read Roles',
    description: 'Xem danh sách roles',
    category: 'roles'
  },
  {
    id: 'roles.update',
    name: 'Update Roles',
    description: 'Cập nhật role',
    category: 'roles'
  },
  {
    id: 'roles.delete',
    name: 'Delete Roles',
    description: 'Xóa role',
    category: 'roles'
  },
  {
    id: 'system.admin',
    name: 'System Administration',
    description: 'Quản trị hệ thống',
    category: 'system'
  },
  {
    id: 'system.config',
    name: 'System Configuration',
    description: 'Cấu hình hệ thống',
    category: 'system'
  },
  {
    id: 'reports.read',
    name: 'Read Reports',
    description: 'Xem báo cáo',
    category: 'reports'
  },
  {
    id: 'reports.export',
    name: 'Export Reports',
    description: 'Xuất báo cáo',
    category: 'reports'
  },
  {
    id: 'customers.read',
    name: 'Read Customers',
    description: 'Xem thông tin khách hàng',
    category: 'customers'
  },
  {
    id: 'profile.read',
    name: 'Read Profile',
    description: 'Xem profile cá nhân',
    category: 'profile'
  },
  {
    id: 'profile.update',
    name: 'Update Profile',
    description: 'Cập nhật profile cá nhân',
    category: 'profile'
  },
  {
    id: 'analytics.read',
    name: 'Read Analytics',
    description: 'Xem phân tích dữ liệu',
    category: 'analytics'
  }
]

const getMockRoleHierarchy = () => ({
  levels: [
    { level: 100, name: 'Super Admin', roles: ['super_admin'] },
    { level: 80, name: 'Admin', roles: ['admin'] },
    { level: 70, name: 'Manager', roles: ['manager'] },
    { level: 50, name: 'Agent', roles: ['agent'] },
    { level: 10, name: 'Customer', roles: ['customer'] }
  ],
  inheritance: {
    'super_admin': ['admin', 'manager', 'agent', 'customer'],
    'admin': ['manager', 'agent', 'customer'],
    'manager': ['agent', 'customer'],
    'agent': ['customer'],
    'customer': []
  }
})

const getMockRoleStats = () => ({
  totalRoles: 5,
  systemRoles: 4,
  customRoles: 1,
  totalUsers: 25,
  roleDistribution: [
    { role: 'super_admin', count: 1 },
    { role: 'admin', count: 3 },
    { role: 'manager', count: 5 },
    { role: 'agent', count: 10 },
    { role: 'customer', count: 6 }
  ]
})
