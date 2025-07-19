import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';

const reportService = new ReportService();

export const getTicketCount = async (req: Request, res: Response) => {
  const tenantId = (req as any).user?.tenantId;
  const count = await reportService.getTicketCount(tenantId);
  res.json({ count });
};

export const getAvgSLAResponseTime = async (req: Request, res: Response) => {
  const tenantId = (req as any).user?.tenantId;
  const avg = await reportService.getAvgSLAResponseTime(tenantId);
  res.json({ avg });
};

export const getAgentPerformance = async (req: Request, res: Response) => {
  const tenantId = (req as any).user?.tenantId;
  const data = await reportService.getAgentPerformance(tenantId);
  res.json({ data });
}; 