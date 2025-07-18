import { Request, Response, Router } from 'express';
import { EmailService } from '../services/email.service';
import { ResendEmailIntegration } from '../integrations/resend/email.integration';

const router = Router();
const emailService = new EmailService(new ResendEmailIntegration(process.env.RESEND_API_KEY || ''));

router.post('/send', async (req: Request, res: Response) => {
  try {
    const { to, subject, html } = req.body;
    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await emailService.sendTransactionalEmail({ to, subject, html });
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router; 