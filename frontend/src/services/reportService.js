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
