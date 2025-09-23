import { getPrismaClient } from '../database/postgres.js';
import { Department, CreateDepartmentInput, UpdateDepartmentInput } from '../models/department.model.js';

export class DepartmentService {
  private get prisma() {
    return getPrismaClient();
  }

  async createDepartment(data: CreateDepartmentInput): Promise<Department> {
    const department = await this.prisma.department.create({
      data: {
        name: data.name,
        ...(data.description && { description: data.description }),
        tenantId: data.tenantId
      }
    });

    return {
      id: department.id,
      name: department.name,
      ...(department.description && { description: department.description }),
      tenantId: department.tenantId,
      createdAt: department.createdAt,
      updatedAt: department.updatedAt
    };
  }

  async getDepartmentById(id: string, tenantId: string): Promise<Department | null> {
    const department = await this.prisma.department.findFirst({
      where: { id, tenantId }
    });

    if (!department) return null;

    return {
      id: department.id,
      name: department.name,
      ...(department.description && { description: department.description }),
      tenantId: department.tenantId,
      createdAt: department.createdAt,
      updatedAt: department.updatedAt
    };
  }

  async listDepartments(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ departments: Department[]; total: number; page: number; limit: number }> {
    const { tenantId, page = 1, limit = 20, search } = params;
    const skip = (page - 1) * limit;

    const where: any = { tenantId };
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const [departments, total] = await Promise.all([
      this.prisma.department.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      this.prisma.department.count({ where })
    ]);

    return {
      departments: departments.map(dept => ({
        id: dept.id,
        name: dept.name,
        ...(dept.description && { description: dept.description }),
        tenantId: dept.tenantId,
        createdAt: dept.createdAt,
        updatedAt: dept.updatedAt
      })),
      total,
      page,
      limit
    };
  }

  async updateDepartment(id: string, tenantId: string, data: UpdateDepartmentInput): Promise<Department | null> {
    const department = await this.prisma.department.findFirst({
      where: { id, tenantId }
    });

    if (!department) return null;

    const updatedDepartment = await this.prisma.department.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description })
      }
    });

    return {
      id: updatedDepartment.id,
      name: updatedDepartment.name,
      ...(updatedDepartment.description && { description: updatedDepartment.description }),
      tenantId: updatedDepartment.tenantId,
      createdAt: updatedDepartment.createdAt,
      updatedAt: updatedDepartment.updatedAt
    };
  }

  async deleteDepartment(id: string, tenantId: string): Promise<boolean> {
    const department = await this.prisma.department.findFirst({
      where: { id, tenantId }
    });

    if (!department) return false;

    await this.prisma.department.delete({
      where: { id }
    });

    return true;
  }

  async getDepartmentsByTenant(tenantId: string): Promise<Department[]> {
    const departments = await this.prisma.department.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' }
    });

    return departments.map(dept => ({
      id: dept.id,
      name: dept.name,
      ...(dept.description && { description: dept.description }),
      tenantId: dept.tenantId,
      createdAt: dept.createdAt,
      updatedAt: dept.updatedAt
    }));
  }

  async getDepartmentStats(tenantId: string): Promise<{ totalDepartments: number; departmentsWithTickets: number }> {
    const [totalDepartments, departmentsWithTickets] = await Promise.all([
      this.prisma.department.count({ where: { tenantId } }),
      this.prisma.department.count({
        where: {
          tenantId,
          tickets: { some: {} }
        }
      })
    ]);

    return { totalDepartments, departmentsWithTickets };
  }
}
