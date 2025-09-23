import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.js';

const router = Router();

// Analytics routes
router.get('/tickets', AnalyticsController.getTicketStats);
router.get('/sla-compliance', AnalyticsController.getSLACompliance);
router.get('/agent-performance', AnalyticsController.getAgentPerformance);
router.post('/export', AnalyticsController.exportAnalyticsReport);

export default router;
