jest.mock('../integrations/resend/email.integration', () => ({
  ResendEmailIntegration: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue(true)
  }))
}));
import request from 'supertest';
import express from 'express';
import emailRouter from '../controllers/email.controller';

const app = express();
app.use(express.json());
app.use('/email', emailRouter);

describe('POST /email/send', () => {
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/email/send').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('should return success if email is sent', async () => {
    // Mock the sendTransactionalEmail method
    jest.spyOn(require('../services/email.service'), 'EmailService').mockImplementation(() => ({
      sendTransactionalEmail: jest.fn().mockResolvedValue({ success: true })
    }));
    const res = await request(app).post('/email/send').send({
      to: 'test@example.com',
      subject: 'Test',
      html: '<b>Hello</b>'
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBeDefined();
  });
}); 