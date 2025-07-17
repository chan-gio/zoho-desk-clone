import { DepartmentRepository } from '../repositories/department.repository';
import { Department } from '../models/department.model';

export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepository) {}

  async createDepartment(data: Omit<Department, 'id' | 'createdAt'>) {
    return this.departmentRepo.create(data);
  }

  async getDepartmentById(id: string, tenantId: string) {
    return this.departmentRepo.findById(id, tenantId);
  }

  async listDepartments(params: { tenantId: string; page?: number; limit?: number }) {
    return this.departmentRepo.findMany(params);
  }

  async updateDepartment(id: string, tenantId: string, data: Partial<Department>) {
    return this.departmentRepo.update(id, tenantId, data);
  }

  async deleteDepartment(id: string, tenantId: string) {
    return this.departmentRepo.delete(id, tenantId);
  }
} 