import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service.js';

const analyticsService = new AnalyticsService();

export class AnalyticsController {
  static async getTicketStats(req: Request, res: Response) {
    try {
      const { date_from, date_to, department_id } = req.query;
      const tenantId = (req as any).user?.tenantId;
      
      const stats = await analyticsService.getTicketStats({
        tenantId,
        dateFrom: date_from as string,
        dateTo: date_to as string,
        departmentId: department_id as string
      });
      
      return res.json(stats);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ error: 'Failed to fetch ticket stats', details: error.message });
    }
  }

  static async getSLACompliance(req: Request, res: Response) {
    try {
      const tenantId = (req as any).user?.tenantId;
      
      const compliance = await analyticsService.getSLACompliance(tenantId);
      
      return res.json(compliance);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ error: 'Failed to fetch SLA compliance', details: error.message });
    }
  }

  static async getAgentPerformance(req: Request, res: Response) {
    try {
      const { agent_id, date_from, date_to } = req.query;
      const tenantId = (req as any).user?.tenantId;
      
      const performance = await analyticsService.getAgentPerformance({
        tenantId,
        agentId: agent_id as string,
        dateFrom: date_from as string,
        dateTo: date_to as string
      });
      
      return res.json(performance);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ error: 'Failed to fetch agent performance', details: error.message });
    }
  }

  static async exportAnalyticsReport(req: Request, res: Response) {
    try {
      const { type, filters, report } = req.body;
      const tenantId = (req as any).user?.tenantId;
      
      const exportData = await analyticsService.exportReport({
        tenantId,
        type,
        filters,
        report
      });
      
      if (type === 'csv') {
        res.header('Content-Type', 'text/csv');
        res.attachment(`${exportData.filename}.csv`);
        return res.send(exportData.data);
      } else {
        res.header('Content-Type', 'application/json');
        res.attachment(`${exportData.filename}.json`);
        return res.send(JSON.stringify(exportData.data, null, 2));
      }
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ error: 'Failed to export analytics report', details: error.message });
    }
  }
}