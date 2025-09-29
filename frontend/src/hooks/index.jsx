// Export all custom hooks
export * from './useAuth'
export * from './useUsers'
export * from './useTickets'
export * from './useNotifications'
export * from './useCustomers'
export * from './useReports'
export * from './useSLAs'
export * from './useWorkflows'
export * from './useColumns'
export * from './useTenants'
export * from './useComments'
export * from './useRoles'
export * from './useMetrics'
export * from './useKnowledgeBase'
export * from './useIntegrations'
export * from './useDepartments'
export * from './usePriorities'
export * from './useStatuses'

// Re-export commonly used hooks for convenience
export {
  // Auth hooks
  useCurrentUser,
  useLogin,
  useLogout,
  useIsAuthenticated,
  useHasPermission,
  useHasRole,
  useUserTenants,
  useSelectTenant,
} from './useAuth'

export {
  // User hooks
  useUsers,
  useUsersByTenant,
  useUser,
  useAgents,
  useAdmins,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from './useUsers'

export {
  // Ticket hooks
  useTickets,
  useTicket,
  useTicketComments,
  useTicketStats,
  useCreateTicket,
  useUpdateTicket,
  useDeleteTicket,
  useAssignTicket,
} from './useTickets'

export {
  // Notification hooks
  useNotifications,
  useUnreadNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
} from './useNotifications'

export {
  // Customer hooks
  useCustomers,
  useCustomer,
  useVipCustomers,
  useCreateCustomer,
  useUpdateCustomer,
} from './useCustomers'

export {
  // Report hooks
  useReports,
  useDashboardData,
  useRealTimeReport,
  useAgentPerformanceReport,
  useExportReport,
} from './useReports'

export {
  // SLA hooks
  useSLAs,
  useSLA,
  useSLABreaches,
  useSLACompliance,
  useCreateSLA,
  useUpdateSLA,
  useDeleteSLA,
} from './useSLAs'

export {
  // Workflow hooks
  useWorkflows,
  useWorkflow,
  useWorkflowRuns,
  useCreateWorkflow,
  useUpdateWorkflow,
  useDeleteWorkflow,
  useActivateWorkflow,
  useDeactivateWorkflow,
} from './useWorkflows'

export {
  // Column hooks
  useColumns,
  useColumn,
  useColumnTickets,
  useCreateColumn,
  useUpdateColumn,
  useDeleteColumn,
  useReorderColumns,
  useMoveTicketToColumn,
  useReorderTicketsInColumn,
} from './useColumns'

export {
  // Tenant hooks
  useTenants,
  useTenant,
  useTenantsByUserId,
  useCreateTenant,
  useUpdateTenant,
  useDeleteTenant,
} from './useTenants'

export {
  // Comment hooks
  useComments,
  useComment,
  useCommentsByTicket,
  useAddComment,
  useUpdateComment,
  useDeleteComment,
} from './useComments'

export {
  // Role hooks
  useRoles,
  useRole,
  useAllPermissions,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
} from './useRoles'

export {
  // Metrics hooks
  useTicketMetrics,
  useAgentMetrics,
  useDashboardMetrics,
  useRealTimeMetrics,
  useExportMetricsReport,
} from './useMetrics'

export {
  // Knowledge Base hooks
  useArticles,
  useArticle,
  useCategories,
  useCategory,
  useSearchArticles,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
} from './useKnowledgeBase'

export {
  // Integration hooks
  useWebhooks,
  useWebhook,
  useCreateWebhook,
  useUpdateWebhook,
  useDeleteWebhook,
  useSendEmail,
  useSendSMS,
} from './useIntegrations'

export {
  // Department hooks
  useDepartments,
  useDepartment,
  useDepartmentUsers,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from './useDepartments'

export {
  // Priority hooks
  usePriorities,
  usePrioritiesByTenant,
  usePriority,
  useCreatePriority,
  useUpdatePriority,
  useDeletePriority,
} from './usePriorities'

export {
  // Status hooks
  useStatuses,
  useStatusesByTenant,
  useStatus,
  useCreateStatus,
  useUpdateStatus,
  useDeleteStatus,
} from './useStatuses'
