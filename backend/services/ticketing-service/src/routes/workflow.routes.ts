import { Router } from 'express';
import { WorkflowController } from '../controllers/workflow.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';

export function workflowRoutes(workflowController: WorkflowController) {
  const router = Router();
  router.use(apiRateLimiter, authMiddleware, tenantGuard);
  router.get('/workflows', workflowController.getWorkflows);
  router.get('/workflows/:id', workflowController.getWorkflowById);
  router.post('/workflows', workflowController.createWorkflow);
  router.put('/workflows/:id', workflowController.updateWorkflow);
  router.delete('/workflows/:id', workflowController.deleteWorkflow);
  return router;
} 