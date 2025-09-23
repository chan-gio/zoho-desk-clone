import { Request, Response, NextFunction } from 'express';
import { RoleService } from '../services/role.service.js';

const roleService = new RoleService();

export class RoleController {
  static async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      const roles = await roleService.getAllRoles(tenantId);
      return res.json({ roles });
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      const role = await roleService.getRoleById(id, tenantId);
      if (!role) return res.status(404).json({ message: 'Role not found' });
      return res.json(role);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      const roleData = { ...req.body, tenantId };
      const role = await roleService.createRole(roleData);
      return res.status(201).json(role);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      const role = await roleService.updateRole(id, tenantId, req.body);
      if (!role) return res.status(404).json({ message: 'Role not found' });
      return res.json(role);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      const deleted = await roleService.deleteRole(id, tenantId);
      if (!deleted) return res.status(404).json({ message: 'Role not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }

  static async isValidRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { role } = req.params;
      if (!role) return res.status(400).json({ message: 'Missing role parameter' });
      const valid = await roleService.isValidRole(role);
      return res.json({ valid });
    } catch (err) {
      next(err);
      return;
    }
  }
}
