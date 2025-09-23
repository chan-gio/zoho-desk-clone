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
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Thêm tenant ID nếu có
    const tenantId = localStorage.getItem('tenantId')
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
  (error) => {
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
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('tenantId')
          
          // Chỉ redirect nếu không phải trang login
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login'
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