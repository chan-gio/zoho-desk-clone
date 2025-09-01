/**
 * Proxy configuration for API Gateway
 * Defines service endpoints and proxy settings for each microservice
 */

export interface ServiceConfig {
  name: string;
  url: string;
  healthCheck?: string;
  timeout?: number;
  retries?: number;
  circuitBreaker?: {
    threshold: number;
    timeout: number;
  };
}

export const services: Record<string, ServiceConfig> = {
  'auth-service': {
    name: 'auth-service',
    url: process.env.AUTH_SERVICE_URL || 'http://localhost:3000',
    healthCheck: '/health',
    timeout: 10000,
    retries: 3,
    circuitBreaker: {
      threshold: 5,
      timeout: 30000
    }
  },
  'ticketing-service': {
    name: 'ticketing-service',
    url: process.env.TICKETING_SERVICE_URL || 'http://localhost:3001',
    healthCheck: '/health',
    timeout: 15000,
    retries: 3,
    circuitBreaker: {
      threshold: 5,
      timeout: 30000
    }
  },
  'analytics-service': {
    name: 'analytics-service',
    url: process.env.ANALYTICS_SERVICE_URL || 'http://localhost:4004',
    healthCheck: '/health',
    timeout: 20000,
    retries: 2,
    circuitBreaker: {
      threshold: 3,
      timeout: 60000
    }
  },
  'knowledge-service': {
    name: 'knowledge-service',
    url: process.env.KNOWLEDGE_SERVICE_URL || 'http://localhost:3002',
    healthCheck: '/health',
    timeout: 10000,
    retries: 3,
    circuitBreaker: {
      threshold: 5,
      timeout: 30000
    }
  },
  'integration-gateway': {
    name: 'integration-gateway',
    url: process.env.INTEGRATION_SERVICE_URL || 'http://localhost:3003',
    healthCheck: '/health',
    timeout: 30000,
    retries: 2,
    circuitBreaker: {
      threshold: 3,
      timeout: 60000
    }
  }
};

/**
 * Get service configuration by name
 */
export function getServiceConfig(serviceName: string): ServiceConfig | undefined {
  return services[serviceName];
}

/**
 * Get service URL by name
 */
export function getServiceUrl(serviceName: string): string {
  const config = getServiceConfig(serviceName);
  return config?.url || '';
}

/**
 * Check if service is configured
 */
export function isServiceConfigured(serviceName: string): boolean {
  return !!getServiceConfig(serviceName);
}

/**
 * Get all service configurations
 */
export function getAllServices(): ServiceConfig[] {
  return Object.values(services);
}

/**
 * Proxy options for http-proxy-middleware
 */
export function getProxyOptions(serviceName: string) {
  const config = getServiceConfig(serviceName);
  if (!config) {
    throw new Error(`Service ${serviceName} not configured`);
  }

  return {
    target: config.url,
    changeOrigin: true,
    timeout: config.timeout,
    proxyTimeout: config.timeout,
    onError: (err: any, req: any, res: any) => {
      console.error(`Proxy error for ${serviceName}:`, err.message);
      if (!res.headersSent) {
        res.status(502).json({
          error: 'Service temporarily unavailable',
          service: serviceName,
          message: err.message
        });
      }
    },
    onProxyReq: (proxyReq: any, req: any, res: any) => {
      // Add service name to headers for logging
      proxyReq.setHeader('X-Service-Name', serviceName);
      proxyReq.setHeader('X-Gateway-Request', 'true');
    },
    onProxyRes: (proxyRes: any, req: any, res: any) => {
      // Add response time header
      const responseTime = Date.now() - (req.startTime || Date.now());
      res.setHeader('X-Response-Time', `${responseTime}ms`);
    }
  };
} 