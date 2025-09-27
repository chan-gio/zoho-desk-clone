import { Router } from 'express';
import { StatusController } from '../controllers/status.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { tenantGuard } from '../middleware/tenant.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Tất cả routes đều cần authentication và tenant context
router.use(authMiddleware);
router.use(tenantGuard);

// Status CRUD operations
router.get('/', StatusController.getStatuses);
router.get('/:id', StatusController.getStatusById);
router.post('/', requireRole('admin'), StatusController.createStatus);
router.put('/:id', requireRole('admin'), StatusController.updateStatus);
router.delete('/:id', requireRole('admin'), StatusController.deleteStatus);

// Utility endpoints
router.post('/initialize-defaults', requireRole('admin'), StatusController.initializeDefaults);

export default router;
