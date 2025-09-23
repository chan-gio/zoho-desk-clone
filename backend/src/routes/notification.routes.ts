import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller.js';
import { apiRateLimiter } from '../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply rate limiting and authentication to all routes
router.use(apiRateLimiter, authMiddleware);

// Notification routes
router.get('/', NotificationController.getNotifications);
router.get('/:id', NotificationController.getNotificationById);
router.put('/:id/read', NotificationController.markAsRead);
router.put('/read-all', NotificationController.markAllAsRead);
router.delete('/:id', NotificationController.deleteNotification);

// Notification template routes
router.get('/templates/list', requireRole('admin', 'agent'), NotificationController.getNotificationTemplates);
router.post('/templates', requireRole('admin'), NotificationController.createNotificationTemplate);
router.put('/templates/:id', requireRole('admin'), NotificationController.updateNotificationTemplate);
router.delete('/templates/:id', requireRole('admin'), NotificationController.deleteNotificationTemplate);

export default router;
