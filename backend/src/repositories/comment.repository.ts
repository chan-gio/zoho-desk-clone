import { PrismaClient, TicketComment as PrismaComment, Prisma } from '../../prisma/generated/client/index.js';

export class CommentRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.TicketCommentUncheckedCreateInput): Promise<PrismaComment> {
    return this.prisma.ticketComment.create({ data });
  }

  async findMany(params: { ticketId: string; page?: number; limit?: number }): Promise<{ data: PrismaComment[]; total: number }> {
    const { ticketId, page = 1, limit = 20 } = params;
    const where = { ticketId };
    const [data, total] = await Promise.all([
      this.prisma.ticketComment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, username: true, email: true }
          }
        }
      }),
      this.prisma.ticketComment.count({ where }),
    ]);
    return { data, total };
  }

  async findById(id: string): Promise<PrismaComment | null> {
    return this.prisma.ticketComment.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true, email: true }
        }
      }
    });
  }

  async update(id: string, data: Partial<Prisma.TicketCommentUncheckedCreateInput>): Promise<PrismaComment | null> {
    return this.prisma.ticketComment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<PrismaComment | null> {
    return this.prisma.ticketComment.delete({ where: { id } });
  }
}
