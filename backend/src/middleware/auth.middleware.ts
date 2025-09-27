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
      return next(new AppError('Access denied. No token provided.', 401));
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

    if (!user) {
      return next(new AppError('User not found. Token may be invalid.', 401));
    }

    if (!user.isActive) {
      return next(new AppError('User account is deactivated.', 403));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as string,
      tenantId: decoded.tenantId || user.tenantId // Ưu tiên tenantId từ JWT
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token format or signature.', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token has expired. Please login again.', 401));
    } else if (error instanceof jwt.NotBeforeError) {
      return next(new AppError('Token not active yet.', 401));
    } else {
      return next(new AppError('Authentication failed.', 401));
    }
  }
};

// Middleware cho các API yêu cầu tenantId
export const requireTenantMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.tenantId) {
      return next(new AppError('Tenant context required. Please select a tenant first.', 400));
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(`Insufficient permissions. Required roles: ${roles.join(', ')}. Your role: ${req.user.role}`, 403));
    }

    return next();
  };
};

export const requireTenant = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user?.tenantId) {
    return next(new AppError('Tenant context required.', 400));
  }
  return next();
};
