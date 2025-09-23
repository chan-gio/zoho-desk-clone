// PostgreSQL Models (Core & Ticket System)
export * from './user.model.js';
export * from './tenant.model.js';
export * from './role.model.js';
export * from './ticket.model.js';
export * from './comment.model.js';
export * from './department.model.js';
export * from './workflow.model.js';
export * from './sla.model.js';
export * from './attachment.model.js';

// Analytics Models
export * from './metrics.model.js';

// Integration Models
// Webhook functionality will be handled by integration services

// MongoDB Models (Knowledge Base, Notifications, Audit)
export * from './mongodb/index.js';
