import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import articleRoutes from './routes/article.routes';
import searchRoutes from './routes/search.routes';
import { errorHandlerMiddleware } from '../../../shared/src/middlewares/error.middleware';

const app = express();

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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Error handler
app.use(errorHandlerMiddleware);

export default app;