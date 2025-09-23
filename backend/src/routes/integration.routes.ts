import { Router } from 'express';
import { IntegrationController } from '../controllers/integration.controller.js';

const router = Router();

// Integration routes
router.get('/webhooks', IntegrationController.getWebhooks);
router.post('/webhooks', IntegrationController.createWebhook);
router.post('/webhooks/:id/test', IntegrationController.testWebhook);
router.post('/email/send', IntegrationController.sendEmail);
router.post('/sms/send', IntegrationController.sendSMS);

export default router;
