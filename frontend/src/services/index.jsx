// Export tất cả services
export { default as api, apiUtils } from './api.jsx'
export { authService } from './authService.jsx'
export { userService } from './userService.jsx'
export { notificationService } from './notificationService.jsx'
export { ticketService } from './ticketService.jsx'
export { customerService } from './customerService.jsx'
export { reportService } from './reportService.jsx'
export { tenantService } from './tenantService.jsx'
export { commentService } from './commentService.jsx'
export { workflowService } from './workflowService.jsx'
export { slaService } from './slaService.jsx'
export { roleService } from './roleService.jsx'
export { metricsService } from './metricsService.jsx'
export { knowledgeBaseService } from './knowledgeBaseService.jsx'
export { integrationService } from './integrationService.jsx'
export { departmentService } from './departmentService.jsx'
export { columnService } from './columnService.jsx'

// Export tất cả services dưới dạng object
export const services = {
  api,
  apiUtils,
  authService,
  userService,
  notificationService,
  ticketService,
  customerService,
  reportService,
  tenantService,
  commentService,
  workflowService,
  slaService,
  roleService,
  metricsService,
  knowledgeBaseService,
  integrationService,
  departmentService,
  columnService
}

// Default export
export default services
