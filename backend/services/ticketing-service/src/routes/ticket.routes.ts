import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import { CommentController } from '../controllers/comment.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';

export function ticketRoutes(ticketController: TicketController, commentController: CommentController) {
  const router = Router();
  router.use(apiRateLimiter, authMiddleware, tenantGuard);
  router.get('/tickets', ticketController.getTickets);
  router.get('/tickets/:id', ticketController.getTicketById);
  router.post('/tickets', ticketController.createTicket);
  router.put('/tickets/:id', ticketController.updateTicket);
  router.delete('/tickets/:id', ticketController.deleteTicket);
  // Comment endpoints
  router.post('/tickets/:id/comments', commentController.addComment);
  router.get('/tickets/:id/comments', commentController.getCommentsByTicket);
  return router;
} 