import { Router } from 'express';
import { requireRole } from '../../../../shared/src/middlewares/rbac.middleware';
import { getTicketCount, getAvgSLAResponseTime, getAgentPerformance } from '../controllers/report.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';

const router = Router();
router.use(apiRateLimiter, authMiddleware, tenantGuard);

router.get('/ticket-count', requireRole('agent', 'admin'), getTicketCount);
router.get('/sla-response', requireRole('agent', 'admin'), getAvgSLAResponseTime);
router.get('/agent-performance', requireRole('admin'), getAgentPerformance);

export default router; 