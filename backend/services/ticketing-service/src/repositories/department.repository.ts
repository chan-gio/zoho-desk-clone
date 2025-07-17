import { PrismaClient, Department as PrismaDepartment } from '../../../../shared/prisma/generated/client';
import { Department } from '../models/department.model';

export class DepartmentRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: { name: string; tenantId: string }): Promise<PrismaDepartment> {
    if (!data.tenantId) {
      throw new Error('Missing tenantId when creating department');
    }
    // Only pass primitive fields to Prisma
    return this.prisma.department.create({
      data: {
        name: data.name,
        tenantId: data.tenantId,
      },
    });
  }

  async findById(id: string, tenantId: string): Promise<PrismaDepartment | null> {
    return this.prisma.department.findFirst({ where: { id, tenantId } });
  }

  async findMany(params: { tenantId: string; page?: number; limit?: number }): Promise<{ data: PrismaDepartment[]; total: number }> {
    const { tenantId, page = 1, limit = 20 } = params;
    const where = { tenantId };
    const [data, total] = await Promise.all([
      this.prisma.department.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.department.count({ where }),
    ]);
    return { data, total };
  }

  async update(id: string, tenantId: string, data: Partial<Department>): Promise<PrismaDepartment | null> {
    // Ensure only update if department belongs to tenant
    const department = await this.prisma.department.findFirst({ where: { id, tenantId } });
    if (!department) throw new Error('Department not found or not owned by tenant');
    return this.prisma.department.update({ where: { id }, data });
  }

  async delete(id: string, _tenantId: string): Promise<PrismaDepartment | null> {
    return this.prisma.department.delete({ where: { id } });
  }
} 