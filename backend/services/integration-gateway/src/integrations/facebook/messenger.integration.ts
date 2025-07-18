import fetch from 'node-fetch';

export interface MessengerPayload {
  recipientId: string;
  message: string;
}

export class FacebookMessengerIntegration {
  private pageAccessToken: string;
  private apiUrl = 'https://graph.facebook.com/v18.0/me/messages';

  constructor(pageAccessToken?: string) {
    this.pageAccessToken = pageAccessToken || process.env.FB_PAGE_ACCESS_TOKEN || '';
    if (!this.pageAccessToken) {
      throw new Error('Facebook Page Access Token is required');
    }
  }

  async sendMessage(payload: MessengerPayload): Promise<boolean> {
    const body = {
      recipient: { id: payload.recipientId },
      message: { text: payload.message },
    };
    try {
      const response = await fetch(`${this.apiUrl}?access_token=${this.pageAccessToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Facebook API error: ${response.status} - ${errorText}`);
      }
      const data = await response.json() as any;
      // Optionally check data for message_id
      return !!data.message_id;
    } catch (error) {
      // Optionally log error
      console.error('FacebookMessengerIntegration.sendMessage error:', error);
      return false;
    }
  }
} 