import request from 'supertest';
import express from 'express';
import webhookRouter from '../controllers/webhook.controller';

const app = express();
app.use(express.json());
app.use('/webhook', webhookRouter);

describe('POST /webhook/send', () => {
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/webhook/send').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('should return success if webhook is sent', async () => {
    jest.spyOn(require('../services/webhook.service'), 'WebhookService').mockImplementation(() => ({
      sendWebhook: jest.fn().mockResolvedValue({ success: true })
    }));
    const res = await request(app).post('/webhook/send').send({
      url: 'https://example.com',
      data: { foo: 'bar' }
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBeDefined();
  });
}); 