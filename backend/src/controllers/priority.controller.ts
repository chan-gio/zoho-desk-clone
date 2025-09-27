import { Request, Response, NextFunction } from 'express';
import { PriorityService } from '../services/priority.service.js';
import { successResponse, errorResponse } from '../shared/utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export class PriorityController {
  private priorityService: PriorityService;

  constructor() {
    this.priorityService = new PriorityService();
  }

  // Lấy tất cả priorities của tenant
  static async getPriorities(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tenantId = req.user?.tenantId;
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const priorityService = new PriorityService();
      const priorities = await priorityService.getPrioritiesByTenant(tenantId);

      return res.json(successResponse({
        data: priorities,
        message: 'Priorities retrieved successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Lấy priority theo ID
  static async getPriorityById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Priority ID is required' }));
      }

      const priorityService = new PriorityService();
      const priority = await priorityService.getPriorityById(id);

      if (!priority) {
        return res.status(404).json(errorResponse({ error: 'Priority not found' }));
      }

      return res.json(successResponse({
        data: priority,
        message: 'Priority retrieved successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Tạo priority mới
  static async createPriority(req: AuthRequest, res: Response, next: NextFunction) {
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

      const priorityService = new PriorityService();
      const priority = await priorityService.createPriority({
        name,
        color,
        tenantId,
        isDefault: isDefault || false
      });

      return res.status(201).json(successResponse({
        data: priority,
        message: 'Priority created successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Cập nhật priority
  static async updatePriority(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Priority ID is required' }));
      }

      const { name, color, order } = req.body;

      const priorityService = new PriorityService();
      const priority = await priorityService.updatePriority(id, {
        name,
        color,
        order
      });

      if (!priority) {
        return res.status(404).json(errorResponse({ error: 'Priority not found' }));
      }

      return res.json(successResponse({
        data: priority,
        message: 'Priority updated successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Xóa priority
  static async deletePriority(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Priority ID is required' }));
      }

      const priorityService = new PriorityService();
      await priorityService.deletePriority(id);

      return res.json(successResponse({
        data: null,
        message: 'Priority deleted successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }

  // Khởi tạo priorities mặc định
  static async initializeDefaults(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tenantId = req.user?.tenantId;
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Tenant ID is required' }));
      }

      const priorityService = new PriorityService();
      const priorities = await priorityService.initializeDefaultPriorities(tenantId);

      return res.json(successResponse({
        data: priorities,
        message: 'Default priorities initialized successfully'
      }));
    } catch (error) {
      next(error);
      return;
    }
  }
}
