import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// Comment routes
router.post('/tickets/:id/comments', CommentController.addComment);
router.get('/tickets/:id/comments', CommentController.getCommentsByTicket);
router.get('/comments/:id', CommentController.getCommentById);
router.put('/comments/:id', CommentController.updateComment);
router.delete('/comments/:id', CommentController.deleteComment);

export default router;
