import { Router } from 'express';
import { MetricsService } from '../services/metrics.service.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();
const metricsService = new MetricsService();

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// Metrics routes
router.get('/tickets', requireRole('admin', 'agent'), async (req, res, next) => {
  try {
    const tenantId = (req as any).user?.tenantId;
    const { period = '30d' } = req.query;
    const metrics = await metricsService.getTicketMetrics(tenantId, period as string);
    res.json(metrics);
  } catch (err) {
    next(err);
    return;
  }
});

router.get('/agents', requireRole('admin', 'agent'), async (req, res, next) => {
  try {
    const tenantId = (req as any).user?.tenantId;
    const { agentId, period = '30d' } = req.query;
    const metrics = await metricsService.getAgentMetrics(tenantId, agentId as string, period as string);
    res.json(metrics);
  } catch (err) {
    next(err);
    return;
  }
});

router.get('/departments', requireRole('admin', 'agent'), async (req, res, next) => {
  try {
    const tenantId = (req as any).user?.tenantId;
    const { departmentId, period = '30d' } = req.query;
    const metrics = await metricsService.getDepartmentMetrics(tenantId, departmentId as string, period as string);
    res.json(metrics);
  } catch (err) {
    next(err);
    return;
  }
});

router.get('/sla', requireRole('admin', 'agent'), async (req, res, next) => {
  try {
    const tenantId = (req as any).user?.tenantId;
    const { period = '30d' } = req.query;
    const metrics = await metricsService.getSLAMetrics(tenantId, period as string);
    res.json(metrics);
  } catch (err) {
    next(err);
    return;
  }
});

router.get('/dashboard', requireRole('admin', 'agent'), async (req, res, next) => {
  try {
    const tenantId = (req as any).user?.tenantId;
    const metrics = await metricsService.getDashboardMetrics(tenantId);
    res.json(metrics);
  } catch (err) {
    next(err);
    return;
  }
});

router.get('/type/:type', requireRole('admin', 'agent'), async (req, res, next) => {
  try {
    const tenantId = (req as any).user?.tenantId;
    const { type } = req.params;
    if (!type) return res.status(400).json({ message: 'Missing type parameter' });
    const { period = '30d' } = req.query;
    const metrics = await metricsService.getMetricsByType(type, tenantId, period as string);
    return res.json(metrics);
  } catch (err) {
    next(err);
    return;
  }
});

export default router;
