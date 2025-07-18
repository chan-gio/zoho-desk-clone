import { Request, Response, Router } from 'express';
import { WebhookService } from '../services/webhook.service';

const router = Router();
const webhookService = new WebhookService();

router.post('/send', async (req: Request, res: Response) => {
  try {
    const { url, data } = req.body;
    if (!url || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await webhookService.sendWebhook({ url, data });
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send webhook' });
  }
});

export default router; 