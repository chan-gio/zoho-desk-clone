import { Router } from 'express';
import { UserController, uploadAvatar } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { tenantGuard } from '../middleware/tenant.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// RBAC: chỉ admin/agent mới được thao tác user
// User CRUD operations
router.get('/', authMiddleware, tenantGuard, requireRole('admin', 'agent'), UserController.getUsers);
router.get('/tenant', authMiddleware, tenantGuard, requireRole('admin', 'agent'), UserController.listUsersByTenant);
router.get('/:id', authMiddleware, tenantGuard, requireRole('admin', 'agent'), UserController.getUserById);
router.get('/email/:email', authMiddleware, tenantGuard, requireRole('admin'), UserController.getUserByEmail);
router.post('/', authMiddleware, tenantGuard, requireRole('admin'), UserController.createUser);
router.put('/:id', authMiddleware, tenantGuard, requireRole('admin'), uploadAvatar.single('avatar'), UserController.updateUser);
router.delete('/:id', authMiddleware, tenantGuard, requireRole('admin'), UserController.softDeleteUser);

// User profile operations (user can manage their own profile)
router.put('/profile', authMiddleware, uploadAvatar.single('avatar'), UserController.updateUser);

export default router;
