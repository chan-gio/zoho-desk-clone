import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { requiresAuth, getRequiredRoles } from '../config/routes';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    tenantId: string;
  };
  startTime?: number;
}

/**
 * JWT Authentication middleware for API Gateway
 * Validates JWT token and extracts user information
 */
export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Add request start time for response time calculation
    req.startTime = Date.now();

    // Check if route requires authentication
    if (!requiresAuth(req.path)) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const secret = process.env.JWT_SECRET || 'your-secret-key';

    try {
      const decoded = jwt.verify(token, secret) as any;
      
      // Validate required fields
      if (!decoded.id || !decoded.email || !decoded.role || !decoded.tenantId) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid token payload'
        });
      }

      // Assign user to request
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        tenantId: decoded.tenantId
      };

      // Check role-based access
      const requiredRoles = getRequiredRoles(req.path);
      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Insufficient permissions'
        });
      }

      next();
    } catch (jwtError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Authentication service error'
    });
  }
};

/**
 * Optional authentication middleware
 * Similar to authMiddleware but doesn't fail if no token provided
 */
export const optionalAuthMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    req.startTime = Date.now();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without authentication
    }

    const token = authHeader.substring(7);
    const secret = process.env.JWT_SECRET || 'your-secret-key';

    try {
      const decoded = jwt.verify(token, secret) as any;
      
      if (decoded.id && decoded.email && decoded.role && decoded.tenantId) {
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          tenantId: decoded.tenantId
        };
      }

      next();
    } catch (jwtError) {
      // Continue without authentication if token is invalid
      next();
    }
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
}; 