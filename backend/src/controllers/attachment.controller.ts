import { Request, Response, NextFunction } from 'express';
import { AttachmentService } from '../services/attachment.service.js';

const attachmentService = new AttachmentService();

export class AttachmentController {
  static async uploadAttachment(req: Request, res: Response, next: NextFunction) {
    try {
      const { ticketId, commentId } = req.body;
      const userId = (req as any).user?.id;
      const tenantId = (req as any).user?.tenantId;
      if (!userId) return res.status(401).json({ message: 'Missing userId' });
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      // Handle file upload (assuming multer middleware is used)
      const file = req.file;
      if (!file) return res.status(400).json({ message: 'No file uploaded' });
      
      const attachmentData = {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        filePath: file.path,
        url: `/uploads/${file.filename}`,
        ticketId: ticketId || undefined,
        commentId: commentId || undefined,
        uploadedBy: userId,
        tenantId
      };
      
      const attachment = await attachmentService.createAttachment(attachmentData);
      return res.status(201).json(attachment);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getAttachments(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, ticketId, commentId, mimeType } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await attachmentService.getAttachments({
        tenantId,
        page: Number(page),
        limit: Number(limit),
        ticketId: ticketId as string,
        commentId: commentId as string,
        mimeType: mimeType as string
      });
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getAttachmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const attachment = await attachmentService.getAttachmentById(id, tenantId);
      if (!attachment) return res.status(404).json({ message: 'Attachment not found' });
      return res.json(attachment);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async downloadAttachment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const attachment = await attachmentService.getAttachmentById(id, tenantId);
      if (!attachment) return res.status(404).json({ message: 'Attachment not found' });
      
      return res.download(attachment.filePath, attachment.originalName);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateAttachment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const attachment = await attachmentService.updateAttachment(id, tenantId, req.body);
      if (!attachment) return res.status(404).json({ message: 'Attachment not found' });
      return res.json(attachment);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteAttachment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const deleted = await attachmentService.deleteAttachment(id, tenantId);
      if (!deleted) return res.status(404).json({ message: 'Attachment not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }

  static async validateFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ message: 'No file uploaded' });
      
      const validation = await attachmentService.validateFile(file);
      return res.json(validation);
    } catch (err) {
      next(err);
      return;
    }
  }
}
