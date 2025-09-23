import api from './api'

export const authService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      const { token, user, tenant } = response.data

      // Lưu thông tin vào localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      if (tenant) {
        localStorage.setItem('tenantId', tenant.id)
        localStorage.setItem('tenant', JSON.stringify(tenant))
      }

      return { token, user, tenant }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      // Gọi API logout nếu cần
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Xóa thông tin khỏi localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('tenantId')
      localStorage.removeItem('tenant')
      
      // Redirect về trang login
      window.location.href = '/login'
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh')
      const { token } = response.data
      
      localStorage.setItem('token', token)
      return token
    } catch (error) {
      console.error('Refresh token error:', error)
      // Nếu refresh token thất bại, logout
      await authService.logout()
      throw error
    }
  },

  // Quên mật khẩu
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      console.error('Forgot password error:', error)
      throw error
    }
  },

  // Reset mật khẩu
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        password: newPassword
      })
      return response.data
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  },

  // Đổi mật khẩu
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      })
      return response.data
    } catch (error) {
      console.error('Change password error:', error)
      throw error
    }
  },

  // Xác thực email
  verifyEmail: async (token) => {
    try {
      const response = await api.post('/auth/verify-email', { token })
      return response.data
    } catch (error) {
      console.error('Verify email error:', error)
      throw error
    }
  },

  // Gửi lại email xác thực
  resendVerificationEmail: async () => {
    try {
      const response = await api.post('/auth/resend-verification')
      return response.data
    } catch (error) {
      console.error('Resend verification error:', error)
      throw error
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  },

  // Kiểm tra token có hợp lệ không
  isAuthenticated: () => {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
      // Decode JWT token để kiểm tra expiry
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      
      return payload.exp > currentTime
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  },

  // Lấy token
  getToken: () => {
    return localStorage.getItem('token')
  },

  // Kiểm tra quyền
  hasPermission: (permission) => {
    const user = authService.getCurrentUser()
    if (!user || !user.permissions) return false
    
    return user.permissions.includes(permission)
  },

  // Kiểm tra role
  hasRole: (role) => {
    const user = authService.getCurrentUser()
    if (!user || !user.roles) return false
    
    return user.roles.includes(role)
  },

  // Lấy danh sách tenants của user
  getUserTenants: async () => {
    try {
      const response = await api.get('/auth/tenants')
      return response.data
    } catch (error) {
      console.error('Get user tenants error:', error)
      return getMockTenants()
    }
  },

  // Chuyển đổi tenant
  switchTenant: async (tenantId) => {
    try {
      const response = await api.post('/auth/switch-tenant', { tenantId })
      const { token, user, tenant } = response.data

      // Cập nhật thông tin trong localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('tenantId', tenant.id)
      localStorage.setItem('tenant', JSON.stringify(tenant))

      return { token, user, tenant }
    } catch (error) {
      console.error('Switch tenant error:', error)
      throw error
    }
  }
}

// Mock data cho development
const getMockTenants = () => [
  {
    id: 1,
    name: 'Công ty ABC',
    domain: 'abc.com',
    logo: '/logos/abc.png',
    settings: {
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      currency: 'VND'
    }
  },
  {
    id: 2,
    name: 'Công ty XYZ',
    domain: 'xyz.com',
    logo: '/logos/xyz.png',
    settings: {
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'en',
      currency: 'USD'
    }
  }
]