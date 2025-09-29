import { PrismaClient, Prisma } from '../../prisma/generated/client/index.js';

export class ColumnRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    name: string;
    description?: string;
    color?: string;
    isDefault?: boolean;
    tenantId: string;
    statusId?: string;
  }) {
    // Lấy order tiếp theo cho column
    const maxOrder = await this.prisma.column.findFirst({
      where: { tenantId: data.tenantId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    
    const nextOrder = (maxOrder?.order || 0) + 1;

    return this.prisma.column.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        color: data.color ?? null,
        isDefault: data.isDefault ?? false,
        tenantId: data.tenantId,
        order: nextOrder,
        statusId: data.statusId ?? null
      },
      include: {
        status: { select: { id: true, name: true, color: true } },
        tickets: {
          orderBy: [
            { afterId: 'asc' },
            { createdAt: 'asc' }
          ],
          include: {
            creator: { select: { id: true, username: true, email: true } },
            assignee: { select: { id: true, username: true, email: true } },
            priority: { select: { id: true, name: true, color: true } }
          }
        }
      }
    });
  }

  async findById(id: string) {
    return this.prisma.column.findUnique({
      where: { id },
      include: {
        status: { select: { id: true, name: true, color: true } },
        tickets: {
          orderBy: [
            { afterId: 'asc' },
            { createdAt: 'asc' }
          ],
          include: {
            creator: { select: { id: true, username: true, email: true } },
            assignee: { select: { id: true, username: true, email: true } },
            priority: { select: { id: true, name: true, color: true } }
          }
        }
      }
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.column.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' },
      include: {
        status: { select: { id: true, name: true, color: true } },
        tickets: {
          orderBy: [
            { afterId: 'asc' },
            { createdAt: 'asc' }
          ],
          include: {
            creator: { select: { id: true, username: true, email: true } },
            assignee: { select: { id: true, username: true, email: true } },
            priority: { select: { id: true, name: true, color: true } }
          }
        }
      }
    });
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    order?: number;
    color?: string;
    isDefault?: boolean;
    statusId?: string;
  }) {
    // Check if column exists first
    const existingColumn = await this.prisma.column.findUnique({
      where: { id }
    });
    
    if (!existingColumn) {
      return null;
    }

    const { statusId, ...updateData } = data;
    return this.prisma.column.update({
      where: { id },
      data: {
        ...updateData,
        ...(statusId && { status: { connect: { id: statusId } } })
      },
      include: {
        status: { select: { id: true, name: true, color: true } },
        tickets: {
          orderBy: [
            { afterId: 'asc' },
            { createdAt: 'asc' }
          ],
          include: {
            creator: { select: { id: true, username: true, email: true } },
            assignee: { select: { id: true, username: true, email: true } },
            priority: { select: { id: true, name: true, color: true } }
          }
        }
      }
    });
  }

  async delete(id: string) {
    // Trước khi xóa column, di chuyển tất cả tickets sang column mặc định
    const defaultColumn = await this.prisma.column.findFirst({
      where: { isDefault: true },
      select: { id: true }
    });

    if (defaultColumn) {
      await this.prisma.ticket.updateMany({
        where: { columnId: id },
        data: { columnId: defaultColumn.id }
      });
    }

    return this.prisma.column.delete({
      where: { id }
    });
  }

  async reorderColumns(tenantId: string, columnOrders: Array<{ id: string; order: number }>) {
    // Cập nhật thứ tự của các columns
    const updatePromises = columnOrders.map(({ id, order }) =>
      this.prisma.column.update({
        where: { id },
        data: { order }
      })
    );

    await Promise.all(updatePromises);

    // Trả về danh sách columns đã được sắp xếp lại
    return this.findByTenant(tenantId);
  }

  async moveTicketToColumn(ticketId: string, columnId: string, afterId?: string, tenantId?: string) {
    console.log('moveTicketToColumn called with:', { ticketId, columnId, afterId, tenantId });
    return this.prisma.$transaction(async (tx) => {
      // Validate that the target column exists and belongs to tenant
      const targetColumn = await tx.column.findFirst({
        where: { 
          id: columnId,
          ...(tenantId && { tenantId })
        }
      });
      
      console.log('Target column found:', targetColumn);
      
      if (!targetColumn) {
        throw new Error('Target column not found');
      }

      // Validate that the ticket exists and belongs to tenant
      const ticket = await tx.ticket.findFirst({
        where: { 
          id: ticketId,
          ...(tenantId && { tenantId })
        }
      });
      
      if (!ticket) {
        throw new Error('Ticket not found');
      }

      // Validate afterId if provided
      if (afterId) {
        const afterTicket = await tx.ticket.findFirst({
          where: { 
            id: afterId,
            ...(tenantId && { tenantId })
          }
        });
        
        if (!afterTicket) {
          throw new Error('After ticket not found');
        }
        
        if (afterTicket.columnId !== columnId) {
          throw new Error('After ticket must be in the same column');
        }
      }

      // Cập nhật ticket với columnId và afterId mới
      const updatedTicket = await tx.ticket.update({
        where: { id: ticketId },
        data: { 
          columnId, 
          afterId: afterId || null,
          updatedAt: new Date()
        }
      });

      return updatedTicket;
    });
  }

  async reorderTicketsInColumn(columnId: string, ticketOrders: Array<{ ticketId: string; afterId?: string }>, tenantId?: string) {
    return this.prisma.$transaction(async (tx) => {
      // Validate column exists and belongs to tenant
      if (tenantId) {
        const column = await tx.column.findFirst({
          where: { id: columnId, tenantId }
        });
        
        if (!column) {
          throw new Error('Column not found');
        }
      }

      // Cập nhật afterId của các tickets
      const updatePromises = ticketOrders.map(({ ticketId, afterId }) =>
        tx.ticket.update({
          where: { id: ticketId },
          data: { afterId: afterId || null }
        })
      );

      await Promise.all(updatePromises);

      // Trả về danh sách tickets đã được sắp xếp lại
      return tx.ticket.findMany({
        where: { columnId },
        orderBy: [
          { afterId: 'asc' },
          { createdAt: 'asc' }
        ],
        include: {
          creator: { select: { id: true, username: true, email: true } },
          assignee: { select: { id: true, username: true, email: true } },
          priority: { select: { id: true, name: true, color: true } }
        }
      });
    });
  }
}
