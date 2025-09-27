import { PrismaClient, Prisma } from '../../prisma/generated/client/index.js';

export class TenantRepository {
  constructor(private prisma: PrismaClient) {}

  private getPrisma() {
    return this.prisma;
  }

  async create(data: { name: string }) {
    const prisma = this.getPrisma();
    
    // Kiểm tra tenant đã tồn tại chưa
    const existingTenant = await this.findByName(data.name);
    if (existingTenant) {
      throw new Error(`Tenant with name "${data.name}" already exists`);
    }
    
    return prisma.tenant.create({
      data: {
        name: data.name
      }
    });
  }

  async findById(id: string) {
    const prisma = this.getPrisma();
    return prisma.tenant.findUnique({ 
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
          }
        },
        departments: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            users: true,
            tickets: true,
            departments: true,
            slas: true,
            workflows: true
          }
        }
      }
    });
  }

  async findByName(name: string) {
    const prisma = this.getPrisma();
    return prisma.tenant.findFirst({ 
      where: { 
        name: {
          equals: name,
          mode: 'insensitive'
        }
      } 
    });
  }

  async findMany(args?: {
    where?: Prisma.TenantWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.TenantOrderByWithRelationInput;
  }) {
    const prisma = this.getPrisma();
    return prisma.tenant.findMany({
      ...args,
      include: {
        _count: {
          select: {
            users: true,
            tickets: true,
            departments: true,
            slas: true,
            workflows: true
          }
        }
      }
    });
  }

  async update(id: string, data: { name?: string }) {
    const prisma = this.getPrisma();
    return prisma.tenant.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name })
      }
    });
  }

  async delete(id: string) {
    const prisma = this.getPrisma();
    return prisma.tenant.delete({
      where: { id }
    });
  }

  async count(args?: { where?: Prisma.TenantWhereInput }) {
    const prisma = this.getPrisma();
    return prisma.tenant.count(args);
  }

  async listAll() {
    const prisma = this.getPrisma();
    return prisma.tenant.findMany({
      include: {
        _count: {
          select: {
            users: true,
            tickets: true,
            departments: true,
            slas: true,
            workflows: true
          }
        }
      }
    });
  }

  async findAll() {
    const prisma = this.getPrisma();
    return prisma.tenant.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            users: true,
            tickets: true,
            departments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
