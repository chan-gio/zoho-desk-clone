import { Request, Response, NextFunction } from 'express';
import { TicketService } from '../services/ticket.service';
import { CommentService } from '../services/comment.service';

export class TicketController {
  constructor(
    private ticketService: TicketService,
    private commentService: CommentService
  ) {}

  getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, priority, page = 1, limit = 20 } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const result = await this.ticketService.listTickets({
        tenantId,
        status: status as any,
        priority: priority as any,
        page: Number(page),
        limit: Number(limit),
      });
      res.json(result);
    } catch (err) { next(err); }
  };

  getTicketById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const ticket = await this.ticketService.getTicketById(id, tenantId);
      if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
      // Lấy comments
      const comments = await this.commentService.getCommentsByTicket(id);
      res.json({ ...ticket, comments });
    } catch (err) { next(err); }
  };

  createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const data = { ...req.body, tenantId };
      const ticket = await this.ticketService.createTicket(data);
      res.status(201).json(ticket);
    } catch (err) { next(err); }
  };

  updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const ticket = await this.ticketService.updateTicket(id, req.body);
      res.json(ticket);
    } catch (err) { next(err); }
  };

  deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      await this.ticketService.deleteTicket(id);
      res.status(204).send();
    } catch (err) { next(err); }
  };
} 