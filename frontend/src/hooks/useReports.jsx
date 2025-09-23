import { useMutation, useQuery } from '@tanstack/react-query'
import { reportService } from '../services/reportService'

// Query keys
export const reportKeys = {
  all: ['reports'],
  overview: () => [...reportKeys.all, 'overview'],
  byDateRange: (startDate, endDate) => [...reportKeys.all, 'dateRange', startDate, endDate],
  agentPerformance: () => [...reportKeys.all, 'agentPerformance'],
  ticketStatus: () => [...reportKeys.all, 'ticketStatus'],
  ticketPriority: () => [...reportKeys.all, 'ticketPriority'],
  ticketCategory: () => [...reportKeys.all, 'ticketCategory'],
  responseTime: () => [...reportKeys.all, 'responseTime'],
  resolutionTime: () => [...reportKeys.all, 'resolutionTime'],
  customerSatisfaction: () => [...reportKeys.all, 'customerSatisfaction'],
  department: () => [...reportKeys.all, 'department'],
  dashboard: () => [...reportKeys.all, 'dashboard'],
  realTime: () => [...reportKeys.all, 'realTime'],
  custom: (filters) => [...reportKeys.all, 'custom', filters],
}

// Custom hooks for reports
export const useReports = () => {
  return useQuery({
    queryKey: reportKeys.overview(),
    queryFn: reportService.getReports,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useReportsByDateRange = (startDate, endDate) => {
  return useQuery({
    queryKey: reportKeys.byDateRange(startDate, endDate),
    queryFn: () => reportService.getReportsByDateRange(startDate, endDate),
    enabled: !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useAgentPerformanceReport = () => {
  return useQuery({
    queryKey: reportKeys.agentPerformance(),
    queryFn: reportService.getAgentPerformance,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useTicketStatusReport = (params = {}) => {
  return useQuery({
    queryKey: [...reportKeys.ticketStatus(), params],
    queryFn: () => reportService.getTicketStatusReport(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useTicketPriorityReport = (params = {}) => {
  return useQuery({
    queryKey: [...reportKeys.ticketPriority(), params],
    queryFn: () => reportService.getTicketPriorityReport(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useTicketCategoryReport = (params = {}) => {
  return useQuery({
    queryKey: [...reportKeys.ticketCategory(), params],
    queryFn: () => reportService.getTicketCategoryReport(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useResponseTimeReport = (params = {}) => {
  return useQuery({
    queryKey: [...reportKeys.responseTime(), params],
    queryFn: () => reportService.getResponseTimeReport(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useResolutionTimeReport = (params = {}) => {
  return useQuery({
    queryKey: [...reportKeys.resolutionTime(), params],
    queryFn: () => reportService.getResolutionTimeReport(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCustomerSatisfactionReport = (params = {}) => {
  return useQuery({
    queryKey: [...reportKeys.customerSatisfaction(), params],
    queryFn: () => reportService.getCustomerSatisfactionReport(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useDepartmentReport = (params = {}) => {
  return useQuery({
    queryKey: [...reportKeys.department(), params],
    queryFn: () => reportService.getDepartmentReport(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDashboardData = () => {
  return useQuery({
    queryKey: reportKeys.dashboard(),
    queryFn: reportService.getDashboardData,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

export const useRealTimeReport = () => {
  return useQuery({
    queryKey: reportKeys.realTime(),
    queryFn: reportService.getRealTimeReport,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}

export const useCustomReport = (filters) => {
  return useQuery({
    queryKey: reportKeys.custom(filters),
    queryFn: () => reportService.getCustomReport(filters),
    enabled: !!filters,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutations
export const useExportReport = () => {
  return useMutation({
    mutationFn: ({ reportType, params = {} }) => 
      reportService.exportReport(reportType, params),
    onError: (error) => {
      console.error('Export report failed:', error)
    },
  })
}
