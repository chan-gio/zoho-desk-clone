import { PrismaClient, SLA as PrismaSLA, Prisma } from '../../prisma/generated/client/index.js';
import { SLA, CreateSLAInput, UpdateSLAInput, SLABreach } from '../models/sla.model.js';

export class SLARepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateSLAInput): Promise<PrismaSLA> {
    return this.prisma.sLA.create({
      data: {
        name: data.name,
        responseTime: data.responseTime,
        resolutionTime: data.resolutionTime,
        priorityId: data.priorityId || null,
        tenantId: data.tenantId,
        isActive: true,
        escalationRules: (data.escalationRules || []) as unknown as Prisma.InputJsonValue,
        ...(data.description !== undefined && { description: data.description }),
        ...(data.departmentId !== undefined && { departmentId: data.departmentId })
      },
      include: {
        priority: { select: { id: true, name: true, color: true } }
      }
    });
  }

  async findById(id: string, tenantId: string): Promise<PrismaSLA | null> {
    return this.prisma.sLA.findFirst({
      where: { id, tenantId },
      include: {
        priority: { select: { id: true, name: true, color: true } }
      }
    });
  }

  async findMany(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    priorityId?: string;
    departmentId?: string;
    isActive?: boolean;
  }): Promise<{ data: PrismaSLA[]; total: number }> {
    const { tenantId, page = 1, limit = 20, priorityId, departmentId, isActive } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.SLAWhereInput = { tenantId };
    if (priorityId) where.priorityId = priorityId;
    if (departmentId) where.departmentId = departmentId;
    if (isActive !== undefined) where.isActive = isActive;

    const [data, total] = await Promise.all([
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

    return { data, total };
  }

  async update(id: string, tenantId: string, data: UpdateSLAInput): Promise<PrismaSLA | null> {
    const sla = await this.prisma.sLA.findFirst({
      where: { id, tenantId }
    });

    if (!sla) return null;

    return this.prisma.sLA.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.responseTime !== undefined && { responseTime: data.responseTime }),
        ...(data.resolutionTime !== undefined && { resolutionTime: data.resolutionTime }),
        ...(data.priorityId !== undefined && { priorityId: data.priorityId }),
        ...(data.departmentId !== undefined && { departmentId: data.departmentId }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.escalationRules !== undefined && { escalationRules: data.escalationRules as unknown as Prisma.InputJsonValue })
      },
      include: {
        priority: { select: { id: true, name: true, color: true } }
      }
    });
  }

  async delete(id: string, tenantId: string): Promise<PrismaSLA | null> {
    const sla = await this.prisma.sLA.findFirst({
      where: { id, tenantId }
    });

    if (!sla) return null;

    return this.prisma.sLA.delete({
      where: { id }
    });
  }

  async findByTenant(tenantId: string): Promise<PrismaSLA[]> {
    return this.prisma.sLA.findMany({
      where: { tenantId, isActive: true },
      orderBy: { priority: { id: 'asc' } }
    });
  }

  async findByDepartment(departmentId: string, tenantId: string): Promise<PrismaSLA[]> {
    return this.prisma.sLA.findMany({
      where: {
        tenantId,
        isActive: true,
        OR: [
          { departmentId },
          { departmentId: null }
        ]
      },
      orderBy: { priority: { id: 'asc' } }
    });
  }

  async findByPriority(priorityId: string, tenantId: string): Promise<PrismaSLA[]> {
    return this.prisma.sLA.findMany({
      where: { priorityId, tenantId, isActive: true },
      orderBy: { createdAt: 'desc' },
      include: {
        priority: { select: { id: true, name: true, color: true } }
      }
    });
  }

  async getActiveSLAs(tenantId: string): Promise<PrismaSLA[]> {
    return this.prisma.sLA.findMany({
      where: { tenantId, isActive: true },
      orderBy: { priority: { id: 'asc' } }
    });
  }

  async getSLABreaches(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    slaId?: string;
    ticketId?: string;
    isResolved?: boolean;
  }): Promise<{ data: SLABreach[]; total: number }> {
    // In a real app, this would query from a SLABreach table
    // For now, return empty results
    return { data: [], total: 0 };
  }

  async createSLABreach(data: Omit<SLABreach, 'id' | 'createdAt' | 'updatedAt'>): Promise<SLABreach> {
    // In a real app, this would save to a SLABreach table
    const breach: SLABreach = {
      id: `breach_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return breach;
  }

  async updateSLABreach(id: string, data: Partial<SLABreach>): Promise<SLABreach | null> {
    // In a real app, this would update a SLABreach table
    return null;
  }

  async getSLABreachById(id: string, tenantId: string): Promise<SLABreach | null> {
    // In a real app, this would query from a SLABreach table
    return null;
  }

  async getSLABreachesByTicket(ticketId: string, tenantId: string): Promise<SLABreach[]> {
    // In a real app, this would query from a SLABreach table
    return [];
  }

  async getSLABreachesBySLA(slaId: string, tenantId: string): Promise<SLABreach[]> {
    // In a real app, this would query from a SLABreach table
    return [];
  }

  async getSLABreachStats(tenantId: string, dateFrom?: Date, dateTo?: Date): Promise<{
    totalBreaches: number;
    resolvedBreaches: number;
    unresolvedBreaches: number;
    breachesByType: Record<string, number>;
    breachesBySLA: Record<string, number>;
  }> {
    // In a real app, this would query from a SLABreach table
    return {
      totalBreaches: 0,
      resolvedBreaches: 0,
      unresolvedBreaches: 0,
      breachesByType: {},
      breachesBySLA: {}
    };
  }
}
