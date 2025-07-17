// src/services/user.service.ts

import { UserRepository } from '../repositories/user.repository';
import { UserRole, PrismaClient } from '../../../../shared/prisma/generated/client';

export class UserService {
  private userRepo: UserRepository;

  constructor(prismaClient: PrismaClient) {
    this.userRepo = new UserRepository(prismaClient);
  }

  async registerUser(input: {
    email: string;
    username: string;
    passwordHash: string;
    tenantId: string;
  }) {
    // 👇 Logic bổ sung nếu cần (e.g., check email tồn tại)
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) throw new Error('User already exists');

    return this.userRepo.createUser({
      ...input,
      role: UserRole.customer, // 👈 mặc định nếu cần
    });
  }

  async getUserById(id: string) {
    return this.userRepo.findById(id);
  }

  async updateUserRole(id: string, role: UserRole) {
    return this.userRepo.updateUser(id, { role });
  }

  async listUsersForTenant(tenantId: string) {
    return this.userRepo.listUsersByTenant(tenantId);
  }

  async deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }

  async getUsersByTenant(tenantId: string) {
  return this.userRepo.findMany({
    where: { tenantId },
  });
}

  async updateUser(id: string, updates: Partial<{ username: string; email: string; passwordHash: string; role: UserRole }>) {
    return this.userRepo.updateUserProfile(id, updates);
  }

  async softDeleteUser(id: string) {
    return this.userRepo.softDeleteUser(id);
  }

  async getUsers(filter: { tenantId?: string; role?: UserRole }) {
    const where: any = {};
    if (filter.tenantId) where.tenantId = filter.tenantId;
    if (filter.role) where.role = filter.role;
    return this.userRepo.findMany({ where });  }

  async getUserByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }
}
