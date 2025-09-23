import { getPrismaClient } from '../database/postgres.js';
import { UserRole, Role } from '../models/role.model.js';

export class RoleService {
  private get prisma() {
    return getPrismaClient();
  }

  async getAllRoles(tenantId: string): Promise<Role[]> {
    // For now, return predefined roles
    // In a real app, you might store roles in database
    const predefinedRoles: Role[] = [
      {
        id: 'admin',
        name: 'Administrator',
        permissions: ['*'],
        tenantId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'agent',
        name: 'Agent',
        permissions: ['tickets.read', 'tickets.update', 'comments.create', 'comments.read'],
        tenantId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'customer',
        name: 'Customer',
        permissions: ['tickets.read', 'tickets.create', 'comments.create', 'comments.read'],
        tenantId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return predefinedRoles;
  }

  async getRoleById(id: string, tenantId: string): Promise<Role | null> {
    const roles = await this.getAllRoles(tenantId);
    return roles.find(role => role.id === id) || null;
  }

  async createRole(roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> {
    // In a real app, save to database
    const role: Role = {
      id: `role_${Date.now()}`,
      ...roleData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return role;
  }

  async updateRole(id: string, tenantId: string, updateData: Partial<Role>): Promise<Role | null> {
    const role = await this.getRoleById(id, tenantId);
    if (!role) return null;

    const updatedRole: Role = {
      ...role,
      ...updateData,
      updatedAt: new Date()
    };
    return updatedRole;
  }

  async deleteRole(id: string, tenantId: string): Promise<boolean> {
    const role = await this.getRoleById(id, tenantId);
    return !!role;
  }

  async isValidRole(role: string): Promise<boolean> {
    return Object.values(UserRole).includes(role as UserRole);
  }

  async getRolePermissions(roleId: string, tenantId: string): Promise<string[]> {
    const role = await this.getRoleById(roleId, tenantId);
    return role?.permissions || [];
  }

  async hasPermission(roleId: string, permission: string, tenantId: string): Promise<boolean> {
    const permissions = await this.getRolePermissions(roleId, tenantId);
    return permissions.includes('*') || permissions.includes(permission);
  }
}
