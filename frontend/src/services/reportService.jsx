import api from './api'

export const reportService = {
  // Lấy báo cáo tổng quan
  getReports: async () => {
    try {
      const response = await api.get('/reports')
      return response.data
    } catch (error) {
      console.error('Error fetching reports:', error)
      return getMockReports()
    }
  },

  // Lấy báo cáo theo thời gian
  getReportsByDateRange: async (startDate, endDate) => {
    try {
      const response = await api.get('/reports/date-range', {
        params: { startDate, endDate }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching reports by date range:', error)
      throw error
    }
  },

  // Lấy báo cáo hiệu suất agent
  getAgentPerformance: async () => {
    try {
      const response = await api.get('/reports/agent-performance')
      return response.data
    } catch (error) {
      console.error('Error fetching agent performance:', error)
      throw error
    }
  },

  // Lấy báo cáo ticket theo trạng thái
  getTicketStatusReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/ticket-status', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching ticket status report:', error)
      return getMockTicketStatusReport()
    }
  },

  // Lấy báo cáo ticket theo priority
  getTicketPriorityReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/ticket-priority', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching ticket priority report:', error)
      return getMockTicketPriorityReport()
    }
  },

  // Lấy báo cáo ticket theo category
  getTicketCategoryReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/ticket-category', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching ticket category report:', error)
      return getMockTicketCategoryReport()
    }
  },

  // Lấy báo cáo thời gian phản hồi
  getResponseTimeReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/response-time', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching response time report:', error)
      return getMockResponseTimeReport()
    }
  },

  // Lấy báo cáo thời gian giải quyết
  getResolutionTimeReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/resolution-time', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching resolution time report:', error)
      return getMockResolutionTimeReport()
    }
  },

  // Lấy báo cáo customer satisfaction
  getCustomerSatisfactionReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/customer-satisfaction', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching customer satisfaction report:', error)
      return getMockCustomerSatisfactionReport()
    }
  },

  // Lấy báo cáo theo department
  getDepartmentReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/department', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching department report:', error)
      return getMockDepartmentReport()
    }
  },

  // Export báo cáo ra Excel
  exportReport: async (reportType, params = {}) => {
    try {
      const response = await api.get(`/reports/export/${reportType}`, {
        params,
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${reportType}_report.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      console.error('Error exporting report:', error)
      throw error
    }
  },

  // Lấy dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/reports/dashboard')
      return response.data
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      return getMockDashboardData()
    }
  },

  // Lấy báo cáo real-time
  getRealTimeReport: async () => {
    try {
      const response = await api.get('/reports/real-time')
      return response.data
    } catch (error) {
      console.error('Error fetching real-time report:', error)
      return getMockRealTimeReport()
    }
  },

  // Lấy báo cáo theo custom filters
  getCustomReport: async (filters) => {
    try {
      const response = await api.post('/reports/custom', filters)
      return response.data
    } catch (error) {
      console.error('Error fetching custom report:', error)
      throw error
    }
  }
}

// Mock data cho development
const getMockReports = () => ({
  totalTickets: 150,
  resolvedTickets: 107,
  avgResolutionTime: 24.5,
  avgRating: 4.2,
  agentPerformance: [
    {
      agentId: 1,
      agentName: 'Nguyễn Văn A',
      ticketsResolved: 45,
      avgResolutionTime: 18.5,
      rating: 4.5,
    },
    {
      agentId: 2,
      agentName: 'Trần Thị B',
      ticketsResolved: 38,
      avgResolutionTime: 22.3,
      rating: 4.2,
    },
    {
      agentId: 3,
      agentName: 'Lê Văn C',
      ticketsResolved: 24,
      avgResolutionTime: 28.7,
      rating: 3.9,
    },
  ],
})

const getMockTicketStatusReport = () => ({
  open: 25,
  pending: 15,
  resolved: 80,
  closed: 30,
  total: 150
})

const getMockTicketPriorityReport = () => ({
  urgent: 10,
  high: 25,
  medium: 75,
  low: 40,
  total: 150
})

const getMockTicketCategoryReport = () => ({
  technical: 60,
  billing: 30,
  general: 40,
  feature_request: 20,
  total: 150
})

const getMockResponseTimeReport = () => ({
  avgFirstResponse: 2.5,
  avgResponseTime: 4.2,
  slaCompliance: 85.5,
  totalResponses: 1200
})

const getMockResolutionTimeReport = () => ({
  avgResolutionTime: 24.5,
  medianResolutionTime: 18.0,
  maxResolutionTime: 72.0,
  slaCompliance: 78.3
})

const getMockCustomerSatisfactionReport = () => ({
  avgRating: 4.2,
  totalRatings: 107,
  excellent: 45,
  good: 35,
  average: 20,
  poor: 7,
  total: 107
})

const getMockDepartmentReport = () => ({
  support: {
    tickets: 80,
    avgResolutionTime: 22.5,
    satisfaction: 4.3
  },
  technical: {
    tickets: 45,
    avgResolutionTime: 28.2,
    satisfaction: 4.1
  },
  billing: {
    tickets: 25,
    avgResolutionTime: 18.7,
    satisfaction: 4.5
  }
})

const getMockDashboardData = () => ({
  today: {
    ticketsCreated: 12,
    ticketsResolved: 8,
    ticketsAssigned: 10,
    avgResponseTime: 2.1
  },
  thisWeek: {
    ticketsCreated: 85,
    ticketsResolved: 72,
    ticketsAssigned: 78,
    avgResponseTime: 2.3
  },
  thisMonth: {
    ticketsCreated: 350,
    ticketsResolved: 320,
    ticketsAssigned: 340,
    avgResponseTime: 2.5
  },
  topAgents: [
    { name: 'Nguyễn Văn A', resolved: 45, rating: 4.5 },
    { name: 'Trần Thị B', resolved: 38, rating: 4.2 },
    { name: 'Lê Văn C', resolved: 24, rating: 3.9 }
  ],
  recentTickets: [
    { id: 123, subject: 'Login issue', priority: 'high', status: 'open' },
    { id: 124, subject: 'Payment problem', priority: 'urgent', status: 'pending' },
    { id: 125, subject: 'Feature request', priority: 'low', status: 'resolved' }
  ]
})

const getMockRealTimeReport = () => ({
  activeTickets: 25,
  onlineAgents: 8,
  queueLength: 12,
  avgWaitTime: 5.2,
  currentHour: {
    ticketsCreated: 3,
    ticketsResolved: 2,
    ticketsAssigned: 4
  }
})
