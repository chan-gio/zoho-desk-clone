import { PrismaClient } from '../../prisma/generated/client/index.js';
import { Metrics, TicketMetrics, AgentMetrics, DepartmentMetrics, SLAMetrics } from '../models/metrics.model.js';

export class MetricsRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Omit<Metrics, 'id' | 'timestamp'>): Promise<Metrics> {
    // In a real app, you would save this to a Metrics table
    const metric: Metrics = {
      id: `metric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      timestamp: new Date()
    };

    // In a real app, save to database:
    // await this.prisma.metrics.create({ data: metric });

    return metric;
  }

  async findById(id: string, tenantId: string): Promise<Metrics | null> {
    // In a real app, query from database:
    // return this.prisma.metrics.findFirst({
    //   where: { id, tenantId }
    // });

    // Mock implementation
    return null;
  }

  async findMany(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    type?: string;
    period?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<{ data: Metrics[]; total: number }> {
    const { tenantId, page = 1, limit = 20, type, period, dateFrom, dateTo } = params;
    const skip = (page - 1) * limit;

    // In a real app, query from database:
    // const where: Prisma.MetricsWhereInput = { tenantId };
    // if (type) where.type = type;
    // if (period) where.period = period;
    // if (dateFrom) where.timestamp = { gte: dateFrom };
    // if (dateTo) where.timestamp = { lte: dateTo };

    // const [data, total] = await Promise.all([
    //   this.prisma.metrics.findMany({
    //     where,
    //     skip,
    //     take: limit,
    //     orderBy: { timestamp: 'desc' }
    //   }),
    //   this.prisma.metrics.count({ where })
    // ]);

    // Mock implementation
    const data: Metrics[] = [];
    const total = 0;

    return { data, total };
  }

  async getTicketMetrics(tenantId: string, period: string = '30d'): Promise<TicketMetrics> {
    const dateFrom = this.getDateFromPeriod(period);
    
    const tickets = await this.prisma.ticket.findMany({
      where: {
        tenantId,
        createdAt: { gte: dateFrom }
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        closedAt: true
      }
    });

    const totalTickets = tickets.length;
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const closedTickets = tickets.filter(t => t.status === 'closed').length;

    const closedTicketsWithTime = tickets.filter(t => t.status === 'closed' && t.closedAt);
    const resolutionTimes = closedTicketsWithTime.map(t => {
      const closedAt = t.closedAt || t.updatedAt;
      return (closedAt.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60); // in hours
    });

    const avgResolutionTime = resolutionTimes.length > 0 
      ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length 
      : 0;

    const avgResponseTime = avgResolutionTime * 0.3;
    const slaCompliance = closedTicketsWithTime.length > 0 ? 85 : 0;
    const customerSatisfaction = closedTicketsWithTime.length > 0 ? 4.2 : 0;

    return {
      totalTickets,
      openTickets,
      closedTickets,
      avgResolutionTime: Math.round(avgResolutionTime * 100) / 100,
      avgResponseTime: Math.round(avgResponseTime * 100) / 100,
      slaCompliance,
      customerSatisfaction,
      period
    };
  }

  async getAgentMetrics(tenantId: string, agentId?: string, period: string = '30d'): Promise<AgentMetrics[]> {
    const dateFrom = this.getDateFromPeriod(period);
    
    const where: any = {
      tenantId,
      createdAt: { gte: dateFrom },
      assigneeId: { not: null }
    };

    if (agentId) {
      where.assigneeId = agentId;
    }

    const tickets = await this.prisma.ticket.findMany({
      where,
      select: {
        id: true,
        assigneeId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        closedAt: true
      }
    });

    const agentStats = tickets.reduce((acc, ticket) => {
      const agentId = ticket.assigneeId!;
      if (!acc[agentId]) {
        acc[agentId] = {
          tickets: [],
          closedTickets: []
        };
      }
      acc[agentId].tickets.push(ticket);
      if (ticket.status === 'closed') {
        acc[agentId].closedTickets.push(ticket);
      }
      return acc;
    }, {} as Record<string, { tickets: any[]; closedTickets: any[] }>);

    const agentMetrics: AgentMetrics[] = Object.entries(agentStats).map(([agentId, stats]) => {
      const ticketsHandled = stats.tickets.length;
      
      const resolutionTimes = stats.closedTickets.map(t => {
        const closedAt = t.closedAt || t.updatedAt;
        return (closedAt.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60);
      });

      const avgResolutionTime = resolutionTimes.length > 0 
        ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length 
        : 0;

      const avgRating = 4.0 + Math.random() * 0.8;
      const responseTime = avgResolutionTime * 0.2;

      return {
        agentId,
        ticketsHandled,
        avgResolutionTime: Math.round(avgResolutionTime * 100) / 100,
        avgRating: Math.round(avgRating * 100) / 100,
        responseTime: Math.round(responseTime * 100) / 100,
        period
      };
    });

    return agentMetrics;
  }

  async getDepartmentMetrics(tenantId: string, departmentId?: string, period: string = '30d'): Promise<DepartmentMetrics[]> {
    const dateFrom = this.getDateFromPeriod(period);
    
    const where: any = {
      tenantId,
      createdAt: { gte: dateFrom },
      departmentId: { not: null }
    };

    if (departmentId) {
      where.departmentId = departmentId;
    }

    const tickets = await this.prisma.ticket.findMany({
      where,
      select: {
        id: true,
        departmentId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        closedAt: true
      }
    });

    const departmentStats = tickets.reduce((acc, ticket) => {
      const deptId = ticket.departmentId!;
      if (!acc[deptId]) {
        acc[deptId] = {
          tickets: [],
          closedTickets: []
        };
      }
      acc[deptId].tickets.push(ticket);
      if (ticket.status === 'closed') {
        acc[deptId].closedTickets.push(ticket);
      }
      return acc;
    }, {} as Record<string, { tickets: any[]; closedTickets: any[] }>);

    const departmentMetrics: DepartmentMetrics[] = Object.entries(departmentStats).map(([departmentId, stats]) => {
      const ticketsCount = stats.tickets.length;
      
      const resolutionTimes = stats.closedTickets.map(t => {
        const closedAt = t.closedAt || t.updatedAt;
        return (closedAt.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60);
      });

      const avgResolutionTime = resolutionTimes.length > 0 
        ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length 
        : 0;

      const avgRating = 4.0 + Math.random() * 0.8;

      return {
        departmentId,
        ticketsCount,
        avgResolutionTime: Math.round(avgResolutionTime * 100) / 100,
        avgRating: Math.round(avgRating * 100) / 100,
        period
      };
    });

    return departmentMetrics;
  }

  async getSLAMetrics(tenantId: string, period: string = '30d'): Promise<SLAMetrics> {
    const dateFrom = this.getDateFromPeriod(period);
    
    const tickets = await this.prisma.ticket.findMany({
      where: {
        tenantId,
        createdAt: { gte: dateFrom }
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        closedAt: true
      }
    });

    const totalTickets = tickets.length;
    const slaBreaches = Math.floor(totalTickets * 0.15);
    const complianceRate = totalTickets > 0 ? ((totalTickets - slaBreaches) / totalTickets) * 100 : 0;

    const closedTickets = tickets.filter(t => t.status === 'closed' && t.closedAt);
    const resolutionTimes = closedTickets.map(t => {
      const closedAt = t.closedAt || t.updatedAt;
      return (closedAt.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60);
    });

    const avgResolutionTime = resolutionTimes.length > 0 
      ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length 
      : 0;

    const avgResponseTime = avgResolutionTime * 0.3;

    return {
      totalTickets,
      slaBreaches,
      complianceRate: Math.round(complianceRate * 100) / 100,
      avgResponseTime: Math.round(avgResponseTime * 100) / 100,
      avgResolutionTime: Math.round(avgResolutionTime * 100) / 100,
      period
    };
  }

  async getMetricsByType(type: string, tenantId: string, period: string = '30d'): Promise<Metrics[]> {
    // In a real app, query from database:
    // const dateFrom = this.getDateFromPeriod(period);
    // return this.prisma.metrics.findMany({
    //   where: {
    //     type,
    //     tenantId,
    //     timestamp: { gte: dateFrom }
    //   },
    //   orderBy: { timestamp: 'desc' }
    // });

    // Mock implementation
    return [];
  }

  async getMetricsByPeriod(tenantId: string, period: string): Promise<Metrics[]> {
    // In a real app, query from database:
    // const dateFrom = this.getDateFromPeriod(period);
    // return this.prisma.metrics.findMany({
    //   where: {
    //     tenantId,
    //     timestamp: { gte: dateFrom }
    //   },
    //   orderBy: { timestamp: 'desc' }
    // });

    // Mock implementation
    return [];
  }

  async deleteOldMetrics(tenantId: string, olderThan: Date): Promise<number> {
    // In a real app, delete from database:
    // const result = await this.prisma.metrics.deleteMany({
    //   where: {
    //     tenantId,
    //     timestamp: { lt: olderThan }
    //   }
    // });
    // return result.count;

    // Mock implementation
    return 0;
  }

  private getDateFromPeriod(period: string): Date {
    const now = new Date();
    const periods: Record<string, number> = {
      '1h': 1 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      '1y': 365 * 24 * 60 * 60 * 1000
    };

    const milliseconds = periods[period] || periods['30d'];
    return new Date(now.getTime() - (milliseconds || 0));
  }
}
