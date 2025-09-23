import { Request, Response, NextFunction } from 'express';
import { AttachmentService } from '../services/attachment.service.js';
import { successResponse, errorResponse } from '../shared/utils/response.js';

// Lazy initialization để tránh vấn đề khởi tạo Prisma client
let attachmentService: AttachmentService | null = null;

const getAttachmentService = (): AttachmentService => {
  if (!attachmentService) {
    attachmentService = new AttachmentService();
  }
  return attachmentService;
};

export class AttachmentController {
  static async uploadAttachment(req: Request, res: Response, next: NextFunction) {
    try {
      const { ticketId, commentId } = req.body;
      const userId = (req as any).user?.id;
      const tenantId = (req as any).user?.tenantId;
      
      if (!userId) {
        return res.status(401).json(errorResponse({ error: 'Missing userId' }));
      }
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Missing tenantId' }));
      }
      
      // Handle file upload (Cloudinary storage)
      const file = req.file;
      if (!file) {
        return res.status(400).json(errorResponse({ error: 'No file uploaded' }));
      }
      
      const uploadResult = await getAttachmentService().uploadFile(file, {
        ticketId: ticketId || undefined,
        commentId: commentId || undefined,
        uploadedBy: userId,
        tenantId
      });
      
      if (!uploadResult.success) {
        return res.status(400).json(errorResponse({ error: uploadResult.error }));
      }
      
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: uploadResult.message,
        data: {
          attachment: uploadResult.attachment,
          cloudinaryData: uploadResult.cloudinaryData
        },
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getAttachments(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, ticketId, commentId, mimeType } = req.query;
      const tenantId = (req as any).user?.tenantId;
      
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Missing tenantId' }));
      }
      
      const result = await getAttachmentService().getAttachments({
        tenantId,
        page: Number(page),
        limit: Number(limit),
        ticketId: ticketId as string,
        commentId: commentId as string,
        mimeType: mimeType as string
      });
      
      return res.json(successResponse({
        data: result,
        message: 'Attachments retrieved successfully'
      }));
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getAttachmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Missing id parameter' }));
      }
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Missing tenantId' }));
      }
      
      const attachment = await getAttachmentService().getAttachmentById(id, tenantId);
      if (!attachment) {
        return res.status(404).json(errorResponse({ error: 'Attachment not found' }));
      }
      
      return res.json(successResponse({
        data: attachment,
        message: 'Attachment retrieved successfully'
      }));
    } catch (err) {
      next(err);
      return;
    }
  }

  static async downloadAttachment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Missing id parameter' }));
      }
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Missing tenantId' }));
      }
      
      const attachment = await getAttachmentService().getAttachmentById(id, tenantId);
      if (!attachment) {
        return res.status(404).json(errorResponse({ error: 'Attachment not found' }));
      }
      
      // Redirect to Cloudinary URL instead of downloading
      return res.redirect(attachment.url);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateAttachment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Missing id parameter' }));
      }
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Missing tenantId' }));
      }
      
      const attachment = await getAttachmentService().updateAttachment(id, tenantId, req.body);
      if (!attachment) {
        return res.status(404).json(errorResponse({ error: 'Attachment not found' }));
      }
      
      return res.json(successResponse({
        data: attachment,
        message: 'Attachment updated successfully'
      }));
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteAttachment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      
      if (!id) {
        return res.status(400).json(errorResponse({ error: 'Missing id parameter' }));
      }
      if (!tenantId) {
        return res.status(400).json(errorResponse({ error: 'Missing tenantId' }));
      }
      
      const deleted = await getAttachmentService().deleteAttachment(id, tenantId);
      if (!deleted) {
        return res.status(404).json(errorResponse({ error: 'Attachment not found' }));
      }
      
      return res.json(successResponse({
        data: null,
        message: 'Attachment deleted successfully'
      }));
    } catch (err) {
      next(err);
      return;
    }
  }

  static async validateFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json(errorResponse({ error: 'No file uploaded' }));
      }
      
      const validation = await getAttachmentService().validateFile(file);
      return res.json(successResponse({
        data: validation,
        message: 'File validation completed'
      }));
    } catch (err) {
      next(err);
      return;
    }
  }
}
