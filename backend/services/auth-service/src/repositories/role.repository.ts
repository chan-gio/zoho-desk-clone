import { UserRole } from '../../../../shared/prisma/generated/client';

export class RoleRepository {
  static getAllRoles(): UserRole[] {
    return Object.values(UserRole);
  }

  static isValidRole(role: string): role is UserRole {
    return Object.values(UserRole).includes(role as UserRole);
  }
}
