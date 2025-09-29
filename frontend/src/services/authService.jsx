import api from './api'

export const authService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      
      console.log('🔐 Login - Full response:', response.data)
      
      // Xử lý response format từ API
      if (response.data.success && response.data.data) {
        const { access_token, refresh_token, user } = response.data.data

        console.log('🔐 Login - access_token:', access_token)
        console.log('🔐 Login - refresh_token:', refresh_token)

        // Lưu tokens vào localStorage
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        
        // Verify tokens were saved
        const savedAccessToken = localStorage.getItem('access_token')
        const savedRefreshToken = localStorage.getItem('refresh_token')
        console.log('🔐 Login - saved access_token:', savedAccessToken)
        console.log('🔐 Login - saved refresh_token:', savedRefreshToken)
        
        // Lưu user info vào localStorage (KHÔNG có tenantId ban đầu)
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt
        }))
        
        // KHÔNG lưu tenantId ngay lúc đăng nhập
        // TenantId sẽ được thêm sau khi user chọn tenant

        return response.data
      } else {
        throw new Error('Invalid response format')
      }
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
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      localStorage.removeItem('current_tenant_id')
      
      // Redirect về trang login
      window.location.href = '/login'
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refresh_token')
      console.log('🔄 Refresh token value:', refreshTokenValue)
      
      if (!refreshTokenValue) {
        throw new Error('No refresh token available')
      }

      const response = await api.post('/auth/refresh', {
        refreshToken: refreshTokenValue
      })
      
      console.log('🔄 Refresh response:', response.data)
      
      if (response.data.success && response.data.data) {
        const { access_token } = response.data.data
        
        console.log('🔄 New access_token:', access_token)
        
        if (!access_token) {
          throw new Error('Access token is undefined in response')
        }
        
        localStorage.setItem('access_token', access_token)
        
        // Verify token was saved
        const savedToken = localStorage.getItem('access_token')
        console.log('🔄 Saved token:', savedToken)
        
        return access_token
      } else {
        throw new Error('Invalid response format')
      }
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
    const token = localStorage.getItem('access_token')
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
    const token = localStorage.getItem('access_token')
    console.log('🔑 Getting token from localStorage:', token)
    return token
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
      throw error
    }
  },

  // Chọn tenant và cập nhật JWT với tenantId
  selectTenant: async (tenantId) => {
    try {
      const response = await api.post('/auth/select-tenant', { tenantId })
      
      if (response.data.success && response.data.data) {
        const { access_token, tenant } = response.data.data

        console.log('🏢 SelectTenant - new access_token:', access_token)
        console.log('🏢 SelectTenant - tenant:', tenant)

        // Cập nhật access_token mới với tenantId
        localStorage.setItem('access_token', access_token)
        
        // Verify token was saved
        const savedToken = localStorage.getItem('access_token')
        console.log('🏢 SelectTenant - saved access_token:', savedToken)
        
        // Lấy user info từ token hiện tại
        const currentUser = authService.getCurrentUser()
        
        // Cập nhật user info với tenantId
        if (currentUser) {
          localStorage.setItem('user', JSON.stringify({
            ...currentUser,
            tenantId: tenantId
          }))
        }
        
        // Lưu tenant info
        localStorage.setItem('current_tenant_id', tenantId)

        return response.data
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Select tenant error:', error)
      throw error
    }
  },

  // Chuyển đổi tenant (legacy method - giữ lại để tương thích)
  switchTenant: async (tenantId) => {
    return authService.selectTenant(tenantId)
  },

  // Debug function để kiểm tra tất cả tokens
  debugTokens: () => {
    console.log('🔍 Debug Tokens:')
    console.log('  access_token:', localStorage.getItem('access_token'))
    console.log('  refresh_token:', localStorage.getItem('refresh_token'))
    console.log('  user:', localStorage.getItem('user'))
    console.log('  current_tenant_id:', localStorage.getItem('current_tenant_id'))
    console.log('  selectedTenant:', localStorage.getItem('selectedTenant'))
  },

  // Test function để kiểm tra token flow
  testTokenFlow: async () => {
    console.log('🧪 Testing Token Flow...')
    
    // 1. Kiểm tra tokens hiện tại
    authService.debugTokens()
    
    // 2. Test getToken
    const currentToken = authService.getToken()
    console.log('🧪 Current token from getToken:', currentToken)
    
    // 3. Test isAuthenticated
    const isAuth = authService.isAuthenticated()
    console.log('🧪 Is authenticated:', isAuth)
    
    // 4. Test refresh token nếu có refresh_token
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      console.log('🧪 Testing refresh token...')
      try {
        const newToken = await authService.refreshToken()
        console.log('🧪 New token after refresh:', newToken)
        authService.debugTokens()
      } catch (error) {
        console.error('🧪 Refresh token failed:', error)
      }
    } else {
      console.log('🧪 No refresh token available')
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