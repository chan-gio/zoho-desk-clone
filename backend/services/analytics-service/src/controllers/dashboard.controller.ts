import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';

const dashboardService = new DashboardService();

export const getTicketTrends = async (req: Request, res: Response) => {
  const tenantId = (req as any).user?.tenantId;
  const data = await dashboardService.getTicketTrends(tenantId);
  res.json({ data });
};

export const getSLACompliance = async (req: Request, res: Response) => {
  const tenantId = (req as any).user?.tenantId;
  const data = await dashboardService.getSLACompliance(tenantId);
  res.json({ data });
};

export const getAgentStats = async (req: Request, res: Response) => {
  const tenantId = (req as any).user?.tenantId;
  const data = await dashboardService.getAgentStats(tenantId);
  res.json({ data });
}; 