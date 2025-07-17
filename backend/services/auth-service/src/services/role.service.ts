import { RoleRepository } from '../repositories/role.repository';
import { UserRole } from '../../../../shared/prisma/generated/client';

export class RoleService {
  static getAllRoles(): UserRole[] {
    return RoleRepository.getAllRoles();
  }

  static isValidRole(role: string): boolean {
    return RoleRepository.isValidRole(role);
  }
}
