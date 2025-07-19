import { Router } from 'express';
import { requireRole } from '../../../../shared/src/middlewares/rbac.middleware';
import {
  getTicketStats,
  getSLACompliance,
  getAgentPerformance,
  exportAnalyticsReport
} from '../controllers/analytics.controller';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';

const router = Router();
router.use(apiRateLimiter, authMiddleware, tenantGuard);

// GET /analytics/tickets
router.get('/tickets', requireRole('admin', 'agent'), getTicketStats);

// GET /analytics/sla-compliance
router.get('/sla-compliance', requireRole('admin', 'agent'), getSLACompliance);

// GET /analytics/agent-performance
router.get('/agent-performance', requireRole('admin', 'agent'), getAgentPerformance);

// POST /analytics/export
router.post('/export', requireRole('admin'), exportAnalyticsReport);

export default router; 