import { PrismaClient, Workflow as PrismaWorkflow } from '../../../../shared/prisma/generated/client';
import { Workflow } from '../models/workflow.model';

export class WorkflowRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>): Promise<PrismaWorkflow> {
    return this.prisma.workflow.create({ data });
  }

  async findById(id: string, tenantId: string): Promise<PrismaWorkflow | null> {
    return this.prisma.workflow.findFirst({ where: { id, tenantId } });
  }

  async findMany(params: { tenantId: string; page?: number; limit?: number }): Promise<{ data: PrismaWorkflow[]; total: number }> {
    const { tenantId, page = 1, limit = 20 } = params;
    const where = { tenantId };
    const [data, total] = await Promise.all([
      this.prisma.workflow.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.workflow.count({ where }),
    ]);
    return { data, total };
  }

  async update(id: string, _tenantId: string, data: Partial<Workflow>): Promise<PrismaWorkflow | null> {
    return this.prisma.workflow.update({ where: { id }, data });
  }

  async delete(id: string, _tenantId: string): Promise<PrismaWorkflow | null> {
    return this.prisma.workflow.delete({ where: { id } });
  }
} 