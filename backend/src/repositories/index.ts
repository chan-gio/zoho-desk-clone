// PostgreSQL Repositories (Core & Ticket System)
export * from './user.repository.js';
export * from './tenant.repository.js';
export * from './role.repository.js';
export * from './ticket.repository.js';
export * from './comment.repository.js';
export * from './department.repository.js';
export * from './sla.repository.js';
export * from './attachment.repository.js';

// Analytics Repositories
export * from './metrics.repository.js';

// Integration Repositories
// Webhook functionality will be handled by integration services

// MongoDB Repositories (Knowledge Base, Notifications, Audit)
export * from './mongodb/index.js';
