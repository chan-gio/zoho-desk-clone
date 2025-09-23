import { Router } from 'express';
import { TenantController } from '../controllers/tenant.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();
// Get tenants by user ID
router.get('/users/:userId/tenants', TenantController.getTenantsByUserId);

// Public routes (no authentication required)
router.get('/tenants', TenantController.getAllTenants);
router.get('/tenants/:id', TenantController.getTenantById);

// Protected routes (authentication required)
router.use(authMiddleware);

// Admin only routes
router.post('/tenants', requireRole('admin', 'super_admin'), TenantController.createTenant);
router.put('/tenants/:id', requireRole('admin', 'super_admin'), TenantController.updateTenant);
router.delete('/tenants/:id', requireRole('admin', 'super_admin'), TenantController.deleteTenant);

// Tenant management routes
router.get('/tenants/:id/stats', requireRole('admin', 'agent'), TenantController.getTenantStats);
router.post('/tenants/:tenantId/users', requireRole('admin', 'super_admin'), TenantController.addUserToTenant);
router.delete('/tenants/:tenantId/users', requireRole('admin', 'super_admin'), TenantController.removeUserFromTenant);

export default router;
