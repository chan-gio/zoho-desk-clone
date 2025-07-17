import { Request, Response } from 'express';
import { RoleRepository } from '../repositories/role.repository';

export class RoleController {
  static async getAllRoles(_req: Request, res: Response) {
    const roles = RoleRepository.getAllRoles();
    res.json({ roles });
  }

  static async isValidRole(req: Request, res: Response) {
    const { role } = req.params;
    const valid = RoleRepository.isValidRole(role);
    res.json({ valid });
  }
}
