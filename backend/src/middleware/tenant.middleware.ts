import { Request, Response, NextFunction } from 'express';

export const tenantGuard = (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const user = (req as any).user;

  // Check if user has tenantId from JWT (new multi-tenant flow)
  if (user?.tenantId) {
    req.headers['x-tenant-id'] = user.tenantId;
    return next();
  }

  // Fallback to header-based tenant (legacy flow)
  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant context required. Please select a tenant first.' });
  }

  return next();
};
