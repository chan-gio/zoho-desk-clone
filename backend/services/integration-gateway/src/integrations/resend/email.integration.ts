import fetch from 'node-fetch';

/**
 * Payload for sending an email via Resend
 */
export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string; // Optional, fallback to default sender
}

/**
 * Integration for Resend transactional email API
 * @see https://resend.com/docs/api-reference/emails/send-email
 */
export class ResendEmailIntegration {
  private apiKey: string;
  private apiUrl = 'https://api.resend.com/emails';
  private defaultFrom: string;

  /**
   * @param apiKey Resend API key
   * @param defaultFrom Default sender email address
   */
  constructor(apiKey?: string, defaultFrom?: string) {
    this.apiKey = apiKey || process.env.RESEND_API_KEY || '';
    this.defaultFrom = defaultFrom || process.env.RESEND_DEFAULT_FROM || 'no-reply@example.com';
    if (!this.apiKey) {
      throw new Error('Resend API key is required');
    }
  }

  /**
   * Send an email using Resend API
   * @param payload EmailPayload
   * @returns true if sent successfully, false otherwise
   */
  async sendEmail(payload: EmailPayload): Promise<boolean> {
    const body = {
      from: payload.from || this.defaultFrom,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    };
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorText = await response.text();
        // Optionally log errorText
        throw new Error(`Resend API error: ${response.status} - ${errorText}`);
      }
      const data = await response.json() as any;
      // Optionally check data for messageId or status
      return !!data.id;
    } catch (error) {
      // Optionally log error
      console.error('ResendEmailIntegration.sendEmail error:', error);
      return false;
    }
  }
} 