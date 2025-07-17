import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { apiRateLimiter } from '../../../../shared/src/middlewares/rate-limit.middleware';
import { authMiddleware } from '../../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../../shared/src/middlewares/tenant.middleware';

export function commentRoutes(commentController: CommentController) {
  const router = Router();
  router.use(apiRateLimiter, authMiddleware, tenantGuard);
  router.put('/comments/:commentId', commentController.updateComment);
  router.delete('/comments/:commentId', commentController.deleteComment);
  return router;
} 