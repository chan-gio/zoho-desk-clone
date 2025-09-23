import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { slaService } from '../services/slaService'

// Query keys
export const slaKeys = {
  all: ['slas'],
  lists: () => [...slaKeys.all, 'list'],
  list: (filters) => [...slaKeys.lists(), { filters }],
  details: () => [...slaKeys.all, 'detail'],
  detail: (id) => [...slaKeys.details(), id],
  breaches: () => [...slaKeys.all, 'breaches'],
  compliance: (ticketId) => [...slaKeys.all, 'compliance', ticketId],
  metrics: () => [...slaKeys.all, 'metrics'],
  performance: (startDate, endDate) => [...slaKeys.all, 'performance', startDate, endDate],
  alerts: () => [...slaKeys.all, 'alerts'],
  templates: () => [...slaKeys.all, 'templates'],
}

// Custom hooks for SLAs
export const useSLAs = (params = {}) => {
  return useQuery({
    queryKey: slaKeys.list(params),
    queryFn: () => slaService.getSLAs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSLA = (id) => {
  return useQuery({
    queryKey: slaKeys.detail(id),
    queryFn: () => slaService.getSLAById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSLABreaches = (params = {}) => {
  return useQuery({
    queryKey: [...slaKeys.breaches(), params],
    queryFn: () => slaService.getSLABreaches(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useSLACompliance = (ticketId) => {
  return useQuery({
    queryKey: slaKeys.compliance(ticketId),
    queryFn: () => slaService.checkSLACompliance(ticketId),
    enabled: !!ticketId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useSLAMetrics = (params = {}) => {
  return useQuery({
    queryKey: [...slaKeys.metrics(), params],
    queryFn: () => slaService.getSLAMetrics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSLAPerformance = (startDate, endDate, params = {}) => {
  return useQuery({
    queryKey: slaKeys.performance(startDate, endDate),
    queryFn: () => slaService.getSLAPerformance(startDate, endDate, params),
    enabled: !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSLAAlerts = (params = {}) => {
  return useQuery({
    queryKey: [...slaKeys.alerts(), params],
    queryFn: () => slaService.getSLAAlerts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSLATemplates = () => {
  return useQuery({
    queryKey: slaKeys.templates(),
    queryFn: slaService.getSLATemplates,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Mutations
export const useCreateSLA = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: slaService.createSLA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slaKeys.lists() })
      queryClient.invalidateQueries({ queryKey: slaKeys.templates() })
    },
    onError: (error) => {
      console.error('Create SLA failed:', error)
    },
  })
}

export const useUpdateSLA = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => slaService.updateSLA(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: slaKeys.lists() })
      queryClient.setQueryData(slaKeys.detail(variables.id), data)
    },
    onError: (error) => {
      console.error('Update SLA failed:', error)
    },
  })
}

export const useDeleteSLA = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: slaService.deleteSLA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slaKeys.lists() })
    },
    onError: (error) => {
      console.error('Delete SLA failed:', error)
    },
  })
}

export const useCreateSLAAlert = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: slaService.createSLAAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slaKeys.alerts() })
    },
    onError: (error) => {
      console.error('Create SLA alert failed:', error)
    },
  })
}

export const useUpdateSLAAlert = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, alertData }) => slaService.updateSLAAlert(id, alertData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slaKeys.alerts() })
    },
    onError: (error) => {
      console.error('Update SLA alert failed:', error)
    },
  })
}

export const useDeleteSLAAlert = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: slaService.deleteSLAAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slaKeys.alerts() })
    },
    onError: (error) => {
      console.error('Delete SLA alert failed:', error)
    },
  })
}

export const useCreateSLAFromTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ templateId, slaData }) => 
      slaService.createSLAFromTemplate(templateId, slaData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slaKeys.lists() })
    },
    onError: (error) => {
      console.error('Create SLA from template failed:', error)
    },
  })
}

export const useExportSLAReport = () => {
  return useMutation({
    mutationFn: (params = {}) => slaService.exportSLAReport(params),
    onError: (error) => {
      console.error('Export SLA report failed:', error)
    },
  })
}
