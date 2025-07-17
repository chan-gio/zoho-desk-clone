import { Role } from '../../prisma/generated/client';

export class RoleRepository {
  static getAllRoles(): Role[] {
    return Object.values(Role);
  }

  static isValidRole(role: string): role is Role {
    return Object.values(Role).includes(role as Role);
  }
}
