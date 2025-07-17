import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../../prisma/generated/client';

export class RoleService {
  static getAllRoles(): Role[] {
    return RoleRepository.getAllRoles();
  }

  static isValidRole(role: string): boolean {
    return RoleRepository.isValidRole(role);
  }
}
