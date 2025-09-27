import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../../prisma/generated/client/index.js';
import { UserService } from '../services/user.service.js';
import { AvatarService } from '../services/avatar.service.js';
import { successResponse, errorResponse } from '../shared/utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();
const userService = new UserService(prisma);

// Cấu hình multer cho upload avatar (memory storage)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const uploadAvatar = multer({
  storage: multer.memoryStorage(), // Sử dụng memory storage thay vì disk storage
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export class UserController {
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.params.id || "");
      return res.json(user);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async listUsersByTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = req.headers['x-tenant-id'] as string;
      const users = await userService.getUsersByTenant(tenantId);
      
      // Format response theo chuẩn API
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Users retrieved successfully',
        data: {
          users: users,
          count: users.length
        },
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      next(err);
      return;
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await userService.registerUser(req.body);
      return res.status(201).json(newUser);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteUser(req.params.id || "");
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id || req.user?.id;
      if (!userId) {
        return res.status(400).json(errorResponse({ error: 'User ID is required' }));
      }

      let updateData = { ...req.body };

      // Nếu có file avatar được upload
      if (req.file) {
        const avatarService = new AvatarService();
        const avatarUrl = await avatarService.uploadUserAvatar(userId, req.file);
        updateData.avatar = avatarUrl;
      }

      const updated = await userService.updateUser(userId, updateData);
      return res.json(successResponse({
        data: updated,
        message: 'User updated successfully'
      }));
    } catch (err) {
      next(err);
      return;
    }
  }

  static async softDeleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.softDeleteUser(req.params.id || "");
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { tenant_id, role } = req.query;
      const users = await userService.getUsers({ tenantId: tenant_id as string, role: role as any });
      
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Users retrieved successfully',
        data: {
          users: users,
          count: users.length
        },
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserByEmail(req.params.email || "");
      return res.json(user);
    } catch (err) {
      next(err);
      return;
    }
  }


}
