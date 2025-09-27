import { PrismaClient } from '../../prisma/generated/client/index.js';

export class StatusRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    name: string;
    color: string;
    tenantId: string;
    isDefault?: boolean;
    order?: number;
  }) {
    return this.prisma.status.create({
      data: {
        ...data,
        order: data.order || 0
      }
    });
  }

  async findById(id: string) {
    return this.prisma.status.findUnique({
      where: { id }
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.status.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' }
    });
  }

  async update(id: string, data: {
    name?: string;
    color?: string;
    order?: number;
  }) {
    return this.prisma.status.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return this.prisma.status.delete({
      where: { id }
    });
  }
}
