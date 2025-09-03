import api from './api'

export const ticketService = {
  // Lấy danh sách tickets
  getTickets: async (params = {}) => {
    try {
      const response = await api.get('/tickets', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching tickets:', error)
      return getMockTickets()
    }
  },

  // Lấy ticket theo ID
  getTicketById: async (id) => {
    try {
      const response = await api.get(`/tickets/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching ticket:', error)
      return getMockTicketById(id)
    }
  },

  // Lấy comments của ticket
  getTicketComments: async (ticketId) => {
    try {
      const response = await api.get(`/tickets/${ticketId}/comments`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching comments:', error)
      return getMockComments(ticketId)
    }
  },

  // Lấy lịch sử ticket
  getTicketHistory: async (ticketId) => {
    try {
      const response = await api.get(`/tickets/${ticketId}/history`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching history:', error)
      return getMockHistory(ticketId)
    }
  },

  // Lấy attachments của ticket
  getTicketAttachments: async (ticketId) => {
    try {
      const response = await api.get(`/tickets/${ticketId}/attachments`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching attachments:', error)
      return getMockAttachments(ticketId)
    }
  },

  // Lấy danh sách customers
  getCustomers: async () => {
    try {
      const response = await api.get('/customers')
      return response.data || []
    } catch (error) {
      console.error('Error fetching customers:', error)
      return getMockCustomers()
    }
  },

  // Lấy danh sách agents
  getAgents: async () => {
    try {
      const response = await api.get('/agents')
      return response.data || []
    } catch (error) {
      console.error('Error fetching agents:', error)
      return getMockAgents()
    }
  },

  // Lấy thống kê
  getStats: async () => {
    try {
      const response = await api.get('/tickets/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching stats:', error)
      return getMockStats()
    }
  },

  // Cập nhật ticket
  updateTicket: async (ticketData) => {
    try {
      const response = await api.put(`/tickets/${ticketData.id}`, ticketData)
      return response.data
    } catch (error) {
      console.error('Error updating ticket:', error)
      throw error
    }
  },

  // Xóa ticket
  deleteTicket: async (id) => {
    try {
      const response = await api.delete(`/tickets/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting ticket:', error)
      throw error
    }
  },

  // Tạo ticket mới
  createTicket: async (ticketData) => {
    try {
      const response = await api.post('/tickets', ticketData)
      return response.data
    } catch (error) {
      console.error('Error creating ticket:', error)
      throw error
    }
  },

  // Thêm comment
  addComment: async (commentData) => {
    try {
      const response = await api.post(`/tickets/${commentData.ticketId}/comments`, commentData)
      return response.data
    } catch (error) {
      console.error('Error adding comment:', error)
      throw error
    }
  },

  // Giao ticket
  assignTicket: async (assignData) => {
    try {
      const response = await api.post(`/tickets/${assignData.ticketId}/assign`, assignData)
      return response.data
    } catch (error) {
      console.error('Error assigning ticket:', error)
      throw error
    }
  },
}

// Mock data cho development
const getMockTickets = () => [
  {
    id: 1,
    subject: 'Không thể đăng nhập vào hệ thống',
    description: 'Tôi không thể đăng nhập vào hệ thống với tài khoản của mình. Đã thử reset password nhưng vẫn không được. Hệ thống báo lỗi "Invalid credentials" mặc dù tôi đã nhập đúng thông tin.',
    status: 'open',
    priority: 'high',
    customer: { name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0123456789' },
    assignedTo: 'Agent 1',
    category: 'Technical',
    subcategory: 'Authentication',
    tags: ['login', 'authentication', 'password'],
    channel: 'email',
    source: 'portal',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    dueDate: '2024-01-17T18:00:00Z',
  },
  {
    id: 2,
    subject: 'Lỗi hiển thị trên trang chủ',
    description: 'Trang chủ hiển thị không đúng layout, các element bị lệch và không responsive trên mobile. Vấn đề này ảnh hưởng đến trải nghiệm người dùng.',
    status: 'pending',
    priority: 'medium',
    customer: { name: 'Trần Thị B', email: 'tranthib@example.com', phone: '0987654321' },
    assignedTo: 'Agent 2',
    category: 'UI/UX',
    subcategory: 'Layout',
    tags: ['frontend', 'responsive', 'mobile'],
    channel: 'chat',
    source: 'web',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    dueDate: '2024-01-16T12:00:00Z',
  },
  {
    id: 3,
    subject: 'Yêu cầu thêm tính năng export dữ liệu',
    description: 'Cần thêm tính năng export dữ liệu ra file Excel để báo cáo. Hiện tại chỉ có thể xem dữ liệu trên web, không thể xuất ra file.',
    status: 'resolved',
    priority: 'low',
    customer: { name: 'Lê Văn C', email: 'levanc@example.com', phone: '0369852147' },
    assignedTo: 'Agent 1',
    category: 'Feature Request',
    subcategory: 'Export',
    tags: ['export', 'excel', 'reporting', 'feature'],
    channel: 'email',
    source: 'portal',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-14T11:30:00Z',
    dueDate: '2024-01-20T18:00:00Z',
  },
  {
    id: 4,
    subject: 'Lỗi thanh toán qua thẻ tín dụng',
    description: 'Không thể thanh toán qua thẻ tín dụng, hệ thống báo lỗi "Transaction failed". Đã thử nhiều lần với các thẻ khác nhau nhưng vẫn không được.',
    status: 'open',
    priority: 'urgent',
    customer: { name: 'Phạm Thị D', email: 'phamthid@example.com', phone: '0741258963' },
    assignedTo: 'Agent 3',
    category: 'Payment',
    subcategory: 'Credit Card',
    tags: ['payment', 'credit-card', 'urgent', 'transaction'],
    channel: 'phone',
    source: 'phone',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    dueDate: '2024-01-13T12:00:00Z',
  },
  {
    id: 5,
    subject: 'Hướng dẫn sử dụng hệ thống',
    description: 'Cần hướng dẫn chi tiết về cách sử dụng các tính năng mới của hệ thống. Hiện tại không có tài liệu hướng dẫn nào.',
    status: 'closed',
    priority: 'low',
    customer: { name: 'Hoàng Văn E', email: 'hoangvane@example.com', phone: '0852369741' },
    assignedTo: 'Agent 2',
    category: 'Documentation',
    subcategory: 'User Guide',
    tags: ['documentation', 'tutorial', 'help'],
    channel: 'email',
    source: 'email',
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    dueDate: '2024-01-15T18:00:00Z',
  },
  {
    id: 6,
    subject: 'Lỗi kết nối database',
    description: 'Hệ thống báo lỗi kết nối database, không thể truy cập dữ liệu. Lỗi này ảnh hưởng đến toàn bộ hệ thống.',
    status: 'open',
    priority: 'urgent',
    customer: { name: 'Vũ Thị F', email: 'vuthif@example.com', phone: '0963258741' },
    assignedTo: 'Agent 1',
    category: 'Technical',
    subcategory: 'Database',
    tags: ['database', 'connection', 'urgent', 'system'],
    channel: 'phone',
    source: 'phone',
    createdAt: '2024-01-16T08:00:00Z',
    updatedAt: '2024-01-16T08:00:00Z',
    dueDate: '2024-01-16T12:00:00Z',
  },
  {
    id: 7,
    subject: 'Yêu cầu cập nhật thông tin cá nhân',
    description: 'Cần cập nhật thông tin cá nhân trong tài khoản, bao gồm địa chỉ và số điện thoại mới.',
    status: 'pending',
    priority: 'low',
    customer: { name: 'Đặng Văn G', email: 'dangvang@example.com', phone: '0789456123' },
    assignedTo: 'Agent 2',
    category: 'Account',
    subcategory: 'Profile Update',
    tags: ['profile', 'update', 'personal-info'],
    channel: 'email',
    source: 'portal',
    createdAt: '2024-01-15T15:30:00Z',
    updatedAt: '2024-01-15T15:30:00Z',
    dueDate: '2024-01-18T18:00:00Z',
  },
  {
    id: 8,
    subject: 'Lỗi upload file',
    description: 'Không thể upload file lên hệ thống, báo lỗi "File size too large" mặc dù file chỉ có 2MB.',
    status: 'resolved',
    priority: 'medium',
    customer: { name: 'Bùi Thị H', email: 'buithih@example.com', phone: '0912345678' },
    assignedTo: 'Agent 3',
    category: 'Technical',
    subcategory: 'File Upload',
    tags: ['upload', 'file', 'size-limit'],
    channel: 'chat',
    source: 'web',
    createdAt: '2024-01-14T10:15:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    dueDate: '2024-01-16T18:00:00Z',
  }
]

const getMockTicketById = (id) => {
  const tickets = getMockTickets()
  return tickets.find(ticket => ticket.id === parseInt(id))
}

const getMockComments = (ticketId) => [
  {
    id: 1,
    ticketId: parseInt(ticketId),
    content: 'Tôi đã kiểm tra và thấy vấn đề này. Sẽ xử lý trong vòng 2 giờ tới.',
    author: 'Agent 1',
    createdAt: '2024-01-15T11:00:00Z',
    isInternal: false,
  },
  {
    id: 2,
    ticketId: parseInt(ticketId),
    content: 'Cảm ơn bạn đã báo cáo. Tôi sẽ theo dõi tiến độ xử lý.',
    author: 'Support Team',
    createdAt: '2024-01-15T10:45:00Z',
    isInternal: true,
  },
]

const getMockHistory = (ticketId) => [
  {
    id: 1,
    ticketId: parseInt(ticketId),
    action: 'Ticket được tạo',
    description: 'Ticket được tạo bởi khách hàng',
    type: 'created',
    user: 'Customer',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    ticketId: parseInt(ticketId),
    action: 'Ticket được giao cho Agent 1',
    description: 'Ticket được giao cho Agent 1 để xử lý',
    type: 'assigned',
    user: 'System',
    createdAt: '2024-01-15T10:35:00Z',
  },
]

const getMockAttachments = (ticketId) => [
  {
    id: 1,
    ticketId: parseInt(ticketId),
    name: 'screenshot_error.png',
    size: '2.5 MB',
    type: 'image/png',
    url: '/attachments/screenshot_error.png',
    uploadedAt: '2024-01-15T10:45:00Z',
    uploadedBy: 'Customer',
  },
]

const getMockCustomers = () => [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@example.com' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com' },
  { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com' },
]

const getMockAgents = () => [
  { id: 1, name: 'Agent 1' },
  { id: 2, name: 'Agent 2' },
  { id: 3, name: 'Agent 3' },
]

const getMockStats = () => ({
  totalTickets: 8,
  openTickets: 3,
  pendingTickets: 2,
  resolvedTickets: 2,
  closedTickets: 1,
})
