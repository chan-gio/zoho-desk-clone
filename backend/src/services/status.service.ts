import { StatusRepository } from '../repositories/status.repository.js';
import { getPrismaClient } from '../database/postgres.js';

export class StatusService {
  private statusRepo: StatusRepository;

  private get prisma() {
    return getPrismaClient();
  }

  constructor() {
    this.statusRepo = new StatusRepository(this.prisma);
  }

  async createStatus(data: {
    name: string;
    color: string;
    tenantId: string;
    isDefault?: boolean;
  }) {
    return this.statusRepo.create(data);
  }

  async getStatusesByTenant(tenantId: string) {
    return this.statusRepo.findByTenant(tenantId);
  }

  async getStatusById(id: string) {
    return this.statusRepo.findById(id);
  }

  async updateStatus(id: string, data: {
    name?: string;
    color?: string;
    order?: number;
  }) {
    return this.statusRepo.update(id, data);
  }

  async deleteStatus(id: string) {
    return this.statusRepo.delete(id);
  }

  async initializeDefaultStatuses(tenantId: string) {
    const defaultStatuses = [
      { name: 'Open', color: '#FF6B6B', isDefault: true },
      { name: 'In Progress', color: '#4ECDC4', isDefault: false },
      { name: 'Review', color: '#45B7D1', isDefault: false },
      { name: 'Closed', color: '#96CEB4', isDefault: false }
    ];

    const createdStatuses = [];
    for (let i = 0; i < defaultStatuses.length; i++) {
      const statusData = defaultStatuses[i];
      if (statusData) {
        const status = await this.statusRepo.create({
          name: statusData.name,
          color: statusData.color,
          isDefault: statusData.isDefault,
          tenantId,
          order: i + 1
        });
        createdStatuses.push(status);
      }
    }

    return createdStatuses;
  }
}
