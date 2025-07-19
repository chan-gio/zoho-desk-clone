import { Router } from 'express';
import { requireRole } from '../../../../shared/src/middlewares/rbac.middleware';
import { getTicketTrends, getSLACompliance, getAgentStats } from '../controllers/dashboard.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';

const router = Router();
router.use(apiRateLimiter, authMiddleware, tenantGuard);

router.get('/ticket-trends', requireRole('agent', 'admin'), getTicketTrends);
router.get('/sla-compliance', requireRole('agent', 'admin'), getSLACompliance);
router.get('/agent-stats', requireRole('admin'), getAgentStats);

export default router; 