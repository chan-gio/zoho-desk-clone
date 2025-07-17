import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from '../services/department.service';

export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      const result = await this.departmentService.listDepartments({
        tenantId,
        page: Number(page),
        limit: Number(limit),
      });
      res.json(result);
    } catch (err) { next(err); }
  };

  createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: RBAC check admin
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      const data = { ...req.body, tenantId };
      const department = await this.departmentService.createDepartment(data);
      res.status(201).json(department);
    } catch (err) { next(err); }
  };

  updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: RBAC check admin
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      const department = await this.departmentService.updateDepartment(id, tenantId, req.body);
      res.json(department);
    } catch (err) { next(err); }
  };

  deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: RBAC check admin
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId' });
      }
      await this.departmentService.deleteDepartment(id, tenantId);
      res.status(204).send();
    } catch (err) { next(err); }
  };
} 