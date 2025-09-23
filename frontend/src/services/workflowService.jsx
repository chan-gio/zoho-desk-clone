import api from './api'

export const workflowService = {
  // Lấy danh sách workflows
  getWorkflows: async (params = {}) => {
    try {
      const response = await api.get('/workflows', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching workflows:', error)
      return getMockWorkflows()
    }
  },

  // Lấy workflow theo ID
  getWorkflowById: async (id) => {
    try {
      const response = await api.get(`/workflows/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching workflow:', error)
      return getMockWorkflowById(id)
    }
  },

  // Tạo workflow mới
  createWorkflow: async (workflowData) => {
    try {
      const response = await api.post('/workflows', workflowData)
      return response.data
    } catch (error) {
      console.error('Error creating workflow:', error)
      throw error
    }
  },

  // Cập nhật workflow
  updateWorkflow: async (id, workflowData) => {
    try {
      const response = await api.put(`/workflows/${id}`, workflowData)
      return response.data
    } catch (error) {
      console.error('Error updating workflow:', error)
      throw error
    }
  },

  // Xóa workflow
  deleteWorkflow: async (id) => {
    try {
      const response = await api.delete(`/workflows/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting workflow:', error)
      throw error
    }
  },

  // Kích hoạt workflow
  activateWorkflow: async (id) => {
    try {
      const response = await api.patch(`/workflows/${id}/activate`)
      return response.data
    } catch (error) {
      console.error('Error activating workflow:', error)
      throw error
    }
  },

  // Vô hiệu hóa workflow
  deactivateWorkflow: async (id) => {
    try {
      const response = await api.patch(`/workflows/${id}/deactivate`)
      return response.data
    } catch (error) {
      console.error('Error deactivating workflow:', error)
      throw error
    }
  },

  // Chạy workflow cho ticket
  runWorkflow: async (workflowId, ticketId, triggerData = {}) => {
    try {
      const response = await api.post(`/workflows/${workflowId}/run`, {
        ticketId,
        ...triggerData
      })
      return response.data
    } catch (error) {
      console.error('Error running workflow:', error)
      throw error
    }
  },

  // Lấy lịch sử chạy workflow
  getWorkflowRuns: async (workflowId, params = {}) => {
    try {
      const response = await api.get(`/workflows/${workflowId}/runs`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching workflow runs:', error)
      return getMockWorkflowRuns(workflowId)
    }
  },

  // Lấy chi tiết workflow run
  getWorkflowRunById: async (workflowId, runId) => {
    try {
      const response = await api.get(`/workflows/${workflowId}/runs/${runId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching workflow run:', error)
      return getMockWorkflowRunById(workflowId, runId)
    }
  },

  // Dừng workflow run
  stopWorkflowRun: async (workflowId, runId) => {
    try {
      const response = await api.patch(`/workflows/${workflowId}/runs/${runId}/stop`)
      return response.data
    } catch (error) {
      console.error('Error stopping workflow run:', error)
      throw error
    }
  },

  // Lấy danh sách triggers
  getTriggers: async () => {
    try {
      const response = await api.get('/workflows/triggers')
      return response.data || []
    } catch (error) {
      console.error('Error fetching triggers:', error)
      return getMockTriggers()
    }
  },

  // Lấy danh sách actions
  getActions: async () => {
    try {
      const response = await api.get('/workflows/actions')
      return response.data || []
    } catch (error) {
      console.error('Error fetching actions:', error)
      return getMockActions()
    }
  },

  // Lấy danh sách conditions
  getConditions: async () => {
    try {
      const response = await api.get('/workflows/conditions')
      return response.data || []
    } catch (error) {
      console.error('Error fetching conditions:', error)
      return getMockConditions()
    }
  },

  // Test workflow
  testWorkflow: async (workflowData, testData) => {
    try {
      const response = await api.post('/workflows/test', {
        workflow: workflowData,
        testData
      })
      return response.data
    } catch (error) {
      console.error('Error testing workflow:', error)
      throw error
    }
  },

  // Clone workflow
  cloneWorkflow: async (id, newName) => {
    try {
      const response = await api.post(`/workflows/${id}/clone`, { name: newName })
      return response.data
    } catch (error) {
      console.error('Error cloning workflow:', error)
      throw error
    }
  },

  // Export workflow
  exportWorkflow: async (id) => {
    try {
      const response = await api.get(`/workflows/${id}/export`, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `workflow_${id}.json`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      console.error('Error exporting workflow:', error)
      throw error
    }
  },

  // Import workflow
  importWorkflow: async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post('/workflows/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error) {
      console.error('Error importing workflow:', error)
      throw error
    }
  },

  // Lấy thống kê workflow
  getWorkflowStats: async (id) => {
    try {
      const response = await api.get(`/workflows/${id}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching workflow stats:', error)
      return getMockWorkflowStats(id)
    }
  },

  // Lấy workflows được sử dụng nhiều nhất
  getPopularWorkflows: async (params = {}) => {
    try {
      const response = await api.get('/workflows/popular', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching popular workflows:', error)
      return getMockPopularWorkflows()
    }
  }
}

// Mock data cho development
const getMockWorkflows = () => [
  {
    id: 1,
    name: 'Auto Assignment Workflow',
    description: 'Tự động giao ticket cho agent phù hợp',
    status: 'active',
    trigger: 'ticket_created',
    conditions: [
      {
        field: 'category',
        operator: 'equals',
        value: 'technical'
      }
    ],
    actions: [
      {
        type: 'assign_ticket',
        config: {
          assignTo: 'auto',
          criteria: 'workload'
        }
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    runs: 45,
    successRate: 95.5
  },
  {
    id: 2,
    name: 'Priority Escalation',
    description: 'Tự động nâng priority khi ticket quá hạn',
    status: 'active',
    trigger: 'ticket_updated',
    conditions: [
      {
        field: 'dueDate',
        operator: 'less_than',
        value: 'now'
      },
      {
        field: 'priority',
        operator: 'not_equals',
        value: 'urgent'
      }
    ],
    actions: [
      {
        type: 'update_priority',
        config: {
          priority: 'urgent'
        }
      },
      {
        type: 'send_notification',
        config: {
          recipients: ['admin'],
          message: 'Ticket đã quá hạn và được nâng priority'
        }
      }
    ],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
    runs: 23,
    successRate: 100
  },
  {
    id: 3,
    name: 'Customer Satisfaction Survey',
    description: 'Gửi survey sau khi ticket được giải quyết',
    status: 'inactive',
    trigger: 'ticket_resolved',
    conditions: [
      {
        field: 'category',
        operator: 'not_equals',
        value: 'billing'
      }
    ],
    actions: [
      {
        type: 'send_email',
        config: {
          template: 'satisfaction_survey',
          delay: '1 day'
        }
      }
    ],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    runs: 0,
    successRate: 0
  }
]

const getMockWorkflowById = (id) => {
  const workflows = getMockWorkflows()
  return workflows.find(workflow => workflow.id === parseInt(id))
}

const getMockWorkflowRuns = (workflowId) => [
  {
    id: 1,
    workflowId: parseInt(workflowId),
    ticketId: 123,
    status: 'completed',
    startedAt: '2024-01-15T10:30:00Z',
    completedAt: '2024-01-15T10:31:00Z',
    duration: 60,
    actionsExecuted: 2,
    errors: []
  },
  {
    id: 2,
    workflowId: parseInt(workflowId),
    ticketId: 124,
    status: 'failed',
    startedAt: '2024-01-15T09:15:00Z',
    completedAt: '2024-01-15T09:16:00Z',
    duration: 60,
    actionsExecuted: 1,
    errors: ['Agent not found']
  }
]

const getMockWorkflowRunById = (workflowId, runId) => ({
  id: parseInt(runId),
  workflowId: parseInt(workflowId),
  ticketId: 123,
  status: 'completed',
  startedAt: '2024-01-15T10:30:00Z',
  completedAt: '2024-01-15T10:31:00Z',
  duration: 60,
  actionsExecuted: 2,
  errors: [],
  steps: [
    {
      id: 1,
      action: 'assign_ticket',
      status: 'completed',
      executedAt: '2024-01-15T10:30:30Z',
      result: 'Ticket assigned to Agent 1'
    },
    {
      id: 2,
      action: 'send_notification',
      status: 'completed',
      executedAt: '2024-01-15T10:31:00Z',
      result: 'Notification sent successfully'
    }
  ]
})

const getMockTriggers = () => [
  {
    id: 'ticket_created',
    name: 'Ticket Created',
    description: 'Khi ticket mới được tạo',
    category: 'ticket'
  },
  {
    id: 'ticket_updated',
    name: 'Ticket Updated',
    description: 'Khi ticket được cập nhật',
    category: 'ticket'
  },
  {
    id: 'ticket_resolved',
    name: 'Ticket Resolved',
    description: 'Khi ticket được giải quyết',
    category: 'ticket'
  },
  {
    id: 'comment_added',
    name: 'Comment Added',
    description: 'Khi comment mới được thêm',
    category: 'comment'
  },
  {
    id: 'time_based',
    name: 'Time Based',
    description: 'Trigger theo thời gian',
    category: 'schedule'
  }
]

const getMockActions = () => [
  {
    id: 'assign_ticket',
    name: 'Assign Ticket',
    description: 'Giao ticket cho agent',
    category: 'ticket',
    config: {
      assignTo: {
        type: 'select',
        options: ['auto', 'specific', 'round_robin']
      }
    }
  },
  {
    id: 'update_priority',
    name: 'Update Priority',
    description: 'Cập nhật priority của ticket',
    category: 'ticket',
    config: {
      priority: {
        type: 'select',
        options: ['low', 'medium', 'high', 'urgent']
      }
    }
  },
  {
    id: 'send_email',
    name: 'Send Email',
    description: 'Gửi email',
    category: 'notification',
    config: {
      template: {
        type: 'select',
        options: ['default', 'custom']
      },
      recipients: {
        type: 'multiselect',
        options: ['customer', 'agent', 'admin']
      }
    }
  },
  {
    id: 'send_notification',
    name: 'Send Notification',
    description: 'Gửi thông báo',
    category: 'notification',
    config: {
      type: {
        type: 'select',
        options: ['in_app', 'push', 'email']
      }
    }
  }
]

const getMockConditions = () => [
  {
    id: 'field_equals',
    name: 'Field Equals',
    description: 'Trường bằng giá trị',
    category: 'comparison'
  },
  {
    id: 'field_contains',
    name: 'Field Contains',
    description: 'Trường chứa giá trị',
    category: 'comparison'
  },
  {
    id: 'time_before',
    name: 'Time Before',
    description: 'Thời gian trước',
    category: 'time'
  },
  {
    id: 'time_after',
    name: 'Time After',
    description: 'Thời gian sau',
    category: 'time'
  }
]

const getMockWorkflowStats = (id) => ({
  totalRuns: 45,
  successfulRuns: 43,
  failedRuns: 2,
  successRate: 95.5,
  avgExecutionTime: 1.2,
  lastRun: '2024-01-15T10:30:00Z',
  mostUsedActions: [
    { action: 'assign_ticket', count: 45 },
    { action: 'send_notification', count: 30 }
  ]
})

const getMockPopularWorkflows = () => [
  {
    id: 1,
    name: 'Auto Assignment Workflow',
    runs: 45,
    successRate: 95.5
  },
  {
    id: 2,
    name: 'Priority Escalation',
    runs: 23,
    successRate: 100
  }
]
