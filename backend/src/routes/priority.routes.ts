import { Router } from 'express';
import { PriorityController } from '../controllers/priority.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { tenantGuard } from '../middleware/tenant.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Tất cả routes đều cần authentication và tenant context
router.use(authMiddleware);
router.use(tenantGuard);

// Priority CRUD operations
router.get('/', PriorityController.getPriorities);
router.get('/:id', PriorityController.getPriorityById);
router.post('/', requireRole('admin'), PriorityController.createPriority);
router.put('/:id', requireRole('admin'), PriorityController.updatePriority);
router.delete('/:id', requireRole('admin'), PriorityController.deletePriority);

// Utility endpoints
router.post('/initialize-defaults', requireRole('admin'), PriorityController.initializeDefaults);

export default router;
