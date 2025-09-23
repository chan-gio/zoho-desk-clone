import { Request, Response, NextFunction } from 'express';

export const tenantGuard = (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const user = (req as any).user;

  if (!tenantId && !user?.tenantId) {
    return res.status(400).json({ error: 'Tenant context required' });
  }

  // Set tenantId from user if not provided in headers
  if (!tenantId && user?.tenantId) {
    req.headers['x-tenant-id'] = user.tenantId;
  }

  return next();
};
