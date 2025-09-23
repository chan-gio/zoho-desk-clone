import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notification.service.js';

const notificationService = new NotificationService();

export class NotificationController {
  static async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, type, status, channel } = req.query;
      const userId = (req as any).user?.id;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      if (!userId) return res.status(401).json({ message: 'Missing userId' });
      
      const result = await notificationService.getNotifications(
        tenantId as string,
        userId as string,
        Number(page),
        Number(limit)
      );
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getNotificationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const notification = await notificationService.getNotificationById(id, tenantId);
      if (!notification) return res.status(404).json({ message: 'Notification not found' });
      return res.json(notification);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const notification = await notificationService.markAsRead(id, tenantId);
      if (!notification) return res.status(404).json({ message: 'Notification not found' });
      return res.json(notification);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      if (!userId) return res.status(401).json({ message: 'Missing userId' });
      
      const result = await notificationService.markAllAsRead(userId, tenantId);
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      
      const deleted = await notificationService.deleteNotification(id, tenantId);
      if (!deleted) return res.status(404).json({ message: 'Notification not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }

  static async getNotificationTemplates(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, type, channel, isActive } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const result = await notificationService.getNotificationTemplates(
        tenantId,
        Number(page),
        Number(limit)
      );
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async createNotificationTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const data = { ...req.body, tenantId };
      const template = await notificationService.createNotificationTemplate(data, tenantId);
      return res.status(201).json(template);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async updateNotificationTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const template = await notificationService.updateNotificationTemplate(id, tenantId, req.body);
      if (!template) return res.status(404).json({ message: 'Template not found' });
      return res.json(template);
    } catch (err) {
      next(err);
      return;
    }
  }

  static async deleteNotificationTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      
      const deleted = await notificationService.deleteNotificationTemplate(id, tenantId);
      if (!deleted) return res.status(404).json({ message: 'Template not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }
}
