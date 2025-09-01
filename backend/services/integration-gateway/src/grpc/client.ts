import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

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

export class IntegrationGrpcClient {
  private emailService: any;
  private smsService: any;
  private chatService: any;
  private webhookService: any;

  constructor(serverAddress: string = 'localhost:50054') {
    this.emailService = new integrationProto.EmailService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.smsService = new integrationProto.SMSService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.chatService = new integrationProto.ChatService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.webhookService = new integrationProto.WebhookService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
  }

  // Email Service Methods
  async sendEmail(emailData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.emailService.sendEmail(emailData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async sendBulkEmail(bulkEmailData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.emailService.sendBulkEmail(bulkEmailData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getEmailStatus(emailId: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.emailService.getEmailStatus({ emailId, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getEmailHistory(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.emailService.getEmailHistory(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // SMS Service Methods
  async sendSMS(smsData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.smsService.sendSMS(smsData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async sendBulkSMS(bulkSMSData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.smsService.sendBulkSMS(bulkSMSData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getSMSStatus(smsId: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.smsService.getSMSStatus({ smsId, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getSMSHistory(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.smsService.getSMSHistory(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Chat Service Methods
  async sendMessage(messageData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chatService.sendMessage(messageData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getChatHistory(chatId: string, tenantId: string, page: number, limit: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chatService.getChatHistory({ chatId, tenantId, page, limit }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async joinChat(chatId: string, userId: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chatService.joinChat({ chatId, userId, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async leaveChat(chatId: string, userId: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chatService.leaveChat({ chatId, userId, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getOnlineUsers(chatId: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chatService.getOnlineUsers({ chatId, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Webhook Service Methods
  async sendWebhook(webhookId: string, event: string, payload: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webhookService.sendWebhook({ webhookId, event, payload, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async registerWebhook(webhookData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webhookService.registerWebhook(webhookData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async unregisterWebhook(webhookId: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webhookService.unregisterWebhook({ webhookId, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listWebhooks(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webhookService.listWebhooks(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getWebhookHistory(webhookId: string, tenantId: string, page: number, limit: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webhookService.getWebhookHistory({ webhookId, tenantId, page, limit }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Close connections
  close(): void {
    this.emailService.close();
    this.smsService.close();
    this.chatService.close();
    this.webhookService.close();
  }
}

// Export singleton instance
export const integrationGrpcClient = new IntegrationGrpcClient(); 