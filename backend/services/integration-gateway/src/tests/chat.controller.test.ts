jest.mock('../integrations/facebook/messenger.integration', () => ({
  FacebookMessengerIntegration: jest.fn().mockImplementation(() => ({
    sendMessage: jest.fn().mockResolvedValue(true)
  }))
}));
import request from 'supertest';
import express from 'express';
import chatRouter from '../controllers/chat.controller';

const app = express();
app.use(express.json());
app.use('/chat', chatRouter);

describe('POST /chat/send', () => {
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/chat/send').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('should return success if message is sent', async () => {
    jest.spyOn(require('../services/chat.service'), 'ChatService').mockImplementation(() => ({
      sendMessengerMessage: jest.fn().mockResolvedValue({ success: true })
    }));
    const res = await request(app).post('/chat/send').send({
      recipientId: '123',
      message: 'Hello'
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBeDefined();
  });
}); 