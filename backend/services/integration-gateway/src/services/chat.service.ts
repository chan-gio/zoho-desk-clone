import { FacebookMessengerIntegration, MessengerPayload } from '../integrations/facebook/messenger.integration';

export interface ChatResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export class ChatService {
  constructor(private messengerIntegration: FacebookMessengerIntegration) {}

  /**
   * Send a Messenger message with validation, logging, and error handling
   */
  async sendMessengerMessage(payload: MessengerPayload, tenantId?: string, userId?: string): Promise<ChatResult> {
    if (!payload.recipientId || !payload.message) {
      return { success: false, error: 'Missing required chat fields' };
    }
    try {
      // Optionally: log audit event (tenantId, userId, action)
      // Optionally: check quotas, rate limits, etc.
      const sent = await this.messengerIntegration.sendMessage(payload);
      if (sent) {
        // Optionally: return messageId if available
        return { success: true };
      }
      return { success: false, error: 'Failed to send Messenger message' };
    } catch (error: any) {
      console.error('ChatService.sendMessengerMessage error:', error, { tenantId, userId });
      return { success: false, error: error.message || 'Unknown error' };
    }
  }
} 