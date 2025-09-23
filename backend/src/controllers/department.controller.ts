import { DepartmentService } from '../services/department.service.js';
import { Request, Response, NextFunction } from 'express';

const departmentService = new DepartmentService();

export class DepartmentController {
  static async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, search } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      
      const result = await departmentService.listDepartments({
        tenantId,
        page: Number(page),
        limit: Number(limit),
        search: search as string
      });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getDepartmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      
      const department = await departmentService.getDepartmentById(id, tenantId);
      if (!department) return res.status(404).json({ message: 'Department not found' });
      return res.json(department);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      
      const data = { ...req.body, tenantId };
      const department = await departmentService.createDepartment(data);
      return res.status(201).json(department);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      
      const department = await departmentService.updateDepartment(id, tenantId, req.body);
      if (!department) return res.status(404).json({ message: 'Department not found' });
      return res.json(department);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      
      const deleted = await departmentService.deleteDepartment(id, tenantId);
      if (!deleted) return res.status(404).json({ message: 'Department not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }
}
