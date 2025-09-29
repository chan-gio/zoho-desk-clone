import axios from 'axios'

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor để thêm token và xử lý request
api.interceptors.request.use(
  (config) => {
    // Thêm token nếu có
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Thêm tenant ID nếu có
    const tenantId = localStorage.getItem('current_tenant_id')
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId
    }

    // Log request trong development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
        headers: config.headers
      })
    }

    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Biến để tránh refresh token nhiều lần đồng thời
let isRefreshing = false
let failedQueue = []

// Hàm xử lý queue các request bị fail khi đang refresh token
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

// Hàm refresh token
const refreshToken = async () => {
  const refreshTokenValue = localStorage.getItem('refresh_token')
  console.log('🔄 API refreshToken - refresh token value:', refreshTokenValue)
  
  if (!refreshTokenValue) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
      refreshToken: refreshTokenValue
    })

    console.log('🔄 API refreshToken - response:', response.data)

    // Xử lý response format mới
    if (response.data.success && response.data.data) {
      const { access_token } = response.data.data
      
      console.log('🔄 API refreshToken - new access_token:', access_token)
      
      if (!access_token) {
        throw new Error('Access token is undefined in response')
      }
      
      localStorage.setItem('access_token', access_token)
      
      // Verify token was saved
      const savedToken = localStorage.getItem('access_token')
      console.log('🔄 API refreshToken - saved token:', savedToken)
      
      return access_token
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.error('🔄 API refreshToken - error:', error)
    // Refresh token cũng hết hạn, cần login lại
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    localStorage.removeItem('current_tenant_id')
    throw error
  }
}

// Response interceptor để xử lý response và lỗi
api.interceptors.response.use(
  (response) => {
    // Log response trong development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data
      })
    }

    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Log error trong development
    if (import.meta.env.DEV) {
      console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      })
    }

    // Xử lý các loại lỗi khác nhau
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Token hết hạn hoặc không hợp lệ
          console.warn('🚨 401 Unauthorized - Attempting to refresh token')
          
          // Nếu đây là request refresh token, thì không thử refresh nữa
          if (originalRequest.url?.includes('/auth/refresh')) {
            console.warn('🚨 Refresh token failed - Redirecting to login')
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
            localStorage.removeItem('current_tenant_id')
            
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login'
            }
            return Promise.reject(error)
          }

          // Nếu đang refresh token, thêm request vào queue
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject })
            }).then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return api(originalRequest)
            }).catch(err => {
              return Promise.reject(err)
            })
          }

          // Bắt đầu refresh token
          originalRequest._retry = true
          isRefreshing = true

          try {
            const newToken = await refreshToken()
            processQueue(null, newToken)
            
            // Retry request gốc với token mới
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return api(originalRequest)
          } catch (refreshError) {
            processQueue(refreshError, null)
            
            // Refresh token thất bại, redirect về login
            console.warn('🚨 Token refresh failed - Redirecting to login')
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login'
            }
            return Promise.reject(refreshError)
          } finally {
            isRefreshing = false
          }
          break

        case 403:
          // Không có quyền truy cập
          console.error('Access denied:', data.message)
          break

        case 404:
          // Không tìm thấy resource
          console.error('Resource not found:', data.message)
          break

        case 422:
          // Validation error
          console.error('Validation error:', data.errors)
          break

        case 500:
          // Server error
          console.error('Server error:', data.message)
          break

        default:
          console.error('API Error:', data.message || 'Unknown error')
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message)
    } else {
      // Other error
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

// Utility functions
export const apiUtils = {
  // Tạo URL với query parameters
  buildUrl: (endpoint, params = {}) => {
    const url = new URL(endpoint, api.defaults.baseURL)
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key])
      }
    })
    return url.toString()
  },

  // Upload file với progress
  uploadFile: async (endpoint, file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)

    return api.post(endpoint, formData, {
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
  },

  // Download file
  downloadFile: async (endpoint, filename) => {
    const response = await api.get(endpoint, {
      responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }
}

export default api