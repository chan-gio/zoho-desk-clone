import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../../prisma/generated/client';
import { UserService } from '../services/user.service';

const prisma = new PrismaClient();
const userService = new UserService(prisma);

export class UserController {
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async listUsersByTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = req.headers['x-tenant-id'] as string;
      const users = await userService.getUsersByTenant(tenantId);
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await userService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await userService.updateUser(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async softDeleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.softDeleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { tenant_id, role } = req.query;
      const users = await userService.getUsers({ tenantId: tenant_id as string, role: role as any });
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserByEmail(req.params.email);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}
