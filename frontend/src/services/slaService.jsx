import api from './api'

export const slaService = {
  // Lấy danh sách SLAs
  getSLAs: async (params = {}) => {
    try {
      const response = await api.get('/slas', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching SLAs:', error)
      return getMockSLAs()
    }
  },

  // Lấy SLA theo ID
  getSLAById: async (id) => {
    try {
      const response = await api.get(`/slas/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching SLA:', error)
      return getMockSLAById(id)
    }
  },

  // Tạo SLA mới (admin only)
  createSLA: async (slaData) => {
    try {
      const response = await api.post('/slas', slaData)
      return response.data
    } catch (error) {
      console.error('Error creating SLA:', error)
      throw error
    }
  },

  // Cập nhật SLA (admin only)
  updateSLA: async (id, slaData) => {
    try {
      const response = await api.put(`/slas/${id}`, slaData)
      return response.data
    } catch (error) {
      console.error('Error updating SLA:', error)
      throw error
    }
  },

  // Xóa SLA (admin only)
  deleteSLA: async (id) => {
    try {
      const response = await api.delete(`/slas/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting SLA:', error)
      throw error
    }
  },

  // Lấy danh sách SLA breaches
  getSLABreaches: async (params = {}) => {
    try {
      const response = await api.get('/slas/breaches/list', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching SLA breaches:', error)
      return getMockSLABreaches()
    }
  },

  // Kiểm tra SLA compliance cho ticket
  checkSLACompliance: async (ticketId) => {
    try {
      const response = await api.get(`/slas/tickets/compliance/${ticketId}`)
      return response.data
    } catch (error) {
      console.error('Error checking SLA compliance:', error)
      return getMockSLACompliance(ticketId)
    }
  },

  // Lấy SLA metrics
  getSLAMetrics: async (params = {}) => {
    try {
      const response = await api.get('/slas/metrics', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching SLA metrics:', error)
      return getMockSLAMetrics()
    }
  },

  // Lấy SLA performance theo thời gian
  getSLAPerformance: async (startDate, endDate, params = {}) => {
    try {
      const response = await api.get('/slas/performance', {
        params: { startDate, endDate, ...params }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching SLA performance:', error)
      return getMockSLAPerformance()
    }
  },

  // Lấy SLA alerts
  getSLAAlerts: async (params = {}) => {
    try {
      const response = await api.get('/slas/alerts', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching SLA alerts:', error)
      return getMockSLAAlerts()
    }
  },

  // Tạo SLA alert
  createSLAAlert: async (alertData) => {
    try {
      const response = await api.post('/slas/alerts', alertData)
      return response.data
    } catch (error) {
      console.error('Error creating SLA alert:', error)
      throw error
    }
  },

  // Cập nhật SLA alert
  updateSLAAlert: async (id, alertData) => {
    try {
      const response = await api.put(`/slas/alerts/${id}`, alertData)
      return response.data
    } catch (error) {
      console.error('Error updating SLA alert:', error)
      throw error
    }
  },

  // Xóa SLA alert
  deleteSLAAlert: async (id) => {
    try {
      const response = await api.delete(`/slas/alerts/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting SLA alert:', error)
      throw error
    }
  },

  // Lấy SLA templates
  getSLATemplates: async () => {
    try {
      const response = await api.get('/slas/templates')
      return response.data || []
    } catch (error) {
      console.error('Error fetching SLA templates:', error)
      return getMockSLATemplates()
    }
  },

  // Tạo SLA từ template
  createSLAFromTemplate: async (templateId, slaData) => {
    try {
      const response = await api.post(`/slas/templates/${templateId}/create`, slaData)
      return response.data
    } catch (error) {
      console.error('Error creating SLA from template:', error)
      throw error
    }
  },

  // Export SLA report
  exportSLAReport: async (params = {}) => {
    try {
      const response = await api.get('/slas/export', {
        params,
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'sla_report.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      console.error('Error exporting SLA report:', error)
      throw error
    }
  }
}

// Mock data cho development
const getMockSLAs = () => [
  {
    id: 1,
    name: 'Standard Support SLA',
    description: 'SLA tiêu chuẩn cho support ticket',
    priority: 'medium',
    responseTime: 4, // hours
    resolutionTime: 24, // hours
    businessHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Ho_Chi_Minh',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    escalationRules: [
      {
        level: 1,
        time: 2, // hours
        action: 'notify_supervisor'
      },
      {
        level: 2,
        time: 8, // hours
        action: 'notify_manager'
      }
    ],
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Premium Support SLA',
    description: 'SLA cao cấp cho khách hàng VIP',
    priority: 'high',
    responseTime: 1, // hours
    resolutionTime: 8, // hours
    businessHours: {
      start: '08:00',
      end: '20:00',
      timezone: 'Asia/Ho_Chi_Minh',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    },
    escalationRules: [
      {
        level: 1,
        time: 0.5, // hours
        action: 'notify_supervisor'
      },
      {
        level: 2,
        time: 2, // hours
        action: 'notify_manager'
      },
      {
        level: 3,
        time: 4, // hours
        action: 'notify_director'
      }
    ],
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    name: 'Critical Issue SLA',
    description: 'SLA cho các vấn đề nghiêm trọng',
    priority: 'urgent',
    responseTime: 0.5, // hours
    resolutionTime: 4, // hours
    businessHours: {
      start: '00:00',
      end: '23:59',
      timezone: 'Asia/Ho_Chi_Minh',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    escalationRules: [
      {
        level: 1,
        time: 0.25, // hours
        action: 'notify_supervisor'
      },
      {
        level: 2,
        time: 1, // hours
        action: 'notify_manager'
      },
      {
        level: 3,
        time: 2, // hours
        action: 'notify_director'
      }
    ],
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  }
]

const getMockSLAById = (id) => {
  const slas = getMockSLAs()
  return slas.find(sla => sla.id === parseInt(id))
}

const getMockSLABreaches = () => [
  {
    id: 1,
    slaId: 1,
    ticketId: 123,
    breachType: 'response_time',
    expectedTime: '2024-01-15T14:00:00Z',
    actualTime: '2024-01-15T15:30:00Z',
    breachDuration: 90, // minutes
    severity: 'medium',
    status: 'resolved',
    createdAt: '2024-01-15T15:30:00Z'
  },
  {
    id: 2,
    slaId: 2,
    ticketId: 124,
    breachType: 'resolution_time',
    expectedTime: '2024-01-15T16:00:00Z',
    actualTime: '2024-01-16T10:00:00Z',
    breachDuration: 18, // hours
    severity: 'high',
    status: 'pending',
    createdAt: '2024-01-16T10:00:00Z'
  }
]

const getMockSLACompliance = (ticketId) => ({
  ticketId: parseInt(ticketId),
  slaId: 1,
  slaName: 'Standard Support SLA',
  responseTime: {
    expected: '2024-01-15T14:00:00Z',
    actual: '2024-01-15T13:30:00Z',
    status: 'compliant',
    remaining: 30 // minutes
  },
  resolutionTime: {
    expected: '2024-01-16T10:00:00Z',
    actual: null,
    status: 'pending',
    remaining: 18 // hours
  },
  escalationLevel: 0,
  nextEscalation: '2024-01-15T15:00:00Z'
})

const getMockSLAMetrics = () => ({
  totalTickets: 150,
  compliantTickets: 135,
  breachedTickets: 15,
  complianceRate: 90.0,
  avgResponseTime: 2.5,
  avgResolutionTime: 18.5,
  breachRate: 10.0,
  escalationRate: 5.0
})

const getMockSLAPerformance = () => ({
  daily: [
    { date: '2024-01-15', complianceRate: 92.5, breachCount: 3 },
    { date: '2024-01-14', complianceRate: 88.0, breachCount: 5 },
    { date: '2024-01-13', complianceRate: 95.0, breachCount: 2 }
  ],
  weekly: [
    { week: '2024-W03', complianceRate: 91.8, breachCount: 10 },
    { week: '2024-W02', complianceRate: 89.2, breachCount: 15 },
    { week: '2024-W01', complianceRate: 93.5, breachCount: 8 }
  ],
  monthly: [
    { month: '2024-01', complianceRate: 91.5, breachCount: 33 },
    { month: '2023-12', complianceRate: 89.8, breachCount: 42 },
    { month: '2023-11', complianceRate: 92.1, breachCount: 28 }
  ]
})

const getMockSLAAlerts = () => [
  {
    id: 1,
    name: 'SLA Breach Alert',
    description: 'Cảnh báo khi SLA bị vi phạm',
    trigger: 'sla_breach',
    conditions: {
      breachType: 'any',
      severity: ['medium', 'high']
    },
    actions: [
      {
        type: 'email',
        config: {
          recipients: ['admin', 'supervisor'],
          template: 'sla_breach_alert'
        }
      }
    ],
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'SLA Escalation Alert',
    description: 'Cảnh báo khi ticket được escalate',
    trigger: 'sla_escalation',
    conditions: {
      escalationLevel: ['level_2', 'level_3']
    },
    actions: [
      {
        type: 'notification',
        config: {
          type: 'in_app',
          recipients: ['manager', 'director']
        }
      }
    ],
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z'
  }
]

const getMockSLATemplates = () => [
  {
    id: 1,
    name: 'Basic Support Template',
    description: 'Template cơ bản cho support',
    responseTime: 8,
    resolutionTime: 48,
    businessHours: 'standard',
    escalationRules: 'basic'
  },
  {
    id: 2,
    name: 'Premium Support Template',
    description: 'Template cao cấp cho support',
    responseTime: 2,
    resolutionTime: 24,
    businessHours: 'extended',
    escalationRules: 'advanced'
  },
  {
    id: 3,
    name: 'Critical Support Template',
    description: 'Template cho vấn đề nghiêm trọng',
    responseTime: 1,
    resolutionTime: 8,
    businessHours: '24x7',
    escalationRules: 'critical'
  }
]
