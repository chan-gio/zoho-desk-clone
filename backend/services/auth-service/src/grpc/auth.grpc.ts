import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';

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

// Initialize services
const userService = new UserService();
const authService = new AuthService();
const roleService = new RoleService();

// User Service Implementation
const userServiceImplementation = {
  getUser: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const user = await userService.getUserById(id, tenantId);
      
      if (!user) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'User not found'
        });
      }

      callback(null, { user });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  createUser: async (call: any, callback: any) => {
    try {
      const userData = call.request;
      const user = await userService.createUser(userData);
      callback(null, { user });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  updateUser: async (call: any, callback: any) => {
    try {
      const { id, ...updateData } = call.request;
      const user = await userService.updateUser(id, updateData);
      callback(null, { user });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  deleteUser: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      await userService.deleteUser(id, tenantId);
      callback(null, { success: true, message: 'User deleted successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listUsers: async (call: any, callback: any) => {
    try {
      const { tenantId, page, limit, role, isActive } = call.request;
      const result = await userService.listUsers({ tenantId, page, limit, role, isActive });
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Auth Service Implementation
const authServiceImplementation = {
  login: async (call: any, callback: any) => {
    try {
      const { email, password } = call.request;
      const result = await authService.login(email, password);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.UNAUTHENTICATED,
        message: error instanceof Error ? error.message : 'Authentication failed'
      });
    }
  },

  register: async (call: any, callback: any) => {
    try {
      const userData = call.request;
      const result = await authService.register(userData);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  },

  refreshToken: async (call: any, callback: any) => {
    try {
      const { refreshToken } = call.request;
      const result = await authService.refreshToken(refreshToken);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.UNAUTHENTICATED,
        message: error instanceof Error ? error.message : 'Token refresh failed'
      });
    }
  },

  validateToken: async (call: any, callback: any) => {
    try {
      const { token } = call.request;
      const result = await authService.validateToken(token);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.UNAUTHENTICATED,
        message: error instanceof Error ? error.message : 'Token validation failed'
      });
    }
  },

  logout: async (call: any, callback: any) => {
    try {
      const { token } = call.request;
      await authService.logout(token);
      callback(null, { success: true, message: 'Logged out successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Logout failed'
      });
    }
  }
};

// Role Service Implementation
const roleServiceImplementation = {
  getRole: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const role = await roleService.getRoleById(id, tenantId);
      
      if (!role) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Role not found'
        });
      }

      callback(null, { role });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  createRole: async (call: any, callback: any) => {
    try {
      const roleData = call.request;
      const role = await roleService.createRole(roleData);
      callback(null, { role });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  updateRole: async (call: any, callback: any) => {
    try {
      const { id, ...updateData } = call.request;
      const role = await roleService.updateRole(id, updateData);
      callback(null, { role });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  deleteRole: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      await roleService.deleteRole(id, tenantId);
      callback(null, { success: true, message: 'Role deleted successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listRoles: async (call: any, callback: any) => {
    try {
      const { tenantId, page, limit } = call.request;
      const result = await roleService.listRoles({ tenantId, page, limit });
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
  server.addService(authProto.UserService.service, userServiceImplementation);
  server.addService(authProto.AuthService.service, authServiceImplementation);
  server.addService(authProto.RoleService.service, roleServiceImplementation);

  return server;
}

// Start gRPC server
export function startGrpcServer(port: number = 50051): grpc.Server {
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