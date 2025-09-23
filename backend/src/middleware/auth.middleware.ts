import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getPrismaClient } from '../database/postgres.js';
import { AppError } from './error.middleware.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    tenantId?: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ducky') as any;
    
    const prisma = getPrismaClient();
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true,
        tenantId: true,
        isActive: true
      }
    });

    if (!user || !user.isActive) {
      throw new Error('Invalid token or user not found.');
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as string,
      tenantId: user.tenantId
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token.'));
    } else if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token expired.'));
    } else {
      return next(error);
    }
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions.'));
    }

    return next();
  };
};

export const requireTenant = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user?.tenantId) {
    return next(new AppError('Tenant context required.'));
  }
  return next();
};
