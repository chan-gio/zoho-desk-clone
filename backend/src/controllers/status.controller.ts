import { Request, Response, NextFunction } from 'express';
import { StatusService } from '../services/status.service.js';
import { successResponse, errorResponse } from '../shared/utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class StatusController {
  private statusService: StatusService;

  constructor() {
    this.statusService = new StatusService();
  }

  // Lấy tất cả statuses của tenant
  static async getStatuses(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tenantId = req.user?.tenantId;
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const statusService = new StatusService();
      const statuses = await statusService.getStatusesByTenant(tenantId);

      return res.json(successResponse({
        data: statuses,
        message: 'Statuses retrieved successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Lấy status theo ID
  static async getStatusById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Status ID is required' }));
      }

      const statusService = new StatusService();
      const status = await statusService.getStatusById(id);

      if (!status) {
        return res.status(404).json(errorResponse({ error: 'Status not found' }));
      }

      return res.json(successResponse({
        data: status,
        message: 'Status retrieved successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Tạo status mới
  static async createStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tenantId = req.user?.tenantId;
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const { name, color, isDefault } = req.body;

      if (!name || !color) {
        return res.status(400).json(errorResponse({ 
          error: 'Name and color are required' 
        }));
      }

      const statusService = new StatusService();
      const status = await statusService.createStatus({
        name,
        color,
        tenantId,
        isDefault: isDefault || false
      });

      return res.status(201).json(successResponse({
        data: status,
        message: 'Status created successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Cập nhật status
  static async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Status ID is required' }));
      }

      const { name, color, order } = req.body;

      const statusService = new StatusService();
      const status = await statusService.updateStatus(id, {
        name,
        color,
        order
      });

      if (!status) {
        return res.status(404).json(errorResponse({ error: 'Status not found' }));
      }

      return res.json(successResponse({
        data: status,
        message: 'Status updated successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Xóa status
  static async deleteStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Status ID is required' }));
      }

      const statusService = new StatusService();
      await statusService.deleteStatus(id);

      return res.json(successResponse({
        data: null,
        message: 'Status deleted successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Khởi tạo statuses mặc định
  static async initializeDefaults(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tenantId = req.user?.tenantId;
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const statusService = new StatusService();
      const statuses = await statusService.initializeDefaultStatuses(tenantId);

      return res.json(successResponse({
        data: statuses,
        message: 'Default statuses initialized successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }
}
