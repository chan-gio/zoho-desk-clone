import api from './api'

export const metricsService = {
  // Lấy metrics cho tickets (admin/agent)
  getTicketMetrics: async (period = '30d') => {
    try {
      const response = await api.get('/metrics/tickets', {
        params: { period }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching ticket metrics:', error)
      return getMockTicketMetrics()
    }
  },

  // Lấy metrics cho agents (admin/agent)
  getAgentMetrics: async (agentId = null, period = '30d') => {
    try {
      const response = await api.get('/metrics/agents', {
        params: { agentId, period }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching agent metrics:', error)
      return getMockAgentMetrics(agentId)
    }
  },

  // Lấy metrics cho departments (admin/agent)
  getDepartmentMetrics: async (departmentId = null, period = '30d') => {
    try {
      const response = await api.get('/metrics/departments', {
        params: { departmentId, period }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching department metrics:', error)
      return getMockDepartmentMetrics(departmentId)
    }
  },

  // Lấy SLA metrics (admin/agent)
  getSLAMetrics: async (period = '30d') => {
    try {
      const response = await api.get('/metrics/sla', {
        params: { period }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching SLA metrics:', error)
      return getMockSLAMetrics()
    }
  },

  // Lấy dashboard metrics (admin/agent)
  getDashboardMetrics: async () => {
    try {
      const response = await api.get('/metrics/dashboard')
      return response.data
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error)
      return getMockDashboardMetrics()
    }
  },

  // Lấy metrics theo type (admin/agent)
  getMetricsByType: async (type, period = '30d') => {
    try {
      const response = await api.get(`/metrics/type/${type}`, {
        params: { period }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching metrics by type:', error)
      return getMockMetricsByType(type)
    }
  },

  // Lấy real-time metrics
  getRealTimeMetrics: async () => {
    try {
      const response = await api.get('/metrics/real-time')
      return response.data
    } catch (error) {
      console.error('Error fetching real-time metrics:', error)
      return getMockRealTimeMetrics()
    }
  },

  // Lấy metrics theo custom date range
  getMetricsByDateRange: async (startDate, endDate, type = 'all') => {
    try {
      const response = await api.get('/metrics/date-range', {
        params: { startDate, endDate, type }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching metrics by date range:', error)
      return getMockMetricsByDateRange()
    }
  },

  // Export metrics report
  exportMetricsReport: async (type, format = 'excel', params = {}) => {
    try {
      const response = await api.get(`/metrics/export/${type}`, {
        params: { format, ...params },
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `metrics_report.${format === 'excel' ? 'xlsx' : 'pdf'}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      console.error('Error exporting metrics report:', error)
      throw error
    }
  },

  // Lấy performance trends
  getPerformanceTrends: async (period = '30d', metric = 'all') => {
    try {
      const response = await api.get('/metrics/trends', {
        params: { period, metric }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching performance trends:', error)
      return getMockPerformanceTrends()
    }
  },

  // Lấy comparative metrics
  getComparativeMetrics: async (period1, period2, type = 'tickets') => {
    try {
      const response = await api.get('/metrics/comparative', {
        params: { period1, period2, type }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching comparative metrics:', error)
      return getMockComparativeMetrics()
    }
  }
}

// Mock data cho development
const getMockTicketMetrics = () => ({
  totalTickets: 150,
  openTickets: 25,
  pendingTickets: 15,
  resolvedTickets: 80,
  closedTickets: 30,
  avgResolutionTime: 24.5,
  avgResponseTime: 2.3,
  satisfactionRating: 4.2,
  trends: {
    daily: [
      { date: '2024-01-15', created: 8, resolved: 6, open: 25 },
      { date: '2024-01-14', created: 12, resolved: 10, open: 23 },
      { date: '2024-01-13', created: 6, resolved: 8, open: 21 }
    ],
    weekly: [
      { week: '2024-W03', created: 45, resolved: 42, open: 25 },
      { week: '2024-W02', created: 38, resolved: 35, open: 22 },
      { week: '2024-W01', created: 52, resolved: 48, open: 19 }
    ]
  },
  byPriority: {
    urgent: { count: 10, avgResolutionTime: 4.5 },
    high: { count: 25, avgResolutionTime: 12.3 },
    medium: { count: 75, avgResolutionTime: 24.8 },
    low: { count: 40, avgResolutionTime: 48.2 }
  },
  byCategory: {
    technical: { count: 60, avgResolutionTime: 28.5 },
    billing: { count: 30, avgResolutionTime: 18.2 },
    general: { count: 40, avgResolutionTime: 22.1 },
    feature_request: { count: 20, avgResolutionTime: 72.0 }
  }
})

const getMockAgentMetrics = (agentId) => ({
  agentId: agentId || 'all',
  totalTickets: agentId ? 45 : 150,
  assignedTickets: agentId ? 35 : 120,
  resolvedTickets: agentId ? 32 : 80,
  avgResolutionTime: agentId ? 18.5 : 24.5,
  avgResponseTime: agentId ? 1.8 : 2.3,
  satisfactionRating: agentId ? 4.5 : 4.2,
  workload: agentId ? 85 : 75,
  performance: {
    efficiency: agentId ? 92 : 88,
    productivity: agentId ? 95 : 90,
    quality: agentId ? 4.5 : 4.2
  },
  trends: {
    daily: [
      { date: '2024-01-15', resolved: 3, responseTime: 1.5 },
      { date: '2024-01-14', resolved: 4, responseTime: 2.1 },
      { date: '2024-01-13', resolved: 2, responseTime: 1.8 }
    ]
  }
})

const getMockDepartmentMetrics = (departmentId) => ({
  departmentId: departmentId || 'all',
  totalTickets: departmentId ? 60 : 150,
  avgResolutionTime: departmentId ? 20.5 : 24.5,
  avgResponseTime: departmentId ? 1.9 : 2.3,
  satisfactionRating: departmentId ? 4.3 : 4.2,
  agentCount: departmentId ? 8 : 25,
  workload: departmentId ? 78 : 75,
  performance: {
    efficiency: departmentId ? 90 : 88,
    productivity: departmentId ? 92 : 90,
    quality: departmentId ? 4.3 : 4.2
  }
})

const getMockSLAMetrics = () => ({
  totalSLAs: 3,
  activeSLAs: 3,
  complianceRate: 88.5,
  breachRate: 11.5,
  avgResponseTime: 2.1,
  avgResolutionTime: 22.3,
  slaPerformance: [
    {
      slaId: 1,
      slaName: 'Standard Support SLA',
      complianceRate: 85.2,
      breachCount: 8,
      avgResponseTime: 2.5,
      avgResolutionTime: 24.8
    },
    {
      slaId: 2,
      slaName: 'Premium Support SLA',
      complianceRate: 95.8,
      breachCount: 2,
      avgResponseTime: 1.2,
      avgResolutionTime: 8.5
    },
    {
      slaId: 3,
      slaName: 'Critical Issue SLA',
      complianceRate: 92.1,
      breachCount: 1,
      avgResponseTime: 0.8,
      avgResolutionTime: 4.2
    }
  ],
  trends: {
    daily: [
      { date: '2024-01-15', complianceRate: 90.5, breachCount: 2 },
      { date: '2024-01-14', complianceRate: 85.2, breachCount: 4 },
      { date: '2024-01-13', complianceRate: 92.8, breachCount: 1 }
    ]
  }
})

const getMockDashboardMetrics = () => ({
  overview: {
    totalTickets: 150,
    openTickets: 25,
    resolvedToday: 8,
    avgResponseTime: 2.3,
    satisfactionRating: 4.2
  },
  realTime: {
    activeAgents: 8,
    queueLength: 12,
    avgWaitTime: 5.2,
    currentHour: {
      ticketsCreated: 3,
      ticketsResolved: 2,
      ticketsAssigned: 4
    }
  },
  topPerformers: [
    { agent: 'Nguyễn Văn A', resolved: 45, rating: 4.5 },
    { agent: 'Trần Thị B', resolved: 38, rating: 4.2 },
    { agent: 'Lê Văn C', resolved: 24, rating: 3.9 }
  ],
  recentActivity: [
    { type: 'ticket_created', description: 'New ticket #123 created', time: '10:30' },
    { type: 'ticket_resolved', description: 'Ticket #120 resolved', time: '10:15' },
    { type: 'ticket_assigned', description: 'Ticket #124 assigned', time: '10:00' }
  ],
  alerts: [
    { type: 'sla_breach', message: 'SLA breach detected for ticket #125', severity: 'high' },
    { type: 'high_volume', message: 'High ticket volume detected', severity: 'medium' }
  ]
})

const getMockMetricsByType = (type) => {
  const typeMetrics = {
    tickets: getMockTicketMetrics(),
    agents: getMockAgentMetrics(),
    departments: getMockDepartmentMetrics(),
    sla: getMockSLAMetrics(),
    dashboard: getMockDashboardMetrics()
  }
  return typeMetrics[type] || getMockTicketMetrics()
}

const getMockRealTimeMetrics = () => ({
  timestamp: new Date().toISOString(),
  activeTickets: 25,
  onlineAgents: 8,
  queueLength: 12,
  avgWaitTime: 5.2,
  currentHour: {
    ticketsCreated: 3,
    ticketsResolved: 2,
    ticketsAssigned: 4
  },
  slaStatus: {
    compliant: 22,
    atRisk: 2,
    breached: 1
  }
})

const getMockMetricsByDateRange = () => ({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  totalTickets: 450,
  avgResolutionTime: 24.5,
  avgResponseTime: 2.3,
  satisfactionRating: 4.2,
  complianceRate: 88.5,
  trends: {
    daily: Array.from({ length: 31 }, (_, i) => ({
      date: `2024-01-${String(i + 1).padStart(2, '0')}`,
      created: Math.floor(Math.random() * 20) + 5,
      resolved: Math.floor(Math.random() * 18) + 4,
      open: Math.floor(Math.random() * 30) + 10
    }))
  }
})

const getMockPerformanceTrends = () => ({
  period: '30d',
  trends: {
    resolutionTime: {
      current: 24.5,
      previous: 26.2,
      change: -6.5,
      direction: 'improving'
    },
    responseTime: {
      current: 2.3,
      previous: 2.8,
      change: -17.9,
      direction: 'improving'
    },
    satisfaction: {
      current: 4.2,
      previous: 4.0,
      change: 5.0,
      direction: 'improving'
    },
    compliance: {
      current: 88.5,
      previous: 85.2,
      change: 3.9,
      direction: 'improving'
    }
  }
})

const getMockComparativeMetrics = () => ({
  period1: '2024-01-01 to 2024-01-15',
  period2: '2024-01-16 to 2024-01-31',
  comparison: {
    tickets: {
      period1: 225,
      period2: 225,
      change: 0,
      changePercent: 0
    },
    resolutionTime: {
      period1: 26.2,
      period2: 22.8,
      change: -3.4,
      changePercent: -13.0
    },
    responseTime: {
      period1: 2.8,
      period2: 1.8,
      change: -1.0,
      changePercent: -35.7
    },
    satisfaction: {
      period1: 4.0,
      period2: 4.4,
      change: 0.4,
      changePercent: 10.0
    }
  }
})
