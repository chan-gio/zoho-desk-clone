import { TenantRepository } from '../repositories/tenant.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { getPrismaClient } from '../database/postgres.js';
import { PrismaClient } from 'prisma/generated/client/index.js';

export interface CreateTenantInput {
  name: string;
  description?: string;
}

export interface UpdateTenantInput {
  name?: string;
  description?: string;
}

export interface TenantFilter {
  page?: number;
  limit?: number;
  search?: string;
}

export interface TenantStats {
  totalUsers: number;
  totalTickets: number;
  totalDepartments: number;
  totalSLAs: number;
  totalWorkflows: number;
  activeTickets: number;
  closedTickets: number;
  recentActivity: any[];
}

export class TenantService {
  private tenantRepo: TenantRepository;
  private userRepo: UserRepository; 

  private get prisma() {
    return getPrismaClient();
  }

  constructor() {
    this.tenantRepo = new TenantRepository(this.prisma);
    this.userRepo = new UserRepository(this.prisma);
  }

  async getAllTenants(filter: TenantFilter = {}) {
    const { page = 1, limit = 10, search } = filter;
    const skip = (page - 1) * limit;

    const where = search ? {
      name: {
        contains: search,
        mode: 'insensitive' as const
      }
    } : {};

    const [tenants, total] = await Promise.all([
      this.tenantRepo.findMany({ where, skip, take: limit }),
      this.tenantRepo.count({ where })
    ]);

    return {
      tenants,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getTenantById(id: string) {
    return this.tenantRepo.findById(id);
  }

  async getTenantsByUserId(userId: string, filter: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 10 } = filter;
    const skip = (page - 1) * limit;

    // Get user's tenants through the user-tenant relationship
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Get tenant details
    const tenant = await this.tenantRepo.findById(user.tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    return {
      tenants: [tenant],
      pagination: {
        page: 1,
        limit: 1,
        total: 1,
        pages: 1
      }
    };
  }

  async createTenant(data: CreateTenantInput) {
    return this.tenantRepo.create(data);
  }

  async updateTenant(id: string, data: UpdateTenantInput) {
    return this.tenantRepo.update(id, data);
  }

  async deleteTenant(id: string) {
    return this.tenantRepo.delete(id);
  }

  async getTenantStats(tenantId: string): Promise<TenantStats> {
    const [
      totalUsers,
      totalTickets,
      totalDepartments,
      totalSLAs,
      totalWorkflows,
      activeTickets,
      closedTickets,
      recentActivity
    ] = await Promise.all([
      this.prisma.user.count({ where: { tenantId } }),
      this.prisma.ticket.count({ where: { tenantId } }),
      this.prisma.department.count({ where: { tenantId } }),
      this.prisma.sLA.count({ where: { tenantId } }),
      this.prisma.workflow.count({ where: { tenantId } }),
      this.prisma.ticket.count({ 
        where: { 
          tenantId,
          status: { in: ['open', 'in_progress'] }
        } 
      }),
      this.prisma.ticket.count({ 
        where: { 
          tenantId,
          status: 'closed'
        } 
      }),
      this.prisma.ticket.findMany({
        where: { tenantId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          creator: { select: { username: true, email: true } },
          assignee: { select: { username: true, email: true } }
        }
      })
    ]);

    return {
      totalUsers,
      totalTickets,
      totalDepartments,
      totalSLAs,
      totalWorkflows,
      activeTickets,
      closedTickets,
      recentActivity
    };
  }

  async addUserToTenant(tenantId: string, userId: string, role: string) {
    // Check if tenant exists
    const tenant = await this.tenantRepo.findById(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    // Check if user exists
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update user's tenant
    const updatedUser = await this.userRepo.update(userId, {
      tenantId,
      role: role as any
    });

    return updatedUser;
  }

  async removeUserFromTenant(tenantId: string, userId: string) {
    // Check if user exists and belongs to tenant
    const user = await this.userRepo.findById(userId);
    if (!user || user.tenantId !== tenantId) {
      throw new Error('User not found in this tenant');
    }

    // Soft delete user or remove from tenant
    const updatedUser = await this.userRepo.update(userId, {
      tenantId: '',
      deletedAt: new Date()
    });

    return updatedUser;
  }
}
