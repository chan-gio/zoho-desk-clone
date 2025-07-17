import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service';

export class CommentController {
  constructor(private commentService: CommentService) {}

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: ticketId } = req.params;
      // Lấy userId từ middleware auth (JWT đã có id)
      const userId = (req as any).user?.id;
      const { comment, attachments } = req.body;
      if (!userId) return res.status(401).json({ error: 'Missing userId' });
      if (!ticketId) return res.status(400).json({ error: 'Missing ticketId' });
      if (!comment) return res.status(400).json({ error: 'Missing comment' });
      const data: any = { ticketId, userId, comment };
      if (attachments) data.attachments = attachments;
      const createdComment = await this.commentService.addComment(data);
      res.status(201).json(createdComment);
    } catch (err) { next(err); }
  };

  getCommentsByTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: ticketId } = req.params;
      const { page = 1, limit = 20 } = req.query;
      const result = await this.commentService.getCommentsByTicket(ticketId, Number(page), Number(limit));
      res.json(result);
    } catch (err) { next(err); }
  };

  updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { commentId } = req.params;
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: 'Missing userId' });
      const comment = await this.commentService.updateComment(commentId, req.body);
      res.json(comment);
    } catch (err) { next(err); }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { commentId } = req.params;
      await this.commentService.deleteComment(commentId);
      res.status(204).send();
    } catch (err) { next(err); }
  };
} 