import { UserRole } from '../../prisma/generated/client/index.js';

export class RoleRepository {
  static getAllRoles(): UserRole[] {
    return Object.values(UserRole);
  }

  static isValidRole(role: string): role is UserRole {
    return Object.values(UserRole).includes(role as UserRole);
  }
}
