import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '../shared/utils/response.js';
import { TenantService } from '../services/tenant.service.js';

// Lazy initialization to avoid Prisma client initialization issues
let tenantService: TenantService | null = null;

const getTenantService = (): TenantService => {
  if (!tenantService) {
    tenantService = new TenantService();
  }
  return tenantService;
};

export class TenantController {
  // Get all tenants
  static async getAllTenants(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const tenants = await getTenantService().getAllTenants({
        page: Number(page),
        limit: Number(limit),
        search: search as string
      });
      return res.json(successResponse({ data: tenants, message: 'Tenants retrieved successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Get tenant by ID
  static async getTenantById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const tenant = await getTenantService().getTenantById(id);
      if (!tenant) {
        return res.status(404).json(errorResponse({ error: 'Tenant not found' }));
      }

      return res.json(successResponse({ data: tenant, message: 'Tenant retrieved successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Get tenants by user ID
  static async getTenantsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json(errorResponse({ error: 'User ID is required' }));
      }

      const { page = 1, limit = 10 } = req.query;
      const tenants = await getTenantService().getTenantsByUserId(userId, {
        page: Number(page),
        limit: Number(limit)
      });

      return res.json(successResponse({ data: tenants, message: 'Tenants retrieved successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Create new tenant
  static async createTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json(errorResponse({ error: 'Tenant name is required' }));
      }

      const tenant = await getTenantService().createTenant({
        name,
        description
      });

      return res.status(201).json(successResponse({ data: tenant, message: 'Tenant created successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Update tenant
  static async updateTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const { name, description } = req.body;
      const tenant = await getTenantService().updateTenant(id, {
        name,
        description
      });

      if (!tenant) {
        return res.status(404).json(errorResponse({ error: 'Tenant not found' }));
      }

      return res.json(successResponse({ data: tenant, message: 'Tenant updated successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Delete tenant
  static async deleteTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const deleted = await getTenantService().deleteTenant(id);
      if (!deleted) {
        return res.status(404).json(errorResponse({ error: 'Tenant not found' }));
      }

      return res.json(successResponse({ data: null, message: 'Tenant deleted successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Get tenant statistics
  static async getTenantStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const stats = await getTenantService().getTenantStats(id);
      return res.json(successResponse({ data: stats, message: 'Tenant statistics retrieved successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Add user to tenant
  static async addUserToTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { tenantId, userId, role = 'customer' } = req.body;
      if (!tenantId || !userId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID and User ID are required' }));
      }

      const result = await getTenantService().addUserToTenant(tenantId, userId, role);
      return res.status(201).json(successResponse({ data: result, message: 'User added to tenant successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }

  // Remove user from tenant
  static async removeUserFromTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { tenantId, userId } = req.body;
      if (!tenantId || !userId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID and User ID are required' }));
      }

      const result = await getTenantService().removeUserFromTenant(tenantId, userId);
      return res.json(successResponse({ data: result, message: 'User removed from tenant successfully' }));
    } catch (err) {
      next(err);
      return;
    }
  }
}
