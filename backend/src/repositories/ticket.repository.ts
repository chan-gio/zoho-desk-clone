import { PrismaClient, Ticket as PrismaTicket, Prisma } from '../../prisma/generated/client/index.js';

export class TicketRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Prisma.TicketUncheckedCreateInput): Promise<PrismaTicket> {
    // Tách các relation IDs ra để sử dụng connect
    const { tenantId, creatorId, assigneeId, departmentId, columnId, priorityId, afterId, ...ticketData } = data;

    return this.prisma.ticket.create({ 
      data: {
        title: data.title,
        description: data.description ?? null,
        status: data.status ?? 'open',
        afterId: afterId || null,
        createdAt: data.createdAt ?? new Date(),
        updatedAt: data.updatedAt ?? new Date(),
        closedAt: data.closedAt ?? null,
        deletedAt: data.deletedAt ?? null,
        tenant: { connect: { id: tenantId } },
        creator: { connect: { id: creatorId } },
        ...(assigneeId && { assignee: { connect: { id: assigneeId } } }),
        ...(departmentId && { department: { connect: { id: departmentId } } }),
        ...(columnId && { column: { connect: { id: columnId } } }),
        ...(priorityId && { priority: { connect: { id: priorityId } } })
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
    priorityId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: PrismaTicket[]; total: number }> {
    const { tenantId, status, priorityId, page = 1, limit = 20 } = params;
    const where: any = { tenantId, deletedAt: null };
    if (status) where.status = status;
    if (priorityId) where.priorityId = priorityId;
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
    return this.getTicketsInColumn(columnId);
  }

  async moveTicket(ticketId: string, columnId: string, afterId?: string): Promise<PrismaTicket | null> {
    return this.prisma.$transaction(async (tx) => {
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

  async getTicketsInColumn(columnId: string): Promise<PrismaTicket[]> {
    return this.prisma.ticket.findMany({
      where: { columnId, deletedAt: null },
      orderBy: [
        { afterId: 'asc' }, // Tickets với afterId = null sẽ ở đầu
        { createdAt: 'asc' } // Sau đó sort theo thời gian tạo
      ],
      include: {
        creator: { select: { id: true, username: true, email: true } },
        assignee: { select: { id: true, username: true, email: true } },
        department: { select: { id: true, name: true } },
        priority: { select: { id: true, name: true, color: true } }
      }
    });
  }

  async reorderTicketsInColumn(columnId: string): Promise<void> {
    // Lấy tất cả tickets trong column và sắp xếp lại theo afterId
    const tickets = await this.prisma.ticket.findMany({
      where: { columnId, deletedAt: null },
      orderBy: [
        { afterId: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    // Cập nhật afterId cho từng ticket để tạo linked list
    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i];
      if (ticket) {
        const prevTicket = i > 0 ? tickets[i - 1] : null;
        const afterId = prevTicket?.id || null;
        await this.prisma.ticket.update({
          where: { id: ticket.id },
          data: { afterId }
        });
      }
    }
  }
}
