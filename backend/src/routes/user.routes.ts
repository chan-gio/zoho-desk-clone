import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { tenantGuard } from '../middleware/tenant.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// RBAC: chỉ admin/agent mới được thao tác user
router.get('/users', authMiddleware, tenantGuard, requireRole('admin', 'agent'), UserController.getUsers);
router.get('/users/:id', authMiddleware, tenantGuard, requireRole('admin', 'agent'), UserController.getUserById);
router.get('/user/email/:email', authMiddleware, tenantGuard, requireRole('admin'), UserController.getUserByEmail);
router.post('/users', authMiddleware, tenantGuard, requireRole('admin'), UserController.createUser);
router.put('/users/:id', authMiddleware, tenantGuard, requireRole('admin'), UserController.updateUser);
router.delete('/users/:id', authMiddleware, tenantGuard, requireRole('admin'), UserController.softDeleteUser);

export default router;
