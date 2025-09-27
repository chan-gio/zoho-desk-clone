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
    // Lấy order tiếp theo
    const maxOrder = await this.prisma.column.findFirst({
      where: { tenantId: data.tenantId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    
    const nextOrder = (maxOrder?.order || 0) + 1;

    return this.prisma.column.create({
      data: {
        ...data,
        order: nextOrder,
        ...(data.statusId && { status: { connect: { id: data.statusId } } })
      },
      include: {
        status: { select: { id: true, name: true, color: true } },
        tickets: {
          orderBy: { order: 'asc' },
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
          orderBy: { order: 'asc' },
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
          orderBy: { order: 'asc' },
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
          orderBy: { order: 'asc' },
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

  async moveTicketToColumn(ticketId: string, columnId: string, newOrder: number) {
    return this.prisma.$transaction(async (tx) => {
      // Cập nhật ticket
      const updatedTicket = await tx.ticket.update({
        where: { id: ticketId },
        data: { columnId, order: newOrder }
      });

      // Cập nhật thứ tự của các tickets khác trong column đích
      await tx.ticket.updateMany({
        where: {
          columnId,
          id: { not: ticketId },
          order: { gte: newOrder }
        },
        data: {
          order: { increment: 1 }
        }
      });

      return updatedTicket;
    });
  }

  async reorderTicketsInColumn(columnId: string, ticketOrders: Array<{ ticketId: string; order: number }>) {
    return this.prisma.$transaction(async (tx) => {
      // Cập nhật thứ tự của các tickets
      const updatePromises = ticketOrders.map(({ ticketId, order }) =>
        tx.ticket.update({
          where: { id: ticketId },
          data: { order }
        })
      );

      await Promise.all(updatePromises);

      // Trả về danh sách tickets đã được sắp xếp lại
      return tx.ticket.findMany({
        where: { columnId },
        orderBy: { order: 'asc' },
        include: {
          creator: { select: { id: true, username: true, email: true } },
          assignee: { select: { id: true, username: true, email: true } },
          priority: { select: { id: true, name: true, color: true } }
        }
      });
    });
  }
}
