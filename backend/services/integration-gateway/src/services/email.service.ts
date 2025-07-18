import { ResendEmailIntegration, EmailPayload } from '../integrations/resend/email.integration';

export interface EmailResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export class EmailService {
  constructor(private emailIntegration: ResendEmailIntegration) {}

  /**
   * Send a transactional email with validation, logging, and error handling
   */
  async sendTransactionalEmail(payload: EmailPayload, tenantId?: string, userId?: string): Promise<EmailResult> {
    // Basic validation
    if (!payload.to || !payload.subject || !payload.html) {
      return { success: false, error: 'Missing required email fields' };
    }
    try {
      // Optionally: log audit event (tenantId, userId, action)
      // Optionally: check quotas, rate limits, etc.
      const sent = await this.emailIntegration.sendEmail(payload);
      // Optionally: log success
      if (sent) {
        // Optionally: return messageId if available
        return { success: true };
      }
      return { success: false, error: 'Failed to send email' };
    } catch (error: any) {
      // Log error with context
      console.error('EmailService.sendTransactionalEmail error:', error, { tenantId, userId });
      return { success: false, error: error.message || 'Unknown error' };
    }
  }
} 