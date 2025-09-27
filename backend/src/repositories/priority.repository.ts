import { PrismaClient } from '../../prisma/generated/client/index.js';

export class PriorityRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    name: string;
    color: string;
    tenantId: string;
    isDefault?: boolean;
    order?: number;
  }) {
    return this.prisma.priority.create({
      data: {
        ...data,
        order: data.order || 0
      }
    });
  }

  async findById(id: string) {
    return this.prisma.priority.findUnique({
      where: { id }
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.priority.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' }
    });
  }

  async update(id: string, data: {
    name?: string;
    color?: string;
    order?: number;
  }) {
    return this.prisma.priority.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return this.prisma.priority.delete({
      where: { id }
    });
  }
}
