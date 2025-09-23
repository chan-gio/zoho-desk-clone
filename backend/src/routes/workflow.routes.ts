import { Router } from 'express';
import { WorkflowController } from '../controllers/workflow.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// Workflow routes
router.get('/', WorkflowController.getWorkflows);
router.get('/:id', WorkflowController.getWorkflowById);
router.post('/', requireRole('admin', 'agent'), WorkflowController.createWorkflow);
router.put('/:id', requireRole('admin', 'agent'), WorkflowController.updateWorkflow);
router.delete('/:id', requireRole('admin'), WorkflowController.deleteWorkflow);
router.post('/:id/execute', requireRole('admin', 'agent'), WorkflowController.executeWorkflow);

export default router;
