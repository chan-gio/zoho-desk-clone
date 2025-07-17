import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';

export function tenantGuard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || !req.user.tenantId) {
    return res.status(400).json({ message: 'Missing tenant information' });
  }
  if (!req.body) req.body = {};
  if (!req.query) req.query = {};
  req.body.tenantId = req.user.tenantId;
  req.query.tenantId = req.user.tenantId;
  next();
}
