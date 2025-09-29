import { getPrismaClient } from '../database/postgres.js';
import { SLA, CreateSLAInput, UpdateSLAInput, SLABreach, SLAFilter } from '../models/sla.model.js';
import { NotificationService } from './notification.service.js';
import { Prisma } from '../../prisma/generated/client/index.js';

export class SLAService {
  private get prisma() {
    return getPrismaClient();
  }
  private notificationService = new NotificationService();

  async createSLA(data: CreateSLAInput): Promise<SLA> {
    const sla = await this.prisma.sLA.create({
      data: {
        name: data.name,
        ...(data.description && { description: data.description }),
        responseTime: data.responseTime,
        ...(data.resolutionTime && { resolutionTime: data.resolutionTime }),
        ...(data.priorityId && { priorityId: data.priorityId }),
        ...(data.departmentId && { departmentId: data.departmentId }),
        tenantId: data.tenantId,
        isActive: true,
        escalationRules: data.escalationRules as unknown as Prisma.InputJsonValue
      },
      include: {
        priority: { select: { id: true, name: true, color: true } }
      }
    });

    return {
      id: sla.id,
      name: sla.name,
      ...(sla.description && { description: sla.description }),
      responseTime: sla.responseTime,
      resolutionTime: sla.resolutionTime,
      priority: sla.priority || undefined,
      priorityId: sla.priorityId || undefined,
      ...(sla.departmentId && { departmentId: sla.departmentId }),
      tenantId: sla.tenantId,
      isActive: sla.isActive,
      escalationRules: sla.escalationRules as any[],
      createdAt: sla.createdAt,
      updatedAt: sla.updatedAt
    };
  }

  async getSLAById(id: string, tenantId: string): Promise<SLA | null> {
    const sla = await this.prisma.sLA.findFirst({
      where: { id, tenantId },
      include: {
        priority: { select: { id: true, name: true, color: true } }
      }
    });

    if (!sla) return null;

    return {
      id: sla.id,
      name: sla.name,
      ...(sla.description && { description: sla.description }),
      responseTime: sla.responseTime,
      resolutionTime: sla.resolutionTime,
      priority: sla.priority || undefined,
      priorityId: sla.priorityId || undefined,
      ...(sla.departmentId && { departmentId: sla.departmentId }),
      tenantId: sla.tenantId,
      isActive: sla.isActive,
      escalationRules: sla.escalationRules as any[],
      createdAt: sla.createdAt,
      updatedAt: sla.updatedAt
    };
  }

  async listSLAs(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    priorityId?: string;
    departmentId?: string;
    isActive?: boolean;
  }): Promise<{ slas: SLA[]; total: number; page: number; limit: number }> {
    const { tenantId, page = 1, limit = 20, priorityId, departmentId, isActive } = params;
    const skip = (page - 1) * limit;

    const where: any = { tenantId };
    if (priorityId) where.priorityId = priorityId;
    if (departmentId) where.departmentId = departmentId;
    if (isActive !== undefined) where.isActive = isActive;

    const [slas, total] = await Promise.all([
      this.prisma.sLA.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          priority: { select: { id: true, name: true, color: true } }
        }
      }),
      this.prisma.sLA.count({ where })
    ]);

    return {
      slas: slas.map(sla => ({
        id: sla.id,
        name: sla.name,
        ...(sla.description && { description: sla.description }),
        responseTime: sla.responseTime,
        resolutionTime: sla.resolutionTime,
        priority: sla.priority || undefined,
        priorityId: sla.priorityId || undefined,
        ...(sla.departmentId && { departmentId: sla.departmentId }),
        tenantId: sla.tenantId,
        isActive: sla.isActive,
        escalationRules: sla.escalationRules as any[],
        createdAt: sla.createdAt,
        updatedAt: sla.updatedAt
      })),
      total,
      page,
      limit
    };
  }

  async updateSLA(id: string, tenantId: string, data: UpdateSLAInput): Promise<SLA | null> {
    const sla = await this.prisma.sLA.findFirst({
      where: { id, tenantId }
    });

    if (!sla) return null;

    const updatedSLA = await this.prisma.sLA.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.responseTime && { responseTime: data.responseTime }),
        ...(data.resolutionTime && { resolutionTime: data.resolutionTime }),
        ...(data.priorityId && { priorityId: data.priorityId }),
        ...(data.departmentId && { departmentId: data.departmentId }),
        ...(data.isActive && { isActive: data.isActive }),
        escalationRules: data.escalationRules as unknown as Prisma.InputJsonValue
      },
      include: {
        priority: { select: { id: true, name: true, color: true } }
      }
    });

    return {
      id: updatedSLA.id,
      name: updatedSLA.name,
      ...(updatedSLA.description && { description: updatedSLA.description }),
      responseTime: updatedSLA.responseTime,
      resolutionTime: updatedSLA.resolutionTime,
      priority: updatedSLA.priority || undefined,
      priorityId: updatedSLA.priorityId || undefined,
      ...(updatedSLA.departmentId && { departmentId: updatedSLA.departmentId }),
      tenantId: updatedSLA.tenantId,
      isActive: updatedSLA.isActive,
      escalationRules: updatedSLA.escalationRules as any[],
      createdAt: updatedSLA.createdAt,
      updatedAt: updatedSLA.updatedAt
    };
  }

  async deleteSLA(id: string, tenantId: string): Promise<boolean> {
    const sla = await this.prisma.sLA.findFirst({
      where: { id, tenantId }
    });

    if (!sla) return false;

    await this.prisma.sLA.delete({
      where: { id }
    });

    return true;
  }

  async monitorSLA(ticketId: string): Promise<void> {
    const ticket = await this.prisma.ticket.findUnique({ 
      where: { id: ticketId },
      include: { tenant: true }
    });
    
    if (!ticket) return;

    const sla = await this.prisma.sLA.findFirst({ 
      where: { 
        tenantId: ticket.tenantId,
        isActive: true,
        OR: [
          { departmentId: ticket.departmentId },
          { departmentId: null }
        ]
      }
    });

    if (!sla) return;

    const now = new Date();
    const responseDeadline = new Date(ticket.createdAt);
    responseDeadline.setHours(responseDeadline.getHours() + sla.responseTime);

    const resolutionDeadline = new Date(ticket.createdAt);
    resolutionDeadline.setHours(resolutionDeadline.getHours() + sla.resolutionTime);

    // Check for response time breach
    if (now > responseDeadline && ticket.status === 'open') {
      await this.createSLABreach({
        ticketId,
        slaId: sla.id,
        breachType: 'response',
        expectedTime: responseDeadline,
        actualTime: now,
        breachDuration: Math.floor((now.getTime() - responseDeadline.getTime()) / (1000 * 60)),
        isResolved: false,
        tenantId: ticket.tenantId
      });
    }

    // Check for resolution time breach
    if (now > resolutionDeadline && ticket.status !== 'closed') {
      await this.createSLABreach({
        ticketId,
        slaId: sla.id,
        breachType: 'resolution',
        expectedTime: resolutionDeadline,
        actualTime: now,
        breachDuration: Math.floor((now.getTime() - resolutionDeadline.getTime()) / (1000 * 60)),
        isResolved: false,
        tenantId: ticket.tenantId
      });
    }
  }

  async createSLABreach(breachData: Omit<SLABreach, 'id' | 'createdAt' | 'updatedAt'>): Promise<SLABreach> {
    // In a real app, you would save this to a SLABreach table
    const breach: SLABreach = {
      id: `breach_${Date.now()}`,
      ...breachData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Send notification
    await this.notificationService.notifySlaBreached(breachData);

    return breach;
  }

  async getSLABreaches(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    slaId?: string;
    ticketId?: string;
    isResolved?: boolean;
  }): Promise<{ breaches: SLABreach[]; total: number; page: number; limit: number }> {
    // In a real app, query from SLABreach table
    return {
      breaches: [],
      total: 0,
      page: params.page || 1,
      limit: params.limit || 20
    };
  }

  async checkSLACompliance(ticketId: string, tenantId: string): Promise<{
    isCompliant: boolean;
    responseTimeRemaining?: number;
    resolutionTimeRemaining?: number;
    breaches: SLABreach[];
  }> {
    const ticket = await this.prisma.ticket.findUnique({ 
      where: { id: ticketId, tenantId }
    });
    
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const sla = await this.prisma.sLA.findFirst({ 
      where: { 
        tenantId: ticket.tenantId,
        isActive: true,
        OR: [
          { departmentId: ticket.departmentId },
          { departmentId: null }
        ]
      }
    });

    if (!sla) {
      return { isCompliant: true, breaches: [] };
    }

    const now = new Date();
    const responseDeadline = new Date(ticket.createdAt);
    responseDeadline.setHours(responseDeadline.getHours() + sla.responseTime);

    const resolutionDeadline = new Date(ticket.createdAt);
    resolutionDeadline.setHours(resolutionDeadline.getHours() + sla.resolutionTime);

    const responseTimeRemaining = Math.max(0, responseDeadline.getTime() - now.getTime());
    const resolutionTimeRemaining = Math.max(0, resolutionDeadline.getTime() - now.getTime());

    const isCompliant = responseTimeRemaining > 0 && resolutionTimeRemaining > 0;

    return {
      isCompliant,
      responseTimeRemaining: Math.floor(responseTimeRemaining / (1000 * 60)), // in minutes
      resolutionTimeRemaining: Math.floor(resolutionTimeRemaining / (1000 * 60)), // in minutes
      breaches: [] // In a real app, get actual breaches
    };
  }

  async monitorAllOpenTickets(): Promise<void> {
    const openTickets = await this.prisma.ticket.findMany({ 
      where: { status: { not: 'closed' } } 
    });
    
    for (const ticket of openTickets) {
      await this.monitorSLA(ticket.id);
    }
  }
}
