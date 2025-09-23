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

// Re-export commonly used hooks for convenience
export {
  // Auth hooks
  useCurrentUser,
  useLogin,
  useLogout,
  useIsAuthenticated,
  useHasPermission,
  useHasRole,
  
  // User hooks
  useUsers,
  useUser,
  useAgents,
  useAdmins,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  
  // Ticket hooks
  useTickets,
  useTicket,
  useTicketComments,
  useTicketStats,
  useCreateTicket,
  useUpdateTicket,
  useDeleteTicket,
  useAddComment,
  useAssignTicket,
  
  // Notification hooks
  useNotifications,
  useUnreadNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  
  // Customer hooks
  useCustomers,
  useCustomer,
  useVipCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  
  // Report hooks
  useReports,
  useDashboardData,
  useRealTimeReport,
  useAgentPerformanceReport,
  useExportReport,
  
  // SLA hooks
  useSLAs,
  useSLA,
  useSLABreaches,
  useSLACompliance,
  useCreateSLA,
  useUpdateSLA,
  useDeleteSLA,
  
  // Workflow hooks
  useWorkflows,
  useWorkflow,
  useWorkflowRuns,
  useCreateWorkflow,
  useUpdateWorkflow,
  useDeleteWorkflow,
  useActivateWorkflow,
  useDeactivateWorkflow,
  
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
  
  // Tenant hooks
  useTenants,
  useTenant,
  useTenantsByUserId,
  useCreateTenant,
  useUpdateTenant,
  useDeleteTenant,
  
  // Comment hooks
  useComments,
  useComment,
  useCommentsByTicket,
  useAddComment,
  useUpdateComment,
  useDeleteComment,
  
  // Role hooks
  useRoles,
  useRole,
  useAllPermissions,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  
  // Metrics hooks
  useTicketMetrics,
  useAgentMetrics,
  useDashboardMetrics,
  useRealTimeMetrics,
  useExportMetricsReport,
  
  // Knowledge Base hooks
  useArticles,
  useArticle,
  useCategories,
  useCategory,
  useSearchArticles,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
  
  // Integration hooks
  useWebhooks,
  useWebhook,
  useCreateWebhook,
  useUpdateWebhook,
  useDeleteWebhook,
  useSendEmail,
  useSendSMS,
  
  // Department hooks
  useDepartments,
  useDepartment,
  useDepartmentUsers,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from './useAuth'
