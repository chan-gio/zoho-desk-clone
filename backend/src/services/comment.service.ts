import { CommentRepository } from '../repositories/comment.repository.js';
import { Prisma } from '../../prisma/generated/client/index.js';

export class CommentService {
  constructor(private commentRepo: CommentRepository) {}

  async addComment(data: Prisma.TicketCommentUncheckedCreateInput): Promise<any> {
    return this.commentRepo.create(data);
  }

  async getCommentsByTicket(ticketId: string, page = 1, limit = 20) {
    return this.commentRepo.findMany({ ticketId, page, limit });
  }

  async getCommentById(id: string): Promise<any | null> {
    return this.commentRepo.findById(id);
  }

  async updateComment(id: string, data: Partial<Prisma.TicketCommentUncheckedCreateInput>): Promise<any | null> {
    return this.commentRepo.update(id, data);
  }

  async deleteComment(id: string): Promise<any | null> {
    return this.commentRepo.delete(id);
  }
}
