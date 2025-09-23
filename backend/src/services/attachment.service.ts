import { getPrismaClient } from '../database/postgres.js';
import { Attachment, CreateAttachmentInput, UpdateAttachmentInput, AttachmentFilter, FileUploadResult, FileValidationResult } from '../models/attachment.model.js';
import { promises as fs } from 'fs';
import path from 'path';

export class AttachmentService {
  private get prisma() {
    return getPrismaClient();
  }
  private uploadPath = process.env.UPLOAD_PATH || './uploads';
  private maxFileSize = parseInt(process.env.MAX_FILE_SIZE || '10485760'); // 10MB
  private allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  async createAttachment(data: CreateAttachmentInput): Promise<Attachment> {
    const attachment = await this.prisma.attachment.create({
      data: {
        filename: data.filename,
        originalName: data.originalName,
        mimeType: data.mimeType,
        size: data.size,
        filePath: data.filePath,
        url: data.url,
        ...(data.ticketId && { ticketId: data.ticketId }),
        ...(data.commentId && { commentId: data.commentId }),
        uploadedBy: data.uploadedBy,
        tenantId: data.tenantId
      }
    });

    return {
      id: attachment.id,
      filename: attachment.filename,
      originalName: attachment.originalName,
      mimeType: attachment.mimeType,
      size: attachment.size,
      filePath: attachment.filePath,
      url: attachment.filePath, // In a real app, this would be a public URL
      uploadedBy: attachment.uploadedBy,
      tenantId: attachment.tenantId,
      createdAt: attachment.uploadedAt,
      updatedAt: attachment.uploadedAt,
      ...(attachment.ticketId && { ticketId: attachment.ticketId }),
      ...(attachment.commentId && { commentId: attachment.commentId })
    };
  }

  async getAttachmentById(id: string, tenantId: string): Promise<Attachment | null> {
    const attachment = await this.prisma.attachment.findFirst({
      where: { id, tenantId }
    });

    if (!attachment) return null;

    return {
      id: attachment.id,
      filename: attachment.filename,
      originalName: attachment.originalName,
      mimeType: attachment.mimeType,
      size: attachment.size,
      filePath: attachment.filePath,
      url: attachment.filePath,
      uploadedBy: attachment.uploadedBy,
      tenantId: attachment.tenantId,
      createdAt: attachment.uploadedAt,
      updatedAt: attachment.uploadedAt,
      ...(attachment.ticketId && { ticketId: attachment.ticketId }),
      ...(attachment.commentId && { commentId: attachment.commentId })
    };
  }

  async getAttachments(params: {
    tenantId: string;
    page?: number;
    limit?: number;
    ticketId?: string;
    commentId?: string;
    mimeType?: string;
  }): Promise<{ attachments: Attachment[]; total: number; page: number; limit: number }> {
    const { tenantId, page = 1, limit = 20, ticketId, commentId, mimeType } = params;
    const skip = (page - 1) * limit;

    const where: any = { tenantId };
    if (ticketId) where.ticketId = ticketId;
    if (commentId) where.commentId = commentId;
    if (mimeType) where.mimeType = mimeType;

    const [attachments, total] = await Promise.all([
      this.prisma.attachment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { uploadedAt: 'desc' }
      }),
      this.prisma.attachment.count({ where })
    ]);

    return {
      attachments: attachments.map(attachment => ({
        id: attachment.id,
        filename: attachment.filename,
        originalName: attachment.originalName,
        mimeType: attachment.mimeType,
        size: attachment.size,
        filePath: attachment.filePath,
        url: attachment.filePath,
        uploadedBy: attachment.uploadedBy,
        tenantId: attachment.tenantId,
        createdAt: attachment.uploadedAt,
        updatedAt: attachment.uploadedAt,
        ...(attachment.ticketId && { ticketId: attachment.ticketId }),
        ...(attachment.commentId && { commentId: attachment.commentId })
      })),
      total,
      page,
      limit
    };
  }

  async updateAttachment(id: string, tenantId: string, data: UpdateAttachmentInput): Promise<Attachment | null> {
    const attachment = await this.prisma.attachment.findFirst({
      where: { id, tenantId }
    });

    if (!attachment) return null;

    const updatedAttachment = await this.prisma.attachment.update({
      where: { id },
      data: {
        ...(data.filename && { filename: data.filename }),
        ...(data.originalName && { originalName: data.originalName }),
        ...(data.mimeType && { mimeType: data.mimeType }),
        ...(data.filePath && { filePath: data.filePath }),
        ...(data.url && { url: data.url })
      }
    });

    return {
      id: updatedAttachment.id,
      filename: updatedAttachment.filename,
      originalName: updatedAttachment.originalName,
      mimeType: updatedAttachment.mimeType,
      size: updatedAttachment.size,
      filePath: updatedAttachment.filePath,
      url: updatedAttachment.filePath,
      uploadedBy: updatedAttachment.uploadedBy,
      tenantId: updatedAttachment.tenantId,
      createdAt: updatedAttachment.uploadedAt,
      updatedAt: updatedAttachment.uploadedAt,
      ...(updatedAttachment.ticketId && { ticketId: updatedAttachment.ticketId }),
      ...(updatedAttachment.commentId && { commentId: updatedAttachment.commentId })
    };
  }

  async deleteAttachment(id: string, tenantId: string): Promise<boolean> {
    const attachment = await this.prisma.attachment.findFirst({
      where: { id, tenantId }
    });

    if (!attachment) return false;

    // Delete file from filesystem
    try {
      await fs.unlink(attachment.filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    // Delete from database
    await this.prisma.attachment.delete({
      where: { id }
    });

    return true;
  }

  async validateFile(file: any): Promise<FileValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check file size
    if (file.size > this.maxFileSize) {
      errors.push(`File size exceeds maximum allowed size of ${this.maxFileSize / (1024 * 1024)}MB`);
    }

    // Check MIME type
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      errors.push(`File type ${file.mimetype} is not allowed`);
    }

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt', '.doc', '.docx', '.xls', '.xlsx'];
    if (!allowedExtensions.includes(ext)) {
      errors.push(`File extension ${ext} is not allowed`);
    }

    // Check for suspicious file names
    if (file.originalname.includes('..') || file.originalname.includes('/') || file.originalname.includes('\\')) {
      errors.push('File name contains invalid characters');
    }

    // Warnings
    if (file.size > this.maxFileSize * 0.8) {
      warnings.push('File size is close to the maximum limit');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  async uploadFile(file: any, data: {
    ticketId?: string;
    commentId?: string;
    uploadedBy: string;
    tenantId: string;
  }): Promise<FileUploadResult> {
    try {
      // Validate file
      const validation = await this.validateFile(file);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      // Generate unique filename
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      const filename = `${timestamp}_${file.originalname}`;
      const filePath = path.join(this.uploadPath, filename);

      // Ensure upload directory exists
      await fs.mkdir(this.uploadPath, { recursive: true });

      // Move file to upload directory
      await fs.rename(file.path, filePath);

      // Create attachment record
      const attachment = await this.createAttachment({
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        filePath: filePath,
        url: `/uploads/${filename}`,
        ...(data.ticketId && { ticketId: data.ticketId }),
        ...(data.commentId && { commentId: data.commentId }),
        uploadedBy: data.uploadedBy,
        tenantId: data.tenantId
      });

      return {
        success: true,
        attachment,
        message: 'File uploaded successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getFileStats(tenantId: string): Promise<{
    totalFiles: number;
    totalSize: number;
    filesByType: Record<string, number>;
  }> {
    const attachments = await this.prisma.attachment.findMany({
      where: { tenantId }
    });

    const totalFiles = attachments.length;
    const totalSize = attachments.reduce((sum, att) => sum + att.size, 0);
    const filesByType = attachments.reduce((acc, att) => {
      const type = att.mimeType.split('/')[0];
      acc[type || 'unknown'] = (acc[type || 'unknown'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalFiles, totalSize, filesByType };
  }
}
