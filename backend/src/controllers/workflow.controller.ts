import { Request, Response, NextFunction } from 'express';
import { WorkflowService } from '../services/workflow.service.js';
import { getPrismaClient } from '../database/postgres.js';

function getWorkflowService() {
  return new WorkflowService(getPrismaClient());
}

export class WorkflowController {
  static async getWorkflows(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, search, isActive } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await getWorkflowService().listWorkflows({
        tenantId,
        page: Number(page),
        limit: Number(limit),
        ...(search && { search: search as string }),
        ...(isActive && { isActive: isActive === 'true' })
      });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getWorkflowById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const workflow = await getWorkflowService().getWorkflowById(id, tenantId);
      if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
      return res.json(workflow);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async createWorkflow(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const data = { ...req.body, tenantId };
      const workflow = await getWorkflowService().createWorkflow(data);
      return res.status(201).json(workflow);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateWorkflow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      
      const workflow = await getWorkflowService().updateWorkflow(id, req.body);
      if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
      return res.json(workflow);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteWorkflow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const deleted = await getWorkflowService().deleteWorkflow(id);
      if (!deleted) return res.status(404).json({ message: 'Workflow not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }

  static async executeWorkflow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const { ticketId, data } = req.body;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await getWorkflowService().executeWorkflow(id, { ticketId, data, tenantId });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }
}
