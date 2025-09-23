import { Router } from 'express';
import { RoleController } from '../controllers/role.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// Role routes
router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.post('/', requireRole('admin'), RoleController.createRole);
router.put('/:id', requireRole('admin'), RoleController.updateRole);
router.delete('/:id', requireRole('admin'), RoleController.deleteRole);
router.get('/validate/:role', RoleController.isValidRole);

export default router;
