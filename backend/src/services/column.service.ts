import { getPrismaClient } from '../database/postgres.js';
import { ColumnRepository } from '../repositories/column.repository.js';
import { 
  Column, 
  CreateColumnInput, 
  UpdateColumnInput, 
  ColumnFilter,
  MoveTicketInput,
  ReorderTicketsInput 
} from '../models/column.model.js';

export class ColumnService {
  private columnRepo: ColumnRepository;

  private get prisma() {
    return getPrismaClient();
  }

  constructor() {
    this.columnRepo = new ColumnRepository(this.prisma);
  }

  async createColumn(data: CreateColumnInput): Promise<Column> {
    return this.columnRepo.create(data);
  }

  async getColumnById(id: string): Promise<Column | null> {
    return this.columnRepo.findById(id);
  }

  async getColumnsByTenant(tenantId: string): Promise<Column[]> {
    return this.columnRepo.findByTenant(tenantId);
  }

  async updateColumn(id: string, data: UpdateColumnInput): Promise<Column | null> {
    return this.columnRepo.update(id, data);
  }

  async deleteColumn(id: string): Promise<boolean> {
    try {
      await this.columnRepo.delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting column:', error);
      return false;
    }
  }

  async reorderColumns(tenantId: string, columnOrders: Array<{ id: string; order: number }>): Promise<Column[]> {
    return this.columnRepo.reorderColumns(tenantId, columnOrders);
  }

  async moveTicketToColumn(data: MoveTicketInput): Promise<any> {
    return this.columnRepo.moveTicketToColumn(data.ticketId, data.toColumnId, data.newOrder);
  }

  async reorderTicketsInColumn(data: ReorderTicketsInput): Promise<any[]> {
    return this.columnRepo.reorderTicketsInColumn(data.columnId, data.ticketOrders);
  }

  async initializeDefaultColumns(tenantId: string): Promise<Column[]> {
    const defaultColumns = [
      { name: 'To Do', description: 'Tickets cần được xử lý', color: '#FF6B6B', isDefault: true },
      { name: 'In Progress', description: 'Tickets đang được xử lý', color: '#4ECDC4', isDefault: false },
      { name: 'Review', description: 'Tickets cần được review', color: '#45B7D1', isDefault: false },
      { name: 'Done', description: 'Tickets đã hoàn thành', color: '#96CEB4', isDefault: false }
    ];

    const createdColumns = [];
    for (let i = 0; i < defaultColumns.length; i++) {
      const columnData = defaultColumns[i];
      if (columnData) {
        const column = await this.columnRepo.create({
          name: columnData.name,
          description: columnData.description,
          color: columnData.color,
          isDefault: columnData.isDefault,
          tenantId
        });
        createdColumns.push(column);
      }
    }

    return createdColumns;
  }

  async getColumnWithTickets(columnId: string): Promise<Column | null> {
    return this.columnRepo.findById(columnId);
  }

  async getTicketsByColumn(columnId: string): Promise<any[]> {
    const column = await this.columnRepo.findById(columnId);
    return column?.tickets || [];
  }
}
