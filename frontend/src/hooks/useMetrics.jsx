import { useMutation, useQuery } from '@tanstack/react-query'
import { metricsService } from '../services/metricsService'

// Query keys
export const metricsKeys = {
  all: ['metrics'],
  tickets: (period) => [...metricsKeys.all, 'tickets', period],
  agents: (agentId, period) => [...metricsKeys.all, 'agents', agentId, period],
  departments: (departmentId, period) => [...metricsKeys.all, 'departments', departmentId, period],
  sla: (period) => [...metricsKeys.all, 'sla', period],
  dashboard: () => [...metricsKeys.all, 'dashboard'],
  byType: (type, period) => [...metricsKeys.all, 'byType', type, period],
  realTime: () => [...metricsKeys.all, 'realTime'],
  dateRange: (startDate, endDate, type) => [...metricsKeys.all, 'dateRange', startDate, endDate, type],
  trends: (period, metric) => [...metricsKeys.all, 'trends', period, metric],
  comparative: (period1, period2, type) => [...metricsKeys.all, 'comparative', period1, period2, type],
}

// Custom hooks for metrics
export const useTicketMetrics = (period = '30d') => {
  return useQuery({
    queryKey: metricsKeys.tickets(period),
    queryFn: () => metricsService.getTicketMetrics(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useAgentMetrics = (agentId = null, period = '30d') => {
  return useQuery({
    queryKey: metricsKeys.agents(agentId, period),
    queryFn: () => metricsService.getAgentMetrics(agentId, period),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDepartmentMetrics = (departmentId = null, period = '30d') => {
  return useQuery({
    queryKey: metricsKeys.departments(departmentId, period),
    queryFn: () => metricsService.getDepartmentMetrics(departmentId, period),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSLAMetrics = (period = '30d') => {
  return useQuery({
    queryKey: metricsKeys.sla(period),
    queryFn: () => metricsService.getSLAMetrics(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: metricsKeys.dashboard(),
    queryFn: metricsService.getDashboardMetrics,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

export const useMetricsByType = (type, period = '30d') => {
  return useQuery({
    queryKey: metricsKeys.byType(type, period),
    queryFn: () => metricsService.getMetricsByType(type, period),
    enabled: !!type,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useRealTimeMetrics = () => {
  return useQuery({
    queryKey: metricsKeys.realTime(),
    queryFn: metricsService.getRealTimeMetrics,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}

export const useMetricsByDateRange = (startDate, endDate, type = 'all') => {
  return useQuery({
    queryKey: metricsKeys.dateRange(startDate, endDate, type),
    queryFn: () => metricsService.getMetricsByDateRange(startDate, endDate, type),
    enabled: !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const usePerformanceTrends = (period = '30d', metric = 'all') => {
  return useQuery({
    queryKey: metricsKeys.trends(period, metric),
    queryFn: () => metricsService.getPerformanceTrends(period, metric),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useComparativeMetrics = (period1, period2, type = 'tickets') => {
  return useQuery({
    queryKey: metricsKeys.comparative(period1, period2, type),
    queryFn: () => metricsService.getComparativeMetrics(period1, period2, type),
    enabled: !!period1 && !!period2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutations
export const useExportMetricsReport = () => {
  return useMutation({
    mutationFn: ({ type, format = 'excel', params = {} }) => 
      metricsService.exportMetricsReport(type, format, params),
    onError: (error) => {
      console.error('Export metrics report failed:', error)
    },
  })
}
