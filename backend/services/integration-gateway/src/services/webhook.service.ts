import fetch from 'node-fetch';

export interface WebhookPayload {
  url: string;
  data: any;
}

export interface WebhookResult {
  success: boolean;
  error?: string;
  status?: number;
}

export class WebhookService {
  /**
   * Send a webhook (POST) with validation, logging, and error handling
   */
  async sendWebhook(payload: WebhookPayload, tenantId?: string, userId?: string): Promise<WebhookResult> {
    if (!payload.url || !payload.data) {
      return { success: false, error: 'Missing required webhook fields' };
    }
    try {
      // Optionally: log audit event (tenantId, userId, action)
      const response = await fetch(payload.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.data),
      });
      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: errorText, status: response.status };
      }
      return { success: true, status: response.status };
    } catch (error: any) {
      console.error('WebhookService.sendWebhook error:', error, { tenantId, userId });
      return { success: false, error: error.message || 'Unknown error' };
    }
  }
} 