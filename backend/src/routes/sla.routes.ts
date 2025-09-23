import { Router } from 'express';
import { SLAController } from '../controllers/sla.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// SLA routes
router.get('/', SLAController.getSLAs);
router.get('/:id', SLAController.getSLAById);
router.post('/', requireRole('admin'), SLAController.createSLA);
router.put('/:id', requireRole('admin'), SLAController.updateSLA);
router.delete('/:id', requireRole('admin'), SLAController.deleteSLA);

// SLA breach routes
router.get('/breaches/list', SLAController.getSLABreaches);
router.get('/tickets/compliance/:ticketId', SLAController.checkSLACompliance);

export default router;
