import { getPrismaClient } from '../database/postgres.js';
import { PriorityRepository } from '../repositories/priority.repository.js';

export class PriorityService {
  private priorityRepo: PriorityRepository;

  private get prisma() {
    return getPrismaClient();
  }

  constructor() {
    this.priorityRepo = new PriorityRepository(this.prisma);
  }

  async createPriority(data: {
    name: string;
    color: string;
    tenantId: string;
    isDefault?: boolean;
  }) {
    return this.priorityRepo.create(data);
  }

  async getPrioritiesByTenant(tenantId: string) {
    return this.priorityRepo.findByTenant(tenantId);
  }

  async getPriorityById(id: string) {
    return this.priorityRepo.findById(id);
  }

  async updatePriority(id: string, data: {
    name?: string;
    color?: string;
    order?: number;
  }) {
    return this.priorityRepo.update(id, data);
  }

  async deletePriority(id: string) {
    return this.priorityRepo.delete(id);
  }

  async initializeDefaultPriorities(tenantId: string) {
    const defaultPriorities = [
      { name: 'Low', color: '#10AC84', isDefault: false },
      { name: 'Medium', color: '#FECA57', isDefault: true },
      { name: 'High', color: '#FF9F43', isDefault: false },
      { name: 'Urgent', color: '#EE5A24', isDefault: false }
    ];

    const createdPriorities = [];
    for (let i = 0; i < defaultPriorities.length; i++) {
      const priorityData = defaultPriorities[i];
      if (priorityData) {
        const priority = await this.priorityRepo.create({
          name: priorityData.name,
          color: priorityData.color,
          isDefault: priorityData.isDefault,
          tenantId,
          order: i + 1
        });
        createdPriorities.push(priority);
      }
    }

    return createdPriorities;
  }
}
