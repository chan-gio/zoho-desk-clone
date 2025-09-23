import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../services/audit.service.js';

const auditService = new AuditService();

export class AuditController {
  static async getAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        page = 1, 
        limit = 20, 
        action, 
        resource, 
        userId, 
        resourceId,
        dateFrom,
        dateTo
      } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await auditService.getAuditLogs({
        tenantId,
        page: Number(page),
        limit: Number(limit),
        ...(action && { action: action as string }),
        ...(resource && { resource: resource as string }),
        ...(userId && { userId: userId as string }),
        ...(resourceId && { resourceId: resourceId as string }),
        ...(dateFrom && { dateFrom: new Date(dateFrom as string) }),
        ...(dateTo && { dateTo: new Date(dateTo as string) })
      });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getAuditLogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const auditLog = await auditService.getAuditLogById(id, tenantId);
      if (!auditLog) return res.status(404).json({ message: 'Audit log not found' });
      return res.json(auditLog);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getAuditSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const { period = '30d', dateFrom, dateTo } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const summary = await auditService.getAuditSummary({
        tenantId,
        period: period as string,
        ...(dateFrom && { dateFrom: new Date(dateFrom as string) }),
        ...(dateTo && { dateTo: new Date(dateTo as string) })
      });
      return res.json(summary);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getAuditLogsByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).json({ message: 'Missing userId parameter' });
      const { page = 1, limit = 20, action, resource, dateFrom, dateTo } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await auditService.getAuditLogsByUser({
        userId,
        tenantId,
        page: Number(page),
        limit: Number(limit),
        ...(action && { action: action as string }),
        ...(resource && { resource: resource as string }),
        ...(dateFrom && { dateFrom: new Date(dateFrom as string) }),
        ...(dateTo && { dateTo: new Date(dateTo as string) })
      });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getAuditLogsByResource(req: Request, res: Response, next: NextFunction) {
    try {
      const { resource, resourceId } = req.params;
      if (!resource) return res.status(400).json({ message: 'Missing resource parameter' });
      if (!resourceId) return res.status(400).json({ message: 'Missing resourceId parameter' });
      const { page = 1, limit = 20, action, dateFrom, dateTo } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await auditService.getAuditLogsByResource({
        resource,
        resourceId,
        tenantId,
        page: Number(page),
        limit: Number(limit),
        ...(action && { action: action as string }),
        ...(dateFrom && { dateFrom: new Date(dateFrom as string) }),
        ...(dateTo && { dateTo: new Date(dateTo as string) })
      });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async exportAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        format = 'csv',
        action, 
        resource, 
        userId, 
        resourceId,
        dateFrom,
        dateTo
      } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await auditService.exportAuditLogs({
        tenantId,
        format: format as string,
        ...(action && { action: action as string }),
        ...(resource && { resource: resource as string }),
        ...(userId && { userId: userId as string }),
        ...(resourceId && { resourceId: resourceId as string }),
        ...(dateFrom && { dateFrom: new Date(dateFrom as string) }),
        ...(dateTo && { dateTo: new Date(dateTo as string) })
      });
      
      if (format === 'csv') {
        res.header('Content-Type', 'text/csv');
        res.attachment('audit_logs.csv');
        res.send(result.data);
        return;
      } else {
        res.header('Content-Type', 'application/json');
        res.attachment('audit_logs.json');
        res.send(JSON.stringify(result.data, null, 2));
        return;
      }
    } catch (err) {
      next(err);
      return;
    }
  }
}
