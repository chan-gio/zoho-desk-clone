import { Request, Response } from 'express';
import axios from 'axios';
import { Parser as Json2csvParser } from 'json2csv';

const TICKETING_SERVICE_URL = process.env.TICKETING_SERVICE_URL || 'http://localhost:3001';

// GET /analytics/tickets
export const getTicketStats = async (req: Request, res: Response) => {
  const { date_from, date_to, department_id } = req.query;
  try {
    const tenantId = (req as any).user?.tenantId;
    const authHeader = req.headers['authorization'];
    const { data } = await axios.get(`${TICKETING_SERVICE_URL}/tickets`, {
      params: {
        date_from,
        date_to,
        department_id,
        tenantId,
        limit: 10000
      },
      headers: { Authorization: authHeader }
    });
    const tickets = data.data || data;
    const volume = tickets.length;
    const resolutionTimes = tickets
      .filter((t: any) => t.closedAt && t.createdAt)
      .map((t: any) => new Date(t.closedAt).getTime() - new Date(t.createdAt).getTime());
    const avgResolutionTime = resolutionTimes.length
      ? Math.round(resolutionTimes.reduce((a: number, b: number) => a + b, 0) / resolutionTimes.length / 1000)
      : null;
    res.json({ volume, avgResolutionTime });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: 'Failed to fetch ticket stats', details: error.message });
  }
};

// GET /analytics/sla-compliance
export const getSLACompliance = async (req: Request, res: Response) => {
  try {
    const tenantId = (req as any).user?.tenantId;
    const authHeader = req.headers['authorization'];
    const { data: ticketsData } = await axios.get(`${TICKETING_SERVICE_URL}/tickets`, {
      params: { tenantId, limit: 10000 },
      headers: { Authorization: authHeader }
    });
    const tickets = ticketsData.data || ticketsData;
    const breaches = tickets.filter((t: any) => t.closedAt && t.createdAt && (new Date(t.closedAt).getTime() - new Date(t.createdAt).getTime()) > 86400000);
    const responseTimes = tickets
      .filter((t: any) => t.closedAt && t.createdAt)
      .map((t: any) => new Date(t.closedAt).getTime() - new Date(t.createdAt).getTime());
    const responseTimeAvg = responseTimes.length
      ? Math.round(responseTimes.reduce((a: number, b: number) => a + b, 0) / responseTimes.length / 1000)
      : null;
    res.json({ responseTimeAvg, breachCount: breaches.length, chartData: [] });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: 'Failed to fetch SLA compliance', details: error.message });
  }
};

// GET /analytics/agent-performance
export const getAgentPerformance = async (req: Request, res: Response) => {
  const { agent_id, date_from, date_to } = req.query;
  try {
    const tenantId = (req as any).user?.tenantId;
    const authHeader = req.headers['authorization'];
    const { data } = await axios.get(`${TICKETING_SERVICE_URL}/tickets`, {
      params: {
        assigneeId: agent_id,
        date_from,
        date_to,
        tenantId,
        limit: 10000
      },
      headers: { Authorization: authHeader }
    });
    const tickets = data.data || data;
    const ticketsHandled = tickets.length;
    const ratings = tickets.map((t: any) => t.rating).filter((r: any) => typeof r === 'number');
    const avgRating = ratings.length ? (ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) : null;
    const resolutionTimes = tickets
      .filter((t: any) => t.closedAt && t.createdAt)
      .map((t: any) => new Date(t.closedAt).getTime() - new Date(t.createdAt).getTime());
    const avgResolutionTime = resolutionTimes.length
      ? Math.round(resolutionTimes.reduce((a: number, b: number) => a + b, 0) / resolutionTimes.length / 1000)
      : null;
    res.json({ ticketsHandled, avgRating, avgResolutionTime });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: 'Failed to fetch agent performance', details: error.message });
  }
};

// POST /analytics/export
export const exportAnalyticsReport = async (req: Request, res: Response) => {
  const { type, filters, report } = req.body;
  try {
    const authHeader = req.headers['authorization'];
    let data: any = [];
    let filename = 'report';
    if (report === 'tickets') {
      const { data: ticketStats } = await axios.get(`${req.protocol}://${req.get('host')}/analytics/tickets`, {
        params: filters,
        headers: { Authorization: authHeader }
      });
      data = [ticketStats];
      filename = 'ticket_stats';
    } else if (report === 'sla-compliance') {
      const { data: slaData } = await axios.get(`${req.protocol}://${req.get('host')}/analytics/sla-compliance`, {
        params: filters,
        headers: { Authorization: authHeader }
      });
      data = [slaData];
      filename = 'sla_compliance';
    } else if (report === 'agent-performance') {
      const { data: agentData } = await axios.get(`${req.protocol}://${req.get('host')}/analytics/agent-performance`, {
        params: filters,
        headers: { Authorization: authHeader }
      });
      data = [agentData];
      filename = 'agent_performance';
    } else {
      return res.status(400).json({ error: 'Invalid report type' });
    }

    if (type === 'csv') {
      const json2csv = new Json2csvParser();
      const csv = json2csv.parse(data);
      res.header('Content-Type', 'text/csv');
      res.attachment(`${filename}.csv`);
      return res.send(csv);
    } else {
      res.header('Content-Type', 'application/json');
      res.attachment(`${filename}.json`);
      return res.send(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: 'Failed to export analytics report', details: error.message });
  }
}; 