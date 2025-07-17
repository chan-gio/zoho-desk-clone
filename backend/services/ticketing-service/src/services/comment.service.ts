import { CommentRepository } from '../repositories/comment.repository';
import { Prisma, TicketComment as PrismaComment } from '../../../../shared/prisma/generated/client';

export class CommentService {
  constructor(private commentRepo: CommentRepository) {}

  async addComment(data: Prisma.TicketCommentUncheckedCreateInput): Promise<PrismaComment> {
    return this.commentRepo.create(data);
  }

  async getCommentsByTicket(ticketId: string, page = 1, limit = 20) {
    return this.commentRepo.findMany({ ticketId, page, limit });
  }

  async updateComment(id: string, data: Partial<Prisma.TicketCommentUncheckedCreateInput>): Promise<PrismaComment | null> {
    return this.commentRepo.update(id, data);
  }

  async deleteComment(id: string): Promise<PrismaComment | null> {
    return this.commentRepo.delete(id);
  }
} 