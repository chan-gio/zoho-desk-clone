import { getPrismaClient } from '../database/postgres.js';
import { Parser as Json2csvParser } from 'json2csv';

export class AnalyticsService {
  private get prisma() {
    return getPrismaClient();
  }

  async getTicketStats({ tenantId, dateFrom, dateTo, departmentId }: {
    tenantId: string;
    dateFrom?: string;
    dateTo?: string;
    departmentId?: string;
  }) {
    const where: any = { tenantId };
    
    if (dateFrom && dateTo) {
      where.createdAt = {
        gte: new Date(dateFrom),
        lte: new Date(dateTo)
      };
    }
    
    if (departmentId) {
      where.departmentId = departmentId;
    }

    const tickets = await this.prisma.ticket.findMany({
      where,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        closedAt: true
      }
    });

    const volume = tickets.length;
    const resolutionTimes = tickets
      .filter(t => t.status === 'closed' && t.createdAt)
      .map(t => {
        const closedAt = t.closedAt || t.updatedAt;
        return new Date(closedAt).getTime() - new Date(t.createdAt).getTime();
      });

    const avgResolutionTime = resolutionTimes.length
      ? Math.round(resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length / 1000)
      : null;

    return { volume, avgResolutionTime };
  }

  async getSLACompliance(tenantId: string) {
    const tickets = await this.prisma.ticket.findMany({
      where: { tenantId },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        closedAt: true
      }
    });

    const breaches = tickets.filter(t => {
      if (t.status !== 'closed' || !t.createdAt) return false;
      const closedAt = t.closedAt || t.updatedAt;
      const resolutionTime = new Date(closedAt).getTime() - new Date(t.createdAt).getTime();
      return resolutionTime > 86400000; // 24 hours in milliseconds
    });

    const responseTimes = tickets
      .filter(t => t.status === 'closed' && t.createdAt)
      .map(t => {
        const closedAt = t.closedAt || t.updatedAt;
        return new Date(closedAt).getTime() - new Date(t.createdAt).getTime();
      });

    const responseTimeAvg = responseTimes.length
      ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length / 1000)
      : null;

    return { 
      responseTimeAvg, 
      breachCount: breaches.length, 
      chartData: [] 
    };
  }

  async getAgentPerformance({ tenantId, agentId, dateFrom, dateTo }: {
    tenantId: string;
    agentId?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const where: any = { tenantId };
    
    if (agentId) {
      where.assigneeId = agentId;
    }
    
    if (dateFrom && dateTo) {
      where.createdAt = {
        gte: new Date(dateFrom),
        lte: new Date(dateTo)
      };
    }

    const tickets = await this.prisma.ticket.findMany({
      where,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        closedAt: true,
        assigneeId: true
      }
    });

    const ticketsHandled = tickets.length;
    
    // Mock ratings (in real app, this would come from a ratings table)
    const ratings = tickets.map(() => Math.floor(Math.random() * 5) + 1);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;
    
    const resolutionTimes = tickets
      .filter(t => t.status === 'closed' && t.createdAt)
      .map(t => {
        const closedAt = t.closedAt || t.updatedAt;
        return new Date(closedAt).getTime() - new Date(t.createdAt).getTime();
      });

    const avgResolutionTime = resolutionTimes.length
      ? Math.round(resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length / 1000)
      : null;

    return { ticketsHandled, avgRating, avgResolutionTime };
  }

  async exportReport({ tenantId, type, filters, report }: {
    tenantId: string;
    type: string;
    filters: any;
    report: string;
  }) {
    let data: any = [];
    let filename = 'report';

    switch (report) {
      case 'tickets':
        data = [await this.getTicketStats({ tenantId, ...filters })];
        filename = 'ticket_stats';
        break;
      case 'sla-compliance':
        data = [await this.getSLACompliance(tenantId)];
        filename = 'sla_compliance';
        break;
      case 'agent-performance':
        data = [await this.getAgentPerformance({ tenantId, ...filters })];
        filename = 'agent_performance';
        break;
      default:
        throw new Error('Invalid report type');
    }

    if (type === 'csv') {
      const json2csv = new Json2csvParser();
      const csv = json2csv.parse(data);
      return { data: csv, filename };
    } else {
      return { data, filename };
    }
  }
}