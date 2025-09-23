import { Request, Response, NextFunction } from 'express';
import { IntegrationService } from '../services/integration.service.js';

const integrationService = new IntegrationService();

export class IntegrationController {
  static async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { to, subject, html, templateId } = req.body;
      const tenantId = (req as any).user?.tenantId;
      const userId = (req as any).user?.id;

      if (!to || !subject || !html) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await integrationService.sendEmail({
        to,
        subject,
        html,
        templateId,
        tenantId,
        userId
      });

      return res.json({ success: result.success, messageId: result.messageId });
    } catch (error) {
      next(error);
      return;
    }
  }

  static async sendSMS(req: Request, res: Response, next: NextFunction) {
    try {
      const { to, message, templateId } = req.body;
      const tenantId = (req as any).user?.tenantId;
      const userId = (req as any).user?.id;

      if (!to || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await integrationService.sendSMS({
        to,
        message,
        templateId,
        tenantId,
        userId
      });

      return res.json({ success: result.success, messageId: result.messageId });
    } catch (error) {
      next(error);
      return;
    }
  }

  static async createWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const webhookData = {
        ...req.body,
        tenantId: (req as any).user?.tenantId
      };

      const webhook = await integrationService.createWebhook(webhookData);
      return res.status(201).json(webhook);
    } catch (error) {
      next(error);
      return;
    }
  }

  static async getWebhooks(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      const webhooks = await integrationService.getWebhooks(tenantId);
      return res.json(webhooks);
    } catch (error) {
      next(error);
      return;
    }
  }

  static async testWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const result = await integrationService.testWebhook(id, tenantId);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  }
}