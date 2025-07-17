import { PrismaClient, Ticket as PrismaTicket, Prisma } from '../../../../shared/prisma/generated/client';

export class TicketRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Prisma.TicketUncheckedCreateInput): Promise<PrismaTicket> {
    return this.prisma.ticket.create({ data });
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
} 