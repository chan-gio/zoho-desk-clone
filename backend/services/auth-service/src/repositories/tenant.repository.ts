import { PrismaClient } from '@prisma/client';

export class TenantRepository {
  constructor(private prisma: PrismaClient) {}

  async createTenant(name: string) {
    return this.prisma.tenant.create({
      data: { name },
    });
  }

  async findById(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.prisma.tenant.findFirst({ where: { name } });
  }

  async listAll() {
    return this.prisma.tenant.findMany();
  }
}
