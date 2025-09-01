import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import articleRoutes from './routes/article.routes.js';
import searchRoutes from './routes/search.routes.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connection check middleware
app.use((req, res, next) => {
  const connectionState = mongoose.connection.readyState;
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('MongoDB connection state:', connectionState);
  
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (connectionState !== 1) {
    console.error('⚠️ MongoDB not connected, state:', connectionState);
    return res.status(503).json({ 
      error: 'Database connection not available',
      connectionState: connectionState,
      timestamp: new Date().toISOString()
    });
  }
  
  next();
});

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/search', searchRoutes);

// Health check with detailed status
app.get('/health', (_req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: {
      state: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name
    }
  };
  res.json(health);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Knowledge Service',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      articles: '/api/articles',
      search: '/api/search'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

export default app;