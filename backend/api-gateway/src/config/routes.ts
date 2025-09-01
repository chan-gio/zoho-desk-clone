/**
 * Route definitions for API Gateway
 * Maps incoming requests to appropriate microservices
 */

export interface RouteConfig {
  path: string;
  service: string;
  methods: string[];
  auth?: boolean;
  roles?: string[];
  rateLimit?: {
    windowMs: number;
    max: number;
  };
}

export const routes: RouteConfig[] = [
  // Auth Service Routes
  {
    path: '/auth',
    service: 'auth-service',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    auth: false,
    rateLimit: { windowMs: 15 * 60 * 1000, max: 100 } // 15 minutes, 100 requests
  },
  {
    path: '/users',
    service: 'auth-service',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    auth: true,
    roles: ['admin', 'agent']
  },

  // Ticketing Service Routes
  {
    path: '/tickets',
    service: 'ticketing-service',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    auth: true,
    roles: ['admin', 'agent', 'customer']
  },
  {
    path: '/departments',
    service: 'ticketing-service',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    auth: true,
    roles: ['admin']
  },
  {
    path: '/workflows',
    service: 'ticketing-service',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    auth: true,
    roles: ['admin']
  },
  {
    path: '/comments',
    service: 'ticketing-service',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    auth: true,
    roles: ['admin', 'agent', 'customer']
  },

  // Analytics Service Routes
  {
    path: '/analytics',
    service: 'analytics-service',
    methods: ['GET', 'POST'],
    auth: true,
    roles: ['admin', 'agent']
  },
  {
    path: '/api/reports',
    service: 'analytics-service',
    methods: ['GET'],
    auth: true,
    roles: ['admin', 'agent']
  },
  {
    path: '/api/dashboard',
    service: 'analytics-service',
    methods: ['GET'],
    auth: true,
    roles: ['admin', 'agent']
  },

  // Knowledge Base Service Routes
  {
    path: '/knowledge',
    service: 'knowledge-service',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    auth: true,
    roles: ['admin', 'agent']
  },
  {
    path: '/articles',
    service: 'knowledge-service',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    auth: true,
    roles: ['admin', 'agent']
  },
  {
    path: '/search',
    service: 'knowledge-service',
    methods: ['GET'],
    auth: false
  },

  // Integration Gateway Routes
  {
    path: '/integrations/email',
    service: 'integration-gateway',
    methods: ['GET', 'POST'],
    auth: true,
    roles: ['admin', 'agent']
  },
  {
    path: '/integrations/sms',
    service: 'integration-gateway',
    methods: ['GET', 'POST'],
    auth: true,
    roles: ['admin', 'agent']
  },
  {
    path: '/integrations/chat',
    service: 'integration-gateway',
    methods: ['GET', 'POST'],
    auth: true,
    roles: ['admin', 'agent']
  },
  {
    path: '/webhooks',
    service: 'integration-gateway',
    methods: ['GET', 'POST'],
    auth: false
  }
];

/**
 * Get route configuration for a specific path
 */
export function getRouteConfig(path: string): RouteConfig | undefined {
  return routes.find(route => path.startsWith(route.path));
}

/**
 * Check if route requires authentication
 */
export function requiresAuth(path: string): boolean {
  const route = getRouteConfig(path);
  return route?.auth ?? true; // Default to true for security
}

/**
 * Get required roles for a route
 */
export function getRequiredRoles(path: string): string[] {
  const route = getRouteConfig(path);
  return route?.roles ?? [];
} 