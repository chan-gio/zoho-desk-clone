import { Request, Response, NextFunction } from 'express';
import { WorkflowService } from '../services/workflow.service';

export class WorkflowController {
  constructor(private workflowService: WorkflowService) {}

  getWorkflows = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const result = await this.workflowService.listWorkflows({
        tenantId,
        page: Number(page),
        limit: Number(limit),
      });
      res.json(result);
    } catch (err) { next(err); }
  };

  getWorkflowById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const workflow = await this.workflowService.getWorkflowById(id, tenantId);
      if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
      res.json(workflow);
    } catch (err) { next(err); }
  };

  createWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const data = { ...req.body, tenantId };
      const workflow = await this.workflowService.createWorkflow(data);
      res.status(201).json(workflow);
    } catch (err) { next(err); }
  };

  updateWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const workflow = await this.workflowService.updateWorkflow(id, req.body);
      res.json(workflow);
    } catch (err) { next(err); }
  };

  deleteWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.workflowService.deleteWorkflow(id);
      res.status(204).send();
    } catch (err) { next(err); }
  };
} 