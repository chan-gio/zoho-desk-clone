import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller.js';
import { TicketService } from '../services/ticket.service.js';
import { CommentService } from '../services/comment.service.js';
import { TicketRepository } from '../repositories/ticket.repository.js';
import { CommentRepository } from '../repositories/comment.repository.js';
import { NotificationService } from '../services/notification.service.js';
import { WorkflowService } from '../services/workflow.service.js';
import { PrismaClient } from '../../prisma/generated/client/index.js';

const prisma = new PrismaClient();
const ticketRepo = new TicketRepository(prisma);
const commentRepo = new CommentRepository(prisma);
const notificationService = new NotificationService();
const workflowService = new WorkflowService(prisma);
const ticketService = new TicketService(ticketRepo, notificationService, workflowService, prisma);
const commentService = new CommentService(commentRepo);
const ticketController = new TicketController(ticketService, commentService);

const router = Router();

// Ticket routes
router.get('/', ticketController.getTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', ticketController.createTicket);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

export default router;
