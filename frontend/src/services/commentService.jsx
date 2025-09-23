import api from './api'

export const commentService = {
  // Lấy danh sách comments của ticket
  getTicketComments: async (ticketId, params = {}) => {
    try {
      const response = await api.get(`/tickets/${ticketId}/comments`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching ticket comments:', error)
      return getMockTicketComments(ticketId)
    }
  },

  // Lấy comment theo ID
  getCommentById: async (commentId) => {
    try {
      const response = await api.get(`/comments/${commentId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching comment:', error)
      return getMockCommentById(commentId)
    }
  },

  // Tạo comment mới
  createComment: async (ticketId, commentData) => {
    try {
      const response = await api.post(`/tickets/${ticketId}/comments`, commentData)
      return response.data
    } catch (error) {
      console.error('Error creating comment:', error)
      throw error
    }
  },

  // Cập nhật comment
  updateComment: async (commentId, commentData) => {
    try {
      const response = await api.put(`/comments/${commentId}`, commentData)
      return response.data
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error
    }
  },

  // Xóa comment
  deleteComment: async (commentId) => {
    try {
      const response = await api.delete(`/comments/${commentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  },

  // Đánh dấu comment là internal
  markAsInternal: async (commentId) => {
    try {
      const response = await api.patch(`/comments/${commentId}/internal`)
      return response.data
    } catch (error) {
      console.error('Error marking comment as internal:', error)
      throw error
    }
  },

  // Đánh dấu comment là public
  markAsPublic: async (commentId) => {
    try {
      const response = await api.patch(`/comments/${commentId}/public`)
      return response.data
    } catch (error) {
      console.error('Error marking comment as public:', error)
      throw error
    }
  },

  // Thêm attachment vào comment
  addAttachmentToComment: async (commentId, file, onProgress) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post(`/comments/${commentId}/attachments`, formData, {
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
      console.error('Error adding attachment to comment:', error)
      throw error
    }
  },

  // Lấy attachments của comment
  getCommentAttachments: async (commentId) => {
    try {
      const response = await api.get(`/comments/${commentId}/attachments`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching comment attachments:', error)
      return getMockCommentAttachments(commentId)
    }
  },

  // Xóa attachment khỏi comment
  deleteCommentAttachment: async (commentId, attachmentId) => {
    try {
      const response = await api.delete(`/comments/${commentId}/attachments/${attachmentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting comment attachment:', error)
      throw error
    }
  },

  // Like comment
  likeComment: async (commentId) => {
    try {
      const response = await api.post(`/comments/${commentId}/like`)
      return response.data
    } catch (error) {
      console.error('Error liking comment:', error)
      throw error
    }
  },

  // Unlike comment
  unlikeComment: async (commentId) => {
    try {
      const response = await api.delete(`/comments/${commentId}/like`)
      return response.data
    } catch (error) {
      console.error('Error unliking comment:', error)
      throw error
    }
  },

  // Lấy likes của comment
  getCommentLikes: async (commentId) => {
    try {
      const response = await api.get(`/comments/${commentId}/likes`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching comment likes:', error)
      return getMockCommentLikes(commentId)
    }
  },

  // Tìm kiếm comments
  searchComments: async (query, params = {}) => {
    try {
      const response = await api.get('/comments/search', {
        params: { q: query, ...params }
      })
      return response.data || []
    } catch (error) {
      console.error('Error searching comments:', error)
      return getMockSearchComments(query)
    }
  },

  // Lấy comments gần đây của user
  getRecentComments: async (userId, params = {}) => {
    try {
      const response = await api.get(`/users/${userId}/comments/recent`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching recent comments:', error)
      return getMockRecentComments(userId)
    }
  },

  // Lấy thống kê comments
  getCommentStats: async (ticketId) => {
    try {
      const response = await api.get(`/tickets/${ticketId}/comments/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching comment stats:', error)
      return getMockCommentStats(ticketId)
    }
  },

  // Đánh dấu comment đã đọc
  markCommentAsRead: async (commentId) => {
    try {
      const response = await api.patch(`/comments/${commentId}/read`)
      return response.data
    } catch (error) {
      console.error('Error marking comment as read:', error)
      throw error
    }
  },

  // Đánh dấu tất cả comments của ticket đã đọc
  markAllTicketCommentsAsRead: async (ticketId) => {
    try {
      const response = await api.patch(`/tickets/${ticketId}/comments/read-all`)
      return response.data
    } catch (error) {
      console.error('Error marking all ticket comments as read:', error)
      throw error
    }
  },

  // Lấy comments chưa đọc
  getUnreadComments: async (params = {}) => {
    try {
      const response = await api.get('/comments/unread', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching unread comments:', error)
      return getMockUnreadComments()
    }
  }
}

// Mock data cho development
const getMockTicketComments = (ticketId) => [
  {
    id: 1,
    ticketId: parseInt(ticketId),
    content: 'Tôi đã kiểm tra và thấy vấn đề này. Sẽ xử lý trong vòng 2 giờ tới.',
    author: {
      id: 1,
      name: 'Agent 1',
      avatar: '/avatars/agent1.jpg',
      role: 'agent'
    },
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    isInternal: false,
    isRead: true,
    likes: 2,
    attachments: [],
    mentions: []
  },
  {
    id: 2,
    ticketId: parseInt(ticketId),
    content: 'Cảm ơn bạn đã báo cáo. Tôi sẽ theo dõi tiến độ xử lý.',
    author: {
      id: 2,
      name: 'Support Team',
      avatar: '/avatars/support.jpg',
      role: 'admin'
    },
    createdAt: '2024-01-15T10:45:00Z',
    updatedAt: '2024-01-15T10:45:00Z',
    isInternal: true,
    isRead: true,
    likes: 0,
    attachments: [],
    mentions: []
  },
  {
    id: 3,
    ticketId: parseInt(ticketId),
    content: 'Vấn đề đã được giải quyết. Bạn có thể kiểm tra lại không?',
    author: {
      id: 1,
      name: 'Agent 1',
      avatar: '/avatars/agent1.jpg',
      role: 'agent'
    },
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    isInternal: false,
    isRead: false,
    likes: 1,
    attachments: [
      {
        id: 1,
        name: 'solution.pdf',
        size: '1.2 MB',
        type: 'application/pdf',
        url: '/attachments/solution.pdf'
      }
    ],
    mentions: ['@customer']
  }
]

const getMockCommentById = (commentId) => {
  const comments = getMockTicketComments(1)
  return comments.find(comment => comment.id === parseInt(commentId))
}

const getMockCommentAttachments = (commentId) => [
  {
    id: 1,
    name: 'screenshot.png',
    size: '2.5 MB',
    type: 'image/png',
    url: '/attachments/screenshot.png',
    uploadedAt: '2024-01-15T10:45:00Z'
  }
]

const getMockCommentLikes = (commentId) => [
  {
    id: 1,
    user: {
      id: 2,
      name: 'Customer A',
      avatar: '/avatars/customer1.jpg'
    },
    createdAt: '2024-01-15T12:00:00Z'
  },
  {
    id: 2,
    user: {
      id: 3,
      name: 'Agent 2',
      avatar: '/avatars/agent2.jpg'
    },
    createdAt: '2024-01-15T12:30:00Z'
  }
]

const getMockSearchComments = (query) => [
  {
    id: 1,
    content: 'Tôi đã kiểm tra và thấy vấn đề này. Sẽ xử lý trong vòng 2 giờ tới.',
    ticketId: 123,
    ticketSubject: 'Login issue',
    author: 'Agent 1',
    createdAt: '2024-01-15T11:00:00Z'
  }
]

const getMockRecentComments = (userId) => [
  {
    id: 1,
    content: 'Tôi đã kiểm tra và thấy vấn đề này.',
    ticketId: 123,
    ticketSubject: 'Login issue',
    createdAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 2,
    content: 'Vấn đề đã được giải quyết.',
    ticketId: 124,
    ticketSubject: 'Payment problem',
    createdAt: '2024-01-15T14:30:00Z'
  }
]

const getMockCommentStats = (ticketId) => ({
  totalComments: 3,
  internalComments: 1,
  publicComments: 2,
  unreadComments: 1,
  totalLikes: 3,
  avgResponseTime: 2.5
})

const getMockUnreadComments = () => [
  {
    id: 3,
    content: 'Vấn đề đã được giải quyết. Bạn có thể kiểm tra lại không?',
    ticketId: 123,
    ticketSubject: 'Login issue',
    author: 'Agent 1',
    createdAt: '2024-01-15T14:30:00Z'
  }
]
