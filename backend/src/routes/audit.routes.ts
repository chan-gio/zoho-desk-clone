import { Router } from 'express';
import { AuditController } from '../controllers/audit.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// Audit log routes
router.get('/', requireRole('admin'), AuditController.getAuditLogs);
router.get('/:id', requireRole('admin'), AuditController.getAuditLogById);
router.get('/summary/stats', requireRole('admin'), AuditController.getAuditSummary);

// Audit log routes by user
router.get('/user/:userId', requireRole('admin'), AuditController.getAuditLogsByUser);

// Audit log routes by resource
router.get('/resource/:resourceId', requireRole('admin'), AuditController.getAuditLogsByResource);

// Export routes
router.get('/export/data', requireRole('admin'), AuditController.exportAuditLogs);

export default router;
