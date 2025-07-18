import { Request, Response, Router } from 'express';
import { ChatService } from '../services/chat.service';
import { FacebookMessengerIntegration } from '../integrations/facebook/messenger.integration';

const router = Router();
const chatService = new ChatService(new FacebookMessengerIntegration(process.env.FB_PAGE_ACCESS_TOKEN || ''));

router.post('/send', async (req: Request, res: Response) => {
  try {
    const { recipientId, message } = req.body;
    if (!recipientId || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await chatService.sendMessengerMessage({ recipientId, message });
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router; 