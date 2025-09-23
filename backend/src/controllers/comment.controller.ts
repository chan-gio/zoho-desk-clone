import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service.js';
import { CommentRepository } from '../repositories/comment.repository.js';
import { getPrismaClient } from '../database/postgres.js';

function getCommentService() {
  return new CommentService(new CommentRepository(getPrismaClient()));
}

export class CommentController {
  static async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: ticketId } = req.params;
      const userId = (req as any).user?.id;
      const { comment, attachments, isInternal = false } = req.body;
      
      if (!userId) return res.status(401).json({ error: 'Missing userId' });
      if (!ticketId) return res.status(400).json({ error: 'Missing ticketId' });
      if (!comment) return res.status(400).json({ error: 'Missing comment' });
      
      const data = { 
        ticketId, 
        userId, 
        comment, 
        isInternal,
        attachments 
      };
      
      const createdComment = await getCommentService().addComment(data);
      return res.status(201).json(createdComment);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getCommentsByTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: ticketId } = req.params;
      if (!ticketId) return res.status(400).json({ message: 'Missing ticketId parameter' });
      const { page = 1, limit = 20 } = req.query;
      const result = await getCommentService().getCommentsByTicket(
        ticketId, 
        Number(page), 
        Number(limit)
      );
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const comment = await getCommentService().getCommentById(id);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
      return res.json(comment);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: 'Missing userId' });
      
      const comment = await getCommentService().updateComment(id, req.body);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
      return res.json(comment);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const deleted = await getCommentService().deleteComment(id);
      if (!deleted) return res.status(404).json({ message: 'Comment not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }
}
