import api from './api'

export const knowledgeBaseService = {
  // Article operations
  // Lấy danh sách articles
  getArticles: async (params = {}) => {
    try {
      const response = await api.get('/knowledge-base/articles', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching articles:', error)
      return getMockArticles()
    }
  },

  // Lấy article theo ID
  getArticleById: async (id) => {
    try {
      const response = await api.get(`/knowledge-base/articles/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching article:', error)
      return getMockArticleById(id)
    }
  },

  // Tạo article mới
  createArticle: async (articleData) => {
    try {
      const response = await api.post('/knowledge-base/articles', articleData)
      return response.data
    } catch (error) {
      console.error('Error creating article:', error)
      throw error
    }
  },

  // Cập nhật article
  updateArticle: async (id, articleData) => {
    try {
      const response = await api.put(`/knowledge-base/articles/${id}`, articleData)
      return response.data
    } catch (error) {
      console.error('Error updating article:', error)
      throw error
    }
  },

  // Xóa article
  deleteArticle: async (id) => {
    try {
      const response = await api.delete(`/knowledge-base/articles/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting article:', error)
      throw error
    }
  },

  // Category operations
  // Lấy danh sách categories
  getCategories: async (params = {}) => {
    try {
      const response = await api.get('/knowledge-base/categories', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      return getMockCategories()
    }
  },

  // Lấy category theo ID
  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/knowledge-base/categories/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching category:', error)
      return getMockCategoryById(id)
    }
  },

  // Tạo category mới
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/knowledge-base/categories', categoryData)
      return response.data
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  },

  // Cập nhật category
  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.put(`/knowledge-base/categories/${id}`, categoryData)
      return response.data
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  },

  // Xóa category
  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/knowledge-base/categories/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  },

  // Search operations
  // Tìm kiếm articles
  searchArticles: async (query, params = {}) => {
    try {
      const response = await api.get('/knowledge-base/search/articles', {
        params: { q: query, ...params }
      })
      return response.data || []
    } catch (error) {
      console.error('Error searching articles:', error)
      return getMockSearchArticles(query)
    }
  },

  // Tìm kiếm categories
  searchCategories: async (query, params = {}) => {
    try {
      const response = await api.get('/knowledge-base/search/categories', {
        params: { q: query, ...params }
      })
      return response.data || []
    } catch (error) {
      console.error('Error searching categories:', error)
      return getMockSearchCategories(query)
    }
  },

  // Lấy articles theo category
  getArticlesByCategory: async (categoryId, params = {}) => {
    try {
      const response = await api.get(`/knowledge-base/categories/${categoryId}/articles`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching articles by category:', error)
      return getMockArticlesByCategory(categoryId)
    }
  },

  // Lấy articles phổ biến
  getPopularArticles: async (params = {}) => {
    try {
      const response = await api.get('/knowledge-base/articles/popular', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching popular articles:', error)
      return getMockPopularArticles()
    }
  },

  // Lấy articles gần đây
  getRecentArticles: async (params = {}) => {
    try {
      const response = await api.get('/knowledge-base/articles/recent', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching recent articles:', error)
      return getMockRecentArticles()
    }
  },

  // Cập nhật view count của article
  incrementArticleViews: async (id) => {
    try {
      const response = await api.patch(`/knowledge-base/articles/${id}/views`)
      return response.data
    } catch (error) {
      console.error('Error incrementing article views:', error)
      throw error
    }
  },

  // Đánh giá article
  rateArticle: async (id, rating) => {
    try {
      const response = await api.post(`/knowledge-base/articles/${id}/rate`, { rating })
      return response.data
    } catch (error) {
      console.error('Error rating article:', error)
      throw error
    }
  },

  // Lấy ratings của article
  getArticleRatings: async (id) => {
    try {
      const response = await api.get(`/knowledge-base/articles/${id}/ratings`)
      return response.data
    } catch (error) {
      console.error('Error fetching article ratings:', error)
      return getMockArticleRatings(id)
    }
  },

  // Thêm comment vào article
  addArticleComment: async (id, commentData) => {
    try {
      const response = await api.post(`/knowledge-base/articles/${id}/comments`, commentData)
      return response.data
    } catch (error) {
      console.error('Error adding article comment:', error)
      throw error
    }
  },

  // Lấy comments của article
  getArticleComments: async (id, params = {}) => {
    try {
      const response = await api.get(`/knowledge-base/articles/${id}/comments`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching article comments:', error)
      return getMockArticleComments(id)
    }
  },

  // Upload attachment cho article
  uploadArticleAttachment: async (id, file, onProgress) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post(`/knowledge-base/articles/${id}/attachments`, formData, {
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

      return response.data
    } catch (error) {
      console.error('Error uploading article attachment:', error)
      throw error
    }
  },

  // Lấy attachments của article
  getArticleAttachments: async (id) => {
    try {
      const response = await api.get(`/knowledge-base/articles/${id}/attachments`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching article attachments:', error)
      return getMockArticleAttachments(id)
    }
  },

  // Download attachment
  downloadAttachment: async (articleId, attachmentId, filename) => {
    try {
      const response = await api.get(`/knowledge-base/articles/${articleId}/attachments/${attachmentId}/download`, {
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

      return response.data
    } catch (error) {
      console.error('Error downloading attachment:', error)
      throw error
    }
  },

  // Lấy thống kê knowledge base
  getKnowledgeBaseStats: async () => {
    try {
      const response = await api.get('/knowledge-base/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching knowledge base stats:', error)
      return getMockKnowledgeBaseStats()
    }
  }
}

// Mock data cho development
const getMockArticles = () => [
  {
    id: 1,
    title: 'Cách đăng nhập vào hệ thống',
    content: 'Hướng dẫn chi tiết cách đăng nhập vào hệ thống support...',
    summary: 'Hướng dẫn đăng nhập hệ thống',
    categoryId: 1,
    categoryName: 'Hướng dẫn cơ bản',
    author: {
      id: 1,
      name: 'Admin',
      avatar: '/avatars/admin.jpg'
    },
    status: 'published',
    views: 1250,
    rating: 4.5,
    tags: ['login', 'authentication', 'guide'],
    attachments: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Khắc phục lỗi thanh toán',
    content: 'Các bước khắc phục lỗi thanh toán thường gặp...',
    summary: 'Khắc phục lỗi thanh toán',
    categoryId: 2,
    categoryName: 'Khắc phục sự cố',
    author: {
      id: 2,
      name: 'Support Agent',
      avatar: '/avatars/agent.jpg'
    },
    status: 'published',
    views: 890,
    rating: 4.2,
    tags: ['payment', 'troubleshooting', 'error'],
    attachments: [],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    title: 'Cấu hình email notifications',
    content: 'Hướng dẫn cấu hình thông báo email...',
    summary: 'Cấu hình thông báo email',
    categoryId: 3,
    categoryName: 'Cấu hình hệ thống',
    author: {
      id: 1,
      name: 'Admin',
      avatar: '/avatars/admin.jpg'
    },
    status: 'draft',
    views: 0,
    rating: 0,
    tags: ['email', 'notifications', 'configuration'],
    attachments: [],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  }
]

const getMockArticleById = (id) => {
  const articles = getMockArticles()
  return articles.find(article => article.id === parseInt(id))
}

const getMockCategories = () => [
  {
    id: 1,
    name: 'Hướng dẫn cơ bản',
    description: 'Các hướng dẫn cơ bản cho người dùng mới',
    parentId: null,
    articleCount: 15,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Khắc phục sự cố',
    description: 'Hướng dẫn khắc phục các sự cố thường gặp',
    parentId: null,
    articleCount: 25,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 3,
    name: 'Cấu hình hệ thống',
    description: 'Hướng dẫn cấu hình các tính năng hệ thống',
    parentId: null,
    articleCount: 8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 4,
    name: 'API Documentation',
    description: 'Tài liệu API cho developers',
    parentId: 3,
    articleCount: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
]

const getMockCategoryById = (id) => {
  const categories = getMockCategories()
  return categories.find(category => category.id === parseInt(id))
}

const getMockSearchArticles = (query) => {
  const articles = getMockArticles()
  return articles.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.content.toLowerCase().includes(query.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )
}

const getMockSearchCategories = (query) => {
  const categories = getMockCategories()
  return categories.filter(category => 
    category.name.toLowerCase().includes(query.toLowerCase()) ||
    category.description.toLowerCase().includes(query.toLowerCase())
  )
}

const getMockArticlesByCategory = (categoryId) => {
  const articles = getMockArticles()
  return articles.filter(article => article.categoryId === parseInt(categoryId))
}

const getMockPopularArticles = () => [
  {
    id: 1,
    title: 'Cách đăng nhập vào hệ thống',
    views: 1250,
    rating: 4.5
  },
  {
    id: 2,
    title: 'Khắc phục lỗi thanh toán',
    views: 890,
    rating: 4.2
  },
  {
    id: 5,
    title: 'Hướng dẫn sử dụng mobile app',
    views: 750,
    rating: 4.3
  }
]

const getMockRecentArticles = () => [
  {
    id: 3,
    title: 'Cấu hình email notifications',
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 2,
    title: 'Khắc phục lỗi thanh toán',
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 1,
    title: 'Cách đăng nhập vào hệ thống',
    createdAt: '2024-01-15T10:30:00Z'
  }
]

const getMockArticleRatings = (id) => ({
  average: 4.5,
  total: 125,
  distribution: {
    5: 80,
    4: 30,
    3: 10,
    2: 3,
    1: 2
  }
})

const getMockArticleComments = (id) => [
  {
    id: 1,
    content: 'Rất hữu ích, cảm ơn!',
    author: {
      id: 3,
      name: 'Customer A',
      avatar: '/avatars/customer1.jpg'
    },
    createdAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 2,
    content: 'Tôi đã làm theo và thành công',
    author: {
      id: 4,
      name: 'Customer B',
      avatar: '/avatars/customer2.jpg'
    },
    createdAt: '2024-01-15T12:30:00Z'
  }
]

const getMockArticleAttachments = (id) => [
  {
    id: 1,
    name: 'screenshot_login.png',
    size: '2.5 MB',
    type: 'image/png',
    url: '/attachments/screenshot_login.png',
    uploadedAt: '2024-01-15T10:45:00Z'
  }
]

const getMockKnowledgeBaseStats = () => ({
  totalArticles: 48,
  publishedArticles: 45,
  draftArticles: 3,
  totalCategories: 4,
  totalViews: 15680,
  avgRating: 4.3,
  popularCategories: [
    { id: 2, name: 'Khắc phục sự cố', articleCount: 25 },
    { id: 1, name: 'Hướng dẫn cơ bản', articleCount: 15 },
    { id: 3, name: 'Cấu hình hệ thống', articleCount: 8 }
  ],
  recentActivity: [
    { type: 'article_created', description: 'New article created', time: '2024-01-15T10:30:00Z' },
    { type: 'article_updated', description: 'Article updated', time: '2024-01-15T09:15:00Z' },
    { type: 'category_created', description: 'New category created', time: '2024-01-14T14:20:00Z' }
  ]
})
