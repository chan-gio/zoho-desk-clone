import api from './api'

export const integrationService = {
  // Webhook operations
  // Lấy danh sách webhooks
  getWebhooks: async (params = {}) => {
    try {
      const response = await api.get('/integrations/webhooks', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching webhooks:', error)
      return getMockWebhooks()
    }
  },

  // Tạo webhook mới
  createWebhook: async (webhookData) => {
    try {
      const response = await api.post('/integrations/webhooks', webhookData)
      return response.data
    } catch (error) {
      console.error('Error creating webhook:', error)
      throw error
    }
  },

  // Test webhook
  testWebhook: async (id, testData = {}) => {
    try {
      const response = await api.post(`/integrations/webhooks/${id}/test`, testData)
      return response.data
    } catch (error) {
      console.error('Error testing webhook:', error)
      throw error
    }
  },

  // Cập nhật webhook
  updateWebhook: async (id, webhookData) => {
    try {
      const response = await api.put(`/integrations/webhooks/${id}`, webhookData)
      return response.data
    } catch (error) {
      console.error('Error updating webhook:', error)
      throw error
    }
  },

  // Xóa webhook
  deleteWebhook: async (id) => {
    try {
      const response = await api.delete(`/integrations/webhooks/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting webhook:', error)
      throw error
    }
  },

  // Lấy webhook theo ID
  getWebhookById: async (id) => {
    try {
      const response = await api.get(`/integrations/webhooks/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching webhook:', error)
      return getMockWebhookById(id)
    }
  },

  // Lấy webhook logs
  getWebhookLogs: async (id, params = {}) => {
    try {
      const response = await api.get(`/integrations/webhooks/${id}/logs`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching webhook logs:', error)
      return getMockWebhookLogs(id)
    }
  },

  // Email operations
  // Gửi email
  sendEmail: async (emailData) => {
    try {
      const response = await api.post('/integrations/email/send', emailData)
      return response.data
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  },

  // Lấy email templates
  getEmailTemplates: async (params = {}) => {
    try {
      const response = await api.get('/integrations/email/templates', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching email templates:', error)
      return getMockEmailTemplates()
    }
  },

  // Tạo email template
  createEmailTemplate: async (templateData) => {
    try {
      const response = await api.post('/integrations/email/templates', templateData)
      return response.data
    } catch (error) {
      console.error('Error creating email template:', error)
      throw error
    }
  },

  // Cập nhật email template
  updateEmailTemplate: async (id, templateData) => {
    try {
      const response = await api.put(`/integrations/email/templates/${id}`, templateData)
      return response.data
    } catch (error) {
      console.error('Error updating email template:', error)
      throw error
    }
  },

  // Xóa email template
  deleteEmailTemplate: async (id) => {
    try {
      const response = await api.delete(`/integrations/email/templates/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting email template:', error)
      throw error
    }
  },

  // SMS operations
  // Gửi SMS
  sendSMS: async (smsData) => {
    try {
      const response = await api.post('/integrations/sms/send', smsData)
      return response.data
    } catch (error) {
      console.error('Error sending SMS:', error)
      throw error
    }
  },

  // Lấy SMS templates
  getSMSTemplates: async (params = {}) => {
    try {
      const response = await api.get('/integrations/sms/templates', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching SMS templates:', error)
      return getMockSMSTemplates()
    }
  },

  // Tạo SMS template
  createSMSTemplate: async (templateData) => {
    try {
      const response = await api.post('/integrations/sms/templates', templateData)
      return response.data
    } catch (error) {
      console.error('Error creating SMS template:', error)
      throw error
    }
  },

  // Cập nhật SMS template
  updateSMSTemplate: async (id, templateData) => {
    try {
      const response = await api.put(`/integrations/sms/templates/${id}`, templateData)
      return response.data
    } catch (error) {
      console.error('Error updating SMS template:', error)
      throw error
    }
  },

  // Xóa SMS template
  deleteSMSTemplate: async (id) => {
    try {
      const response = await api.delete(`/integrations/sms/templates/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting SMS template:', error)
      throw error
    }
  },

  // Third-party integrations
  // Lấy danh sách integrations
  getIntegrations: async (params = {}) => {
    try {
      const response = await api.get('/integrations', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching integrations:', error)
      return getMockIntegrations()
    }
  },

  // Kích hoạt integration
  activateIntegration: async (id, config) => {
    try {
      const response = await api.post(`/integrations/${id}/activate`, config)
      return response.data
    } catch (error) {
      console.error('Error activating integration:', error)
      throw error
    }
  },

  // Vô hiệu hóa integration
  deactivateIntegration: async (id) => {
    try {
      const response = await api.post(`/integrations/${id}/deactivate`)
      return response.data
    } catch (error) {
      console.error('Error deactivating integration:', error)
      throw error
    }
  },

  // Test integration
  testIntegration: async (id, testData = {}) => {
    try {
      const response = await api.post(`/integrations/${id}/test`, testData)
      return response.data
    } catch (error) {
      console.error('Error testing integration:', error)
      throw error
    }
  },

  // Lấy integration logs
  getIntegrationLogs: async (id, params = {}) => {
    try {
      const response = await api.get(`/integrations/${id}/logs`, { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching integration logs:', error)
      return getMockIntegrationLogs(id)
    }
  },

  // API key management
  // Lấy API keys
  getAPIKeys: async (params = {}) => {
    try {
      const response = await api.get('/integrations/api-keys', { params })
      return response.data || []
    } catch (error) {
      console.error('Error fetching API keys:', error)
      return getMockAPIKeys()
    }
  },

  // Tạo API key
  createAPIKey: async (keyData) => {
    try {
      const response = await api.post('/integrations/api-keys', keyData)
      return response.data
    } catch (error) {
      console.error('Error creating API key:', error)
      throw error
    }
  },

  // Xóa API key
  deleteAPIKey: async (id) => {
    try {
      const response = await api.delete(`/integrations/api-keys/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting API key:', error)
      throw error
    }
  },

  // Regenerate API key
  regenerateAPIKey: async (id) => {
    try {
      const response = await api.post(`/integrations/api-keys/${id}/regenerate`)
      return response.data
    } catch (error) {
      console.error('Error regenerating API key:', error)
      throw error
    }
  }
}

// Mock data cho development
const getMockWebhooks = () => [
  {
    id: 1,
    name: 'Ticket Created Webhook',
    url: 'https://example.com/webhooks/ticket-created',
    events: ['ticket.created', 'ticket.updated'],
    secret: 'webhook_secret_123',
    status: 'active',
    lastTriggered: '2024-01-15T10:30:00Z',
    successCount: 45,
    failureCount: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'SLA Breach Webhook',
    url: 'https://example.com/webhooks/sla-breach',
    events: ['sla.breach'],
    secret: 'webhook_secret_456',
    status: 'active',
    lastTriggered: '2024-01-14T14:20:00Z',
    successCount: 12,
    failureCount: 0,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    name: 'User Registration Webhook',
    url: 'https://example.com/webhooks/user-registration',
    events: ['user.created'],
    secret: 'webhook_secret_789',
    status: 'inactive',
    lastTriggered: null,
    successCount: 0,
    failureCount: 0,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
]

const getMockWebhookById = (id) => {
  const webhooks = getMockWebhooks()
  return webhooks.find(webhook => webhook.id === parseInt(id))
}

const getMockWebhookLogs = (id) => [
  {
    id: 1,
    webhookId: parseInt(id),
    event: 'ticket.created',
    status: 'success',
    responseCode: 200,
    responseTime: 150,
    payload: { ticketId: 123, status: 'open' },
    response: { message: 'Webhook received successfully' },
    triggeredAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    webhookId: parseInt(id),
    event: 'ticket.updated',
    status: 'failed',
    responseCode: 500,
    responseTime: 3000,
    payload: { ticketId: 124, status: 'resolved' },
    response: { error: 'Internal server error' },
    triggeredAt: '2024-01-15T09:15:00Z'
  }
]

const getMockEmailTemplates = () => [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Chào mừng bạn đến với hệ thống support',
    body: 'Xin chào {{customer.name}}, chào mừng bạn đến với hệ thống support của chúng tôi...',
    variables: ['customer.name', 'customer.email'],
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Ticket Created Notification',
    subject: 'Ticket #{{ticket.id}} đã được tạo',
    body: 'Ticket #{{ticket.id}} với tiêu đề "{{ticket.subject}}" đã được tạo thành công...',
    variables: ['ticket.id', 'ticket.subject', 'customer.name'],
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    name: 'SLA Breach Alert',
    subject: 'Cảnh báo: SLA vi phạm cho ticket #{{ticket.id}}',
    body: 'Ticket #{{ticket.id}} đã vi phạm SLA với thời gian phản hồi {{sla.responseTime}} giờ...',
    variables: ['ticket.id', 'sla.responseTime', 'agent.name'],
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  }
]

const getMockSMSTemplates = () => [
  {
    id: 1,
    name: 'Ticket Update SMS',
    message: 'Ticket #{{ticket.id}} đã được cập nhật: {{ticket.status}}',
    variables: ['ticket.id', 'ticket.status'],
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'SLA Breach SMS',
    message: 'Cảnh báo: Ticket #{{ticket.id}} vi phạm SLA',
    variables: ['ticket.id'],
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  }
]

const getMockIntegrations = () => [
  {
    id: 1,
    name: 'Slack Integration',
    description: 'Tích hợp với Slack để gửi thông báo',
    type: 'notification',
    status: 'active',
    config: {
      webhookUrl: 'https://hooks.slack.com/services/...',
      channel: '#support'
    },
    lastSync: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Zapier Integration',
    description: 'Tích hợp với Zapier để tự động hóa workflow',
    type: 'automation',
    status: 'active',
    config: {
      apiKey: 'zapier_api_key_123',
      triggers: ['ticket.created', 'ticket.resolved']
    },
    lastSync: '2024-01-14T14:20:00Z',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Google Calendar Integration',
    description: 'Tích hợp với Google Calendar để đồng bộ lịch',
    type: 'calendar',
    status: 'inactive',
    config: {
      calendarId: 'primary',
      syncEvents: true
    },
    lastSync: null,
    createdAt: '2024-01-03T00:00:00Z'
  }
]

const getMockIntegrationLogs = (id) => [
  {
    id: 1,
    integrationId: parseInt(id),
    action: 'webhook_triggered',
    status: 'success',
    message: 'Webhook sent successfully',
    data: { ticketId: 123 },
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    integrationId: parseInt(id),
    action: 'sync_data',
    status: 'failed',
    message: 'Failed to sync data',
    data: { error: 'Connection timeout' },
    timestamp: '2024-01-15T09:15:00Z'
  }
]

const getMockAPIKeys = () => [
  {
    id: 1,
    name: 'Mobile App API Key',
    key: 'sk_live_1234567890abcdef',
    permissions: ['tickets.read', 'tickets.create'],
    lastUsed: '2024-01-15T10:30:00Z',
    expiresAt: '2024-12-31T23:59:59Z',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Webhook API Key',
    key: 'sk_live_abcdef1234567890',
    permissions: ['webhooks.trigger'],
    lastUsed: '2024-01-14T14:20:00Z',
    expiresAt: '2024-12-31T23:59:59Z',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Third-party Integration Key',
    key: 'sk_live_9876543210fedcba',
    permissions: ['tickets.read', 'users.read'],
    lastUsed: null,
    expiresAt: '2024-06-30T23:59:59Z',
    status: 'inactive',
    createdAt: '2024-01-03T00:00:00Z'
  }
]
