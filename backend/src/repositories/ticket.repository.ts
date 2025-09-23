import { PrismaClient, Ticket as PrismaTicket, Prisma } from '../../prisma/generated/client/index.js';

export class TicketRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Prisma.TicketUncheckedCreateInput): Promise<PrismaTicket> {
    // Nếu không có order được chỉ định, lấy order tiếp theo trong column
    if (data.columnId && data.order === undefined) {
      const maxOrder = await this.prisma.ticket.findFirst({
        where: { columnId: data.columnId },
        orderBy: { order: 'desc' },
        select: { order: true }
      });
      data.order = (maxOrder?.order || 0) + 1;
    }

    return this.prisma.ticket.create({ 
      data: {
        ...data,
        order: data.order || 0
      }
    });
  }

  async findById(id: string, tenantId: string): Promise<PrismaTicket | null> {
    return this.prisma.ticket.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
  }

  async findMany(params: {
    tenantId: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: PrismaTicket[]; total: number }> {
    const { tenantId, status, priority, page = 1, limit = 20 } = params;
    const where: any = { tenantId, deletedAt: null };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    const [data, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.ticket.count({ where }),
    ]);
    return { data, total };
  }

  async update(id: string, data: Partial<Prisma.TicketUncheckedCreateInput>): Promise<PrismaTicket | null> {
    return this.prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<PrismaTicket | null> {
    return this.prisma.ticket.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findByColumn(columnId: string): Promise<PrismaTicket[]> {
    return this.prisma.ticket.findMany({
      where: { columnId, deletedAt: null },
      orderBy: { order: 'asc' },
      include: {
        creator: { select: { id: true, username: true, email: true } },
        assignee: { select: { id: true, username: true, email: true } },
        department: { select: { id: true, name: true } }
      }
    });
  }

  async updateOrder(ticketId: string, newOrder: number, columnId?: string): Promise<PrismaTicket | null> {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        order: newOrder,
        ...(columnId && { columnId })
      }
    });
  }

  async moveToColumn(ticketId: string, columnId: string, newOrder: number): Promise<PrismaTicket | null> {
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
}
