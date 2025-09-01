import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { authMiddleware, optionalAuthMiddleware } from './middleware/auth.middleware';
import { getRouteConfig, getProxyOptions } from './config/proxy';
import { loadBalancer } from './services/load-balancer';
import { serviceDiscovery } from './services/service-discovery';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(globalRateLimit);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Authentication middleware
app.use(authMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  const stats = serviceDiscovery.getStats();
  const loadBalancerStats = loadBalancer.getStats();
  
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    gateway: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0'
    },
    services: stats,
    loadBalancer: loadBalancerStats
  });
});

// Service health endpoint
app.get('/health/services', (req, res) => {
  const services = serviceDiscovery.getAllServiceHealth();
  res.json({
    services,
    timestamp: new Date().toISOString()
  });
});

// Dynamic proxy middleware
app.use('*', async (req, res, next) => {
  try {
    const routeConfig = getRouteConfig(req.path);
    
    if (!routeConfig) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.path} not found`
      });
    }

    // Check if service is available
    if (!loadBalancer.isServiceAvailable(routeConfig.service)) {
      return res.status(503).json({
        error: 'Service Unavailable',
        message: `${routeConfig.service} is currently unavailable`,
        service: routeConfig.service
      });
    }

    // Get next available service instance
    const serviceConfig = loadBalancer.getNextService(routeConfig.service);
    if (!serviceConfig) {
      return res.status(503).json({
        error: 'Service Unavailable',
        message: `No healthy instances of ${routeConfig.service} available`,
        service: routeConfig.service
      });
    }

    // Create proxy middleware for this request
    const proxyOptions = getProxyOptions(routeConfig.service);
    proxyOptions.target = serviceConfig.url;

    const proxy = createProxyMiddleware(proxyOptions);
    proxy(req, res, next);
  } catch (error) {
    console.error('Gateway error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Gateway processing error'
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Gateway error:', err);
  
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.path} not found`
  });
});

export default app; 