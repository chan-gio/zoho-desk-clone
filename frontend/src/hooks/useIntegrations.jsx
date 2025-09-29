import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { integrationService } from '../services/integrationService'

// Query keys
export const integrationKeys = {
  all: ['integrations'],
  webhooks: () => [...integrationKeys.all, 'webhooks'],
  webhookList: (filters) => [...integrationKeys.webhooks(), 'list', filters],
  webhook: (id) => [...integrationKeys.webhooks(), 'detail', id],
  webhookLogs: (id) => [...integrationKeys.webhooks(), 'logs', id],
  emailTemplates: () => [...integrationKeys.all, 'emailTemplates'],
  smsTemplates: () => [...integrationKeys.all, 'smsTemplates'],
  integrations: () => [...integrationKeys.all, 'integrations'],
  integration: (id) => [...integrationKeys.all, 'integration', id],
  integrationLogs: (id) => [...integrationKeys.all, 'integrationLogs', id],
  apiKeys: () => [...integrationKeys.all, 'apiKeys'],
}

// Custom hooks for integrations
export const useWebhooks = (params = {}) => {
  return useQuery({
    queryKey: integrationKeys.webhookList(params),
    queryFn: () => integrationService.getWebhooks(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useWebhook = (id) => {
  return useQuery({
    queryKey: integrationKeys.webhook(id),
    queryFn: () => integrationService.getWebhookById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useWebhookLogs = (id, params = {}) => {
  return useQuery({
    queryKey: [...integrationKeys.webhookLogs(id), params],
    queryFn: () => integrationService.getWebhookLogs(id, params),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useEmailTemplates = (params = {}) => {
  return useQuery({
    queryKey: [...integrationKeys.emailTemplates(), params],
    queryFn: () => integrationService.getEmailTemplates(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useSMSTemplates = (params = {}) => {
  return useQuery({
    queryKey: [...integrationKeys.smsTemplates(), params],
    queryFn: () => integrationService.getSMSTemplates(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useIntegrations = (params = {}) => {
  return useQuery({
    queryKey: [...integrationKeys.integrations(), params],
    queryFn: () => integrationService.getIntegrations(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useIntegration = (id) => {
  return useQuery({
    queryKey: integrationKeys.integration(id),
    queryFn: () => integrationService.getIntegrationById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useIntegrationLogs = (id, params = {}) => {
  return useQuery({
    queryKey: [...integrationKeys.integrationLogs(id), params],
    queryFn: () => integrationService.getIntegrationLogs(id, params),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useAPIKeys = (params = {}) => {
  return useQuery({
    queryKey: [...integrationKeys.apiKeys(), params],
    queryFn: () => integrationService.getAPIKeys(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutations
export const useCreateWebhook = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.createWebhook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.webhooks() })
    },
    onError: (error) => {
      console.error('Create webhook failed:', error)
    },
  })
}

export const useUpdateWebhook = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => integrationService.updateWebhook(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.webhooks() })
      queryClient.setQueryData(integrationKeys.webhook(variables.id), data)
    },
    onError: (error) => {
      console.error('Update webhook failed:', error)
    },
  })
}

export const useDeleteWebhook = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.deleteWebhook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.webhooks() })
    },
    onError: (error) => {
      console.error('Delete webhook failed:', error)
    },
  })
}

export const useTestWebhook = () => {
  return useMutation({
    mutationFn: ({ id, testData }) => integrationService.testWebhook(id, testData),
    onError: (error) => {
      console.error('Test webhook failed:', error)
    },
  })
}

export const useSendEmail = () => {
  return useMutation({
    mutationFn: integrationService.sendEmail,
    onError: (error) => {
      console.error('Send email failed:', error)
    },
  })
}

export const useCreateEmailTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.createEmailTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.emailTemplates() })
    },
    onError: (error) => {
      console.error('Create email template failed:', error)
    },
  })
}

export const useUpdateEmailTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => integrationService.updateEmailTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.emailTemplates() })
    },
    onError: (error) => {
      console.error('Update email template failed:', error)
    },
  })
}

export const useDeleteEmailTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.deleteEmailTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.emailTemplates() })
    },
    onError: (error) => {
      console.error('Delete email template failed:', error)
    },
  })
}

export const useSendSMS = () => {
  return useMutation({
    mutationFn: integrationService.sendSMS,
    onError: (error) => {
      console.error('Send SMS failed:', error)
    },
  })
}

export const useCreateSMSTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.createSMSTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.smsTemplates() })
    },
    onError: (error) => {
      console.error('Create SMS template failed:', error)
    },
  })
}

export const useUpdateSMSTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => integrationService.updateSMSTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.smsTemplates() })
    },
    onError: (error) => {
      console.error('Update SMS template failed:', error)
    },
  })
}

export const useDeleteSMSTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.deleteSMSTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.smsTemplates() })
    },
    onError: (error) => {
      console.error('Delete SMS template failed:', error)
    },
  })
}

export const useActivateIntegration = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, config }) => integrationService.activateIntegration(id, config),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.integrations() })
      queryClient.setQueryData(integrationKeys.integration(variables.id), data)
    },
    onError: (error) => {
      console.error('Activate integration failed:', error)
    },
  })
}

export const useDeactivateIntegration = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.deactivateIntegration,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.integrations() })
      queryClient.setQueryData(integrationKeys.integration(variables), data)
    },
    onError: (error) => {
      console.error('Deactivate integration failed:', error)
    },
  })
}

export const useTestIntegration = () => {
  return useMutation({
    mutationFn: ({ id, testData }) => integrationService.testIntegration(id, testData),
    onError: (error) => {
      console.error('Test integration failed:', error)
    },
  })
}

export const useCreateAPIKey = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.createAPIKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.apiKeys() })
    },
    onError: (error) => {
      console.error('Create API key failed:', error)
    },
  })
}

export const useDeleteAPIKey = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.deleteAPIKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.apiKeys() })
    },
    onError: (error) => {
      console.error('Delete API key failed:', error)
    },
  })
}

export const useRegenerateAPIKey = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: integrationService.regenerateAPIKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationKeys.apiKeys() })
    },
    onError: (error) => {
      console.error('Regenerate API key failed:', error)
    },
  })
}

