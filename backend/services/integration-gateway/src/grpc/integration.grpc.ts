import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { EmailService } from '../services/email.service';
import { SMSService } from '../services/sms.service';
import { ChatService } from '../services/chat.service';
import { WebhookService } from '../services/webhook.service';

// Load proto file
const PROTO_PATH = path.join(__dirname, 'integration.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const integrationProto = protoDescriptor.integration as any;

// Initialize services
const emailService = new EmailService();
const smsService = new SMSService();
const chatService = new ChatService();
const webhookService = new WebhookService();

// Email Service Implementation
const emailServiceImplementation = {
  sendEmail: async (call: any, callback: any) => {
    try {
      const emailData = call.request;
      const email = await emailService.sendEmail(emailData);
      callback(null, { email });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  sendBulkEmail: async (call: any, callback: any) => {
    try {
      const bulkEmailData = call.request;
      const result = await emailService.sendBulkEmail(bulkEmailData);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getEmailStatus: async (call: any, callback: any) => {
    try {
      const { emailId, tenantId } = call.request;
      const status = await emailService.getEmailStatus(emailId, tenantId);
      callback(null, { status });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getEmailHistory: async (call: any, callback: any) => {
    try {
      const params = call.request;
      const result = await emailService.getEmailHistory(params);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// SMS Service Implementation
const smsServiceImplementation = {
  sendSMS: async (call: any, callback: any) => {
    try {
      const smsData = call.request;
      const sms = await smsService.sendSMS(smsData);
      callback(null, { sms });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  sendBulkSMS: async (call: any, callback: any) => {
    try {
      const bulkSMSData = call.request;
      const result = await smsService.sendBulkSMS(bulkSMSData);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getSMSStatus: async (call: any, callback: any) => {
    try {
      const { smsId, tenantId } = call.request;
      const status = await smsService.getSMSStatus(smsId, tenantId);
      callback(null, { status });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getSMSHistory: async (call: any, callback: any) => {
    try {
      const params = call.request;
      const result = await smsService.getSMSHistory(params);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Chat Service Implementation
const chatServiceImplementation = {
  sendMessage: async (call: any, callback: any) => {
    try {
      const messageData = call.request;
      const message = await chatService.sendMessage(messageData);
      callback(null, { message });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getChatHistory: async (call: any, callback: any) => {
    try {
      const { chatId, tenantId, page, limit } = call.request;
      const result = await chatService.getChatHistory(chatId, tenantId, page, limit);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  joinChat: async (call: any, callback: any) => {
    try {
      const { chatId, userId, tenantId } = call.request;
      await chatService.joinChat(chatId, userId, tenantId);
      callback(null, { success: true });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  leaveChat: async (call: any, callback: any) => {
    try {
      const { chatId, userId, tenantId } = call.request;
      await chatService.leaveChat(chatId, userId, tenantId);
      callback(null, { success: true });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getOnlineUsers: async (call: any, callback: any) => {
    try {
      const { chatId, tenantId } = call.request;
      const result = await chatService.getOnlineUsers(chatId, tenantId);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Webhook Service Implementation
const webhookServiceImplementation = {
  sendWebhook: async (call: any, callback: any) => {
    try {
      const { webhookId, event, payload, tenantId } = call.request;
      const delivery = await webhookService.sendWebhook(webhookId, event, payload, tenantId);
      callback(null, { delivery });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  registerWebhook: async (call: any, callback: any) => {
    try {
      const webhookData = call.request;
      const webhook = await webhookService.registerWebhook(webhookData);
      callback(null, { webhook });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  unregisterWebhook: async (call: any, callback: any) => {
    try {
      const { webhookId, tenantId } = call.request;
      await webhookService.unregisterWebhook(webhookId, tenantId);
      callback(null, { success: true });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listWebhooks: async (call: any, callback: any) => {
    try {
      const params = call.request;
      const result = await webhookService.listWebhooks(params);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getWebhookHistory: async (call: any, callback: any) => {
    try {
      const { webhookId, tenantId, page, limit } = call.request;
      const result = await webhookService.getWebhookHistory(webhookId, tenantId, page, limit);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Create gRPC server
export function createGrpcServer(): grpc.Server {
  const server = new grpc.Server();

  // Add services to server
  server.addService(integrationProto.EmailService.service, emailServiceImplementation);
  server.addService(integrationProto.SMSService.service, smsServiceImplementation);
  server.addService(integrationProto.ChatService.service, chatServiceImplementation);
  server.addService(integrationProto.WebhookService.service, webhookServiceImplementation);

  return server;
}

// Start gRPC server
export function startGrpcServer(port: number = 50054): grpc.Server {
  const server = createGrpcServer();
  
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Failed to start gRPC server:', err);
        return;
      }
      
      server.start();
      console.log(`gRPC server running on port ${port}`);
    }
  );

  return server;
} 