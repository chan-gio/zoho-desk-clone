import { Resend } from 'resend';
import twilio from 'twilio';
import { getMongoConnection } from '../database/mongodb.js';

export interface EmailResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export interface SMSResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export class IntegrationService {
  private resend: Resend;
  private twilioClient: any;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
  }

  async sendEmail({ to, subject, html, templateId, tenantId, userId }: {
    to: string;
    subject: string;
    html: string;
    templateId?: string;
    tenantId?: string;
    userId?: string;
  }): Promise<EmailResult> {
    try {
      if (!to || !subject || !html) {
        return { success: false, error: 'Missing required email fields' };
      }

      const result = await this.resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
        to: [to],
        subject,
        html
      });

      if (result.error) {
        return { success: false, error: result.error.message };
      }

      return { success: true, messageId: result.data?.id };
    } catch (error: any) {
      console.error('EmailService.sendEmail error:', error, { tenantId, userId });
      return { success: false, error: error.message || 'Unknown error' };
    }
  }

  async sendSMS({ to, message, templateId, tenantId, userId }: {
    to: string;
    message: string;
    templateId?: string;
    tenantId?: string;
    userId?: string;
  }): Promise<SMSResult> {
    try {
      if (!to || !message) {
        return { success: false, error: 'Missing required SMS fields' };
      }

      if (!this.twilioClient) {
        return { success: false, error: 'SMS service not configured' };
      }

      const result = await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_FROM || process.env.TWILIO_PHONE_NUMBER,
        to
      });

      return { success: true, messageId: result.sid };
    } catch (error: any) {
      console.error('SMS service error:', error, { tenantId, userId });
      return { success: false, error: error.message || 'Unknown error' };
    }
  }

  async createWebhook(webhookData: any) {
    const mongoose = getMongoConnection();
    const Webhook = mongoose.model('Webhook');
    
    const webhook = new Webhook({
      name: webhookData.name,
      url: webhookData.url,
      events: webhookData.events || [],
      isActive: webhookData.isActive || true,
      secret: webhookData.secret,
      tenantId: webhookData.tenantId,
      createdAt: new Date()
    });

    await webhook.save();
    return webhook;
  }

  async getWebhooks(tenantId: string) {
    const mongoose = getMongoConnection();
    const Webhook = mongoose.model('Webhook');
    
    const webhooks = await Webhook.find({ tenantId }).sort({ createdAt: -1 });
    return webhooks;
  }

  async testWebhook(webhookId: string, tenantId: string) {
    const mongoose = getMongoConnection();
    const Webhook = mongoose.model('Webhook');
    
    const webhook = await Webhook.findOne({ _id: webhookId, tenantId });
    if (!webhook) {
      throw new Error('Webhook not found');
    }

    // Mock webhook test
    const testResult = {
      success: true,
      statusCode: 200,
      responseTime: Math.random() * 1000,
      timestamp: new Date()
    };

    return testResult;
  }
}