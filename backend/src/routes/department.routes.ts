import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// Department routes
router.get('/', DepartmentController.getDepartments);
router.get('/:id', DepartmentController.getDepartmentById);
router.post('/', requireRole('admin'), DepartmentController.createDepartment);
router.put('/:id', requireRole('admin'), DepartmentController.updateDepartment);
router.delete('/:id', requireRole('admin'), DepartmentController.deleteDepartment);

export default router;
