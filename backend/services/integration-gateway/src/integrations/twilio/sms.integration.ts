import { Twilio } from 'twilio';

export interface SmsPayload {
  to: string;
  message: string;
}

export class TwilioSmsIntegration {
  private client: Twilio;
  private fromNumber: string;


  constructor(accountSid?: string, authToken?: string, fromNumber?: string) {
    const sid = accountSid || process.env.TWILIO_ACCOUNT_SID || '';
    const token = authToken || process.env.TWILIO_AUTH_TOKEN || '';
    this.fromNumber = fromNumber || process.env.TWILIO_FROM_NUMBER || '';
    if (!sid || !token || !this.fromNumber) {
      throw new Error('Twilio credentials and fromNumber are required');
    }
    this.client = new Twilio(sid, token);
  }

  async sendSms(payload: SmsPayload): Promise<boolean> {
    try {
      const result = await this.client.messages.create({
        body: payload.message,
        from: this.fromNumber,
        to: payload.to,
      });
      // Optionally check result.status or result.sid
      return !!result.sid;
    } catch (error) {
      // Optionally log error
      console.error('TwilioSmsIntegration.sendSms error:', error);
      return false;
    }
  }
} 