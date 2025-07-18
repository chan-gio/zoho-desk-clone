import { TwilioSmsIntegration, SmsPayload } from '../integrations/twilio/sms.integration';

export interface SmsResult {
  success: boolean;
  error?: string;
  sid?: string;
}

export class SmsService {
  constructor(private smsIntegration: TwilioSmsIntegration) {}

  /**
   * Send an SMS with validation, logging, and error handling
   */
  async sendSms(payload: SmsPayload, tenantId?: string, userId?: string): Promise<SmsResult> {
    if (!payload.to || !payload.message) {
      return { success: false, error: 'Missing required SMS fields' };
    }
    try {
      // Optionally: log audit event (tenantId, userId, action)
      // Optionally: check quotas, rate limits, etc.
      const sent = await this.smsIntegration.sendSms(payload);
      if (sent) {
        // Optionally: return sid if available
        return { success: true };
      }
      return { success: false, error: 'Failed to send SMS' };
    } catch (error: any) {
      console.error('SmsService.sendSms error:', error, { tenantId, userId });
      return { success: false, error: error.message || 'Unknown error' };
    }
  }
} 