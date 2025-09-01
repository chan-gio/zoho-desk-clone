import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

// Initialize services
const userService = new UserService();
const authService = new AuthService();
const roleService = new RoleService();

// Event names for subscriptions
const EVENTS = {
  USER_CREATED: 'USER_CREATED',
  USER_UPDATED: 'USER_UPDATED',
  USER_DELETED: 'USER_DELETED',
  ROLE_CREATED: 'ROLE_CREATED',
  ROLE_UPDATED: 'ROLE_UPDATED',
  ROLE_DELETED: 'ROLE_DELETED'
};

export const resolvers = {
  Query: {
    // User Queries
    getUser: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        return await userService.getUserById(id, tenantId);
      } catch (error) {
        throw new Error(`Failed to get user: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    listUsers: async (_: any, { input }: { input: any }) => {
      try {
        const { users, total, page, limit } = await userService.listUsers(input);
        return {
          users,
          total,
          page,
          limit
        };
      } catch (error) {
        throw new Error(`Failed to list users: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Role Queries
    getRole: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        return await roleService.getRoleById(id, tenantId);
      } catch (error) {
        throw new Error(`Failed to get role: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    listRoles: async (_: any, { input }: { input: any }) => {
      try {
        const { roles, total, page, limit } = await roleService.listRoles(input);
        return {
          roles,
          total,
          page,
          limit
        };
      } catch (error) {
        throw new Error(`Failed to list roles: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Auth Queries
    validateToken: async (_: any, { input }: { input: { token: string } }) => {
      try {
        const result = await authService.validateToken(input.token);
        return {
          valid: result.valid,
          user: result.user
        };
      } catch (error) {
        return {
          valid: false,
          user: null
        };
      }
    }
  },

  Mutation: {
    // Auth Mutations
    login: async (_: any, { input }: { input: { email: string; password: string } }) => {
      try {
        const result = await authService.login(input.email, input.password);
        return {
          token: result.token,
          refreshToken: result.refreshToken,
          user: result.user
        };
      } catch (error) {
        throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    register: async (_: any, { input }: { input: any }) => {
      try {
        const result = await authService.register(input);
        // Publish user created event
        pubsub.publish(EVENTS.USER_CREATED, {
          userCreated: result.user
        });
        return {
          user: result.user,
          token: result.token
        };
      } catch (error) {
        throw new Error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    refreshToken: async (_: any, { input }: { input: { refreshToken: string } }) => {
      try {
        const result = await authService.refreshToken(input.refreshToken);
        return {
          token: result.token,
          refreshToken: result.refreshToken
        };
      } catch (error) {
        throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    logout: async (_: any, { input }: { input: { token: string } }) => {
      try {
        await authService.logout(input.token);
        return {
          success: true,
          message: 'Logged out successfully'
        };
      } catch (error) {
        throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // User Mutations
    createUser: async (_: any, { input }: { input: any }) => {
      try {
        const user = await userService.createUser(input);
        // Publish user created event
        pubsub.publish(EVENTS.USER_CREATED, {
          userCreated: user
        });
        return user;
      } catch (error) {
        throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    updateUser: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const user = await userService.updateUser(id, input);
        // Publish user updated event
        pubsub.publish(EVENTS.USER_UPDATED, {
          userUpdated: user
        });
        return user;
      } catch (error) {
        throw new Error(`Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    deleteUser: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        await userService.deleteUser(id, tenantId);
        // Publish user deleted event
        pubsub.publish(EVENTS.USER_DELETED, {
          userDeleted: id
        });
        return {
          success: true,
          message: 'User deleted successfully'
        };
      } catch (error) {
        throw new Error(`Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Role Mutations
    createRole: async (_: any, { input }: { input: any }) => {
      try {
        const role = await roleService.createRole(input);
        // Publish role created event
        pubsub.publish(EVENTS.ROLE_CREATED, {
          roleCreated: role
        });
        return role;
      } catch (error) {
        throw new Error(`Failed to create role: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    updateRole: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const role = await roleService.updateRole(id, input);
        // Publish role updated event
        pubsub.publish(EVENTS.ROLE_UPDATED, {
          roleUpdated: role
        });
        return role;
      } catch (error) {
        throw new Error(`Failed to update role: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    deleteRole: async (_: any, { id, tenantId }: { id: string; tenantId: string }) => {
      try {
        await roleService.deleteRole(id, tenantId);
        // Publish role deleted event
        pubsub.publish(EVENTS.ROLE_DELETED, {
          roleDeleted: id
        });
        return {
          success: true,
          message: 'Role deleted successfully'
        };
      } catch (error) {
        throw new Error(`Failed to delete role: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },

  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.USER_CREATED])
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.USER_UPDATED])
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.USER_DELETED])
    },
    roleCreated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.ROLE_CREATED])
    },
    roleUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.ROLE_UPDATED])
    },
    roleDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.ROLE_DELETED])
    }
  }
}; 