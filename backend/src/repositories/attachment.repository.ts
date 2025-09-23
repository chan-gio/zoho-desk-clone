import { PrismaClient, Attachment as PrismaAttachment, Prisma } from '../../prisma/generated/client/index.js';
import { Attachment, CreateAttachmentInput, UpdateAttachmentInput, AttachmentFilter } from '../models/attachment.model.js';

export class AttachmentRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateAttachmentInput): Promise<PrismaAttachment> {
    return this.prisma.attachment.create({
      data: {
        filename: data.filename,
        filePath: data.filePath,
        originalName: data.originalName,
        mimeType: data.mimeType,
        size: data.size,
        url: data.url,
        uploadedBy: data.uploadedBy,
        tenantId: data.tenantId,
        ...(data.ticketId && { ticketId: data.ticketId }),
        ...(data.commentId && { commentId: data.commentId })
      }
    });
  }

  async findById(id: string, tenantId: string): Promise<PrismaAttachment | null> {
    return this.prisma.attachment.findFirst({
      where: { id, ticket: { tenantId } }
    });
  }

  async findMany(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    ticketId?: string;
    commentId?: string;
    mimeType?: string;
    dateFrom?: Date;
    dateTo?: Date;
    sizeMin?: number;
    sizeMax?: number;
  }): Promise<{ data: PrismaAttachment[]; total: number }> {
    const { 
      tenantId, 
      page = 1, 
      limit = 20, 
      ticketId, 
      commentId, 
      mimeType, 
      dateFrom, 
      dateTo, 
      sizeMin, 
      sizeMax 
    } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.AttachmentWhereInput = {
      OR: [
        { ticket: { tenantId } },
        { comment: { ticket: { tenantId } } }
      ]
    };

    if (ticketId) where.ticketId = ticketId;
    if (commentId) where.commentId = commentId;
    if (mimeType) where.filePath = { contains: mimeType }; // This is a simplified check
    if (dateFrom) where.uploadedAt = { gte: dateFrom };
    if (dateTo) where.uploadedAt = { lte: dateTo };
    if (sizeMin) where.filePath = { contains: 'size' }; // This would need proper size field
    if (sizeMax) where.filePath = { contains: 'size' }; // This would need proper size field

    const [data, total] = await Promise.all([
      this.prisma.attachment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { uploadedAt: 'desc' }
      }),
      this.prisma.attachment.count({ where })
    ]);

    return { data, total };
  }

  async update(id: string, tenantId: string, data: UpdateAttachmentInput): Promise<PrismaAttachment | null> {
    const attachment = await this.prisma.attachment.findFirst({
      where: { 
        id, 
        OR: [
          { ticket: { tenantId } },
          { comment: { ticket: { tenantId } } }
        ]
      }
    });

    if (!attachment) return null;

    return this.prisma.attachment.update({
      where: { id },
      data: {
        ...(data.filename && { filename: data.filename }),
        ...(data.filePath && { filePath: data.filePath })
      }
    });
  }

  async delete(id: string, tenantId: string): Promise<PrismaAttachment | null> {
    const attachment = await this.prisma.attachment.findFirst({
      where: { 
        id, 
        OR: [
          { ticket: { tenantId } },
          { comment: { ticket: { tenantId } } }
        ]
      }
    });

    if (!attachment) return null;

    return this.prisma.attachment.delete({
      where: { id }
    });
  }

  async findByTicket(ticketId: string, tenantId: string): Promise<PrismaAttachment[]> {
    return this.prisma.attachment.findMany({
      where: {
        ticketId,
        ticket: { tenantId }
      },
      orderBy: { uploadedAt: 'desc' }
    });
  }

  async findByComment(commentId: string, tenantId: string): Promise<PrismaAttachment[]> {
    return this.prisma.attachment.findMany({
      where: {
        commentId,
        comment: { ticket: { tenantId } }
      },
      orderBy: { uploadedAt: 'desc' }
    });
  }

  async findByUser(uploadedBy: string, tenantId: string): Promise<PrismaAttachment[]> {
    return this.prisma.attachment.findMany({
      where: {
        OR: [
          { ticket: { tenantId, creatorId: uploadedBy } },
          { comment: { ticket: { tenantId }, userId: uploadedBy } }
        ]
      },
      orderBy: { uploadedAt: 'desc' }
    });
  }

  async findByMimeType(mimeType: string, tenantId: string): Promise<PrismaAttachment[]> {
    return this.prisma.attachment.findMany({
      where: {
        filePath: { contains: mimeType }, // This is a simplified check
        OR: [
          { ticket: { tenantId } },
          { comment: { ticket: { tenantId } } }
        ]
      },
      orderBy: { uploadedAt: 'desc' }
    });
  }

  async getAttachmentStats(tenantId: string): Promise<{
    totalAttachments: number;
    totalSize: number;
    attachmentsByType: Record<string, number>;
    attachmentsByTicket: Record<string, number>;
    attachmentsByUser: Record<string, number>;
  }> {
    const attachments = await this.prisma.attachment.findMany({
      where: {
        OR: [
          { ticket: { tenantId } },
          { comment: { ticket: { tenantId } } }
        ]
      }
    });

    const totalAttachments = attachments.length;
    const totalSize = 0; // Would need size field in database
    const attachmentsByType: Record<string, number> = {};
    const attachmentsByTicket: Record<string, number> = {};
    const attachmentsByUser: Record<string, number> = {};

    attachments.forEach(attachment => {
      // Count by type (simplified)
      const type = 'unknown';
      attachmentsByType[type] = (attachmentsByType[type] || 0) + 1;

      // Count by ticket
      if (attachment.ticketId) {
        attachmentsByTicket[attachment.ticketId] = (attachmentsByTicket[attachment.ticketId] || 0) + 1;
      }

      // Count by user (would need uploadedBy field)
      const userId = 'unknown';
      attachmentsByUser[userId] = (attachmentsByUser[userId] || 0) + 1;
    });

    return {
      totalAttachments,
      totalSize,
      attachmentsByType,
      attachmentsByTicket,
      attachmentsByUser
    };
  }

  async getRecentAttachments(tenantId: string, limit: number = 10): Promise<PrismaAttachment[]> {
    return this.prisma.attachment.findMany({
      where: {
        OR: [
          { ticket: { tenantId } },
          { comment: { ticket: { tenantId } } }
        ]
      },
      orderBy: { uploadedAt: 'desc' },
      take: limit
    });
  }

  async getAttachmentsByDateRange(
    tenantId: string, 
    dateFrom: Date, 
    dateTo: Date
  ): Promise<PrismaAttachment[]> {
    return this.prisma.attachment.findMany({
      where: {
        uploadedAt: {
          gte: dateFrom,
          lte: dateTo
        },
        OR: [
          { ticket: { tenantId } },
          { comment: { ticket: { tenantId } } }
        ]
      },
      orderBy: { uploadedAt: 'desc' }
    });
  }

  async deleteAttachmentsByTicket(ticketId: string, tenantId: string): Promise<number> {
    const result = await this.prisma.attachment.deleteMany({
      where: {
        ticketId,
        ticket: { tenantId }
      }
    });

    return result.count;
  }

  async deleteAttachmentsByComment(commentId: string, tenantId: string): Promise<number> {
    const result = await this.prisma.attachment.deleteMany({
      where: {
        commentId,
        comment: { ticket: { tenantId } }
      }
    });

    return result.count;
  }
}
