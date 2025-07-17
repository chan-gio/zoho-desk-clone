import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';
import { requireRole } from '../../../../shared/src/middlewares/rbac.middleware';

export function departmentRoutes(departmentController: DepartmentController) {
  const router = Router();
  router.use(apiRateLimiter, authMiddleware, tenantGuard);
  router.get('/departments', departmentController.getDepartments);
  router.post('/departments', requireRole('admin'), departmentController.createDepartment);
  router.put('/departments/:id', requireRole('admin'), departmentController.updateDepartment);
  router.delete('/departments/:id', requireRole('admin'), departmentController.deleteDepartment);
  return router;
} 