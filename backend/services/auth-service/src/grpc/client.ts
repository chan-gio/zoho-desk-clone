import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load proto file
const PROTO_PATH = path.join(__dirname, 'auth.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const authProto = protoDescriptor.auth as any;

export class AuthGrpcClient {
  private userService: any;
  private authService: any;
  private roleService: any;

  constructor(serverAddress: string = 'localhost:50051') {
    this.userService = new authProto.UserService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.authService = new authProto.AuthService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.roleService = new authProto.RoleService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
  }

  // User Service Methods
  async getUser(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUser({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async createUser(userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.createUser(userData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async updateUser(id: string, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.updateUser({ id, ...updateData }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async deleteUser(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.deleteUser({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listUsers(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.listUsers(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Auth Service Methods
  async login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.login({ email, password }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async register(userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.register(userData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async refreshToken(refreshToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.refreshToken({ refreshToken }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async validateToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.validateToken({ token }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async logout(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.logout({ token }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Role Service Methods
  async getRole(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.roleService.getRole({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async createRole(roleData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.roleService.createRole(roleData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async updateRole(id: string, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.roleService.updateRole({ id, ...updateData }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async deleteRole(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.roleService.deleteRole({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listRoles(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.roleService.listRoles(params, (error: any, response: any) => {
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
    this.userService.close();
    this.authService.close();
    this.roleService.close();
  }
}

// Export singleton instance
export const authGrpcClient = new AuthGrpcClient(); 