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
    // Lấy các statuses mặc định để map với columns
    const statuses = await this.prisma.status.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' }
    });

    const defaultColumns = [
      { name: 'To Do', description: 'Tickets cần được xử lý', color: '#FF6B6B', isDefault: true, statusName: 'Open' },
      { name: 'In Progress', description: 'Tickets đang được xử lý', color: '#4ECDC4', isDefault: false, statusName: 'In Progress' },
      { name: 'Review', description: 'Tickets cần được review', color: '#45B7D1', isDefault: false, statusName: 'Review' },
      { name: 'Done', description: 'Tickets đã hoàn thành', color: '#96CEB4', isDefault: false, statusName: 'Closed' }
    ];

    const createdColumns = [];
    for (let i = 0; i < defaultColumns.length; i++) {
      const columnData = defaultColumns[i];
      if (columnData) {
        // Tìm status tương ứng
        const status = statuses.find(s => s.name === columnData.statusName);
        
        const column = await this.columnRepo.create({
          name: columnData.name,
          description: columnData.description,
          color: columnData.color,
          isDefault: columnData.isDefault,
          tenantId,
          ...(status?.id && { statusId: status.id })
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
    const tickets = await this.prisma.ticket.findMany({
      where: { 
        columnId,
        deletedAt: null // Chỉ lấy tickets chưa bị xóa
      },
      orderBy: { order: 'asc' },
      include: {
        creator: { select: { id: true, username: true, email: true } },
        assignee: { select: { id: true, username: true, email: true } },
        department: { select: { id: true, name: true } },
        priority: { select: { id: true, name: true, color: true } },
        attachments: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            user: { select: { id: true, username: true, email: true } }
          }
        }
      }
    });
    return tickets;
  }
}
