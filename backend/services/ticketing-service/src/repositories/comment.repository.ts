import { PrismaClient, TicketComment as PrismaComment, Prisma } from '../../../../shared/prisma/generated/client';

export class CommentRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Prisma.TicketCommentUncheckedCreateInput): Promise<PrismaComment> {
    if (!data.userId) throw new Error('Missing userId');
    if (!data.ticketId) throw new Error('Missing ticketId');
    if (!data.comment) throw new Error('Missing comment');
    return this.prisma.ticketComment.create({
      data: {
        ticketId: data.ticketId,
        userId: data.userId,
        comment: data.comment,
      }
    });
  }

  async findById(id: string): Promise<PrismaComment | null> {
    return this.prisma.ticketComment.findUnique({ where: { id } });
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
      }),
      this.prisma.ticketComment.count({ where }),
    ]);
    return { data, total };
  }

  async update(id: string, data: Partial<Prisma.TicketCommentUncheckedCreateInput>): Promise<PrismaComment | null> {
    if (!data.comment) throw new Error('Missing comment');
    // Only allow updating fields that are updatable (e.g., comment, attachments)
    const updateData: any = { comment: data.comment };
    if (data.attachments) updateData.attachments = data.attachments;
    return this.prisma.ticketComment.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<PrismaComment | null> {
    return this.prisma.ticketComment.delete({ where: { id } });
  }
} 