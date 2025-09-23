import { Request, Response, NextFunction } from 'express';
import { SLAService } from '../services/sla.service.js';
import { TicketPriority } from '../models/ticket.model.js';

const slaService = new SLAService();

export class SLAController {
  static async getSLAs(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, priority, departmentId, isActive } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await slaService.listSLAs({
        tenantId,
        page: Number(page),
        limit: Number(limit),
        ...(priority && { priority: priority as TicketPriority }),
        ...(departmentId && { departmentId: departmentId as string }),
        ...(isActive && { isActive: isActive === 'true' })
      });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getSLAById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const sla = await slaService.getSLAById(id, tenantId);
      if (!sla) return res.status(404).json({ message: 'SLA not found' });
      return res.json(sla);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async createSLA(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const data = { ...req.body, tenantId };
      const sla = await slaService.createSLA(data);
      return res.status(201).json(sla);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateSLA(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const sla = await slaService.updateSLA(id, tenantId, req.body);
      if (!sla) return res.status(404).json({ message: 'SLA not found' });
      return res.json(sla);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteSLA(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const deleted = await slaService.deleteSLA(id, tenantId);
      if (!deleted) return res.status(404).json({ message: 'SLA not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getSLABreaches(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, slaId, ticketId, isResolved } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await slaService.getSLABreaches({
        tenantId,
        page: Number(page),
        limit: Number(limit),
        ...(slaId && { slaId: slaId as string }),
        ...(ticketId && { ticketId: ticketId as string }),
        ...(isResolved && { isResolved: isResolved === 'true' })
      });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async checkSLACompliance(req: Request, res: Response, next: NextFunction) {
    try {
      const { ticketId } = req.params;
      if (!ticketId) return res.status(400).json({ message: 'Missing ticketId parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const compliance = await slaService.checkSLACompliance(ticketId, tenantId);
      return res.json(compliance);
    } catch (err) {
      next(err);
      return;
    }
  }
}
