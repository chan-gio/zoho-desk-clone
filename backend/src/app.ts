import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import knowledgeRoutes from './routes/knowledge.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import integrationRoutes from './routes/integration.routes.js';
import roleRoutes from './routes/role.routes.js';
import commentRoutes from './routes/comment.routes.js';
import departmentRoutes from './routes/department.routes.js';
import workflowRoutes from './routes/workflow.routes.js';
import slaRoutes from './routes/sla.routes.js';
import attachmentRoutes from './routes/attachment.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import auditRoutes from './routes/audit.routes.js';
import metricsRoutes from './routes/metrics.routes.js';
import tenantRoutes from './routes/tenant.routes.js';
import columnRoutes from './routes/column.routes.js';
import priorityRoutes from './routes/priority.routes.js';
import statusRoutes from './routes/status.routes.js';

// Import middleware
import { errorHandler } from './middleware/error.middleware.js';
import { authMiddleware } from './middleware/auth.middleware.js';

// Import database connections
import { connectPostgres } from './database/postgres.js';
import { connectMongoDB } from './database/mongodb.js';
import { connectRedis } from './database/redis.js';

// Import workers
import { startWorkers } from './workers/index.js';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3000",
      "http://localhost:3001", 
      "http://localhost:5173",
      "http://localhost:8080",
      "http://localhost:4200",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:8080",
      "http://127.0.0.1:4200"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
  }
});

const PORT = process.env.PORT || 8080;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());

// Cho phép tất cả origin (dev/test)
app.use(cors());

// // Cấu hình CORS chi tiết hơn
// app.use(cors({
//   origin: function (origin, callback) {
//     // Cho phép requests không có origin (mobile apps, Postman, etc.)
//     if (!origin) return callback(null, true);
    
//     const allowedOrigins = [
//       process.env.FRONTEND_URL || "http://localhost:3000",
//       "http://localhost:3000",
//       "http://localhost:3001", 
//       "http://localhost:5173", // Vite default port
//       "http://localhost:8080", // Vue CLI default port
//       "http://localhost:4200", // Angular default port
//       "http://127.0.0.1:3000",
//       "http://127.0.0.1:3001",
//       "http://127.0.0.1:5173",
//       "http://127.0.0.1:8080",
//       "http://127.0.0.1:4200"
//     ];
    
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
    
//     // Trong development, cho phép tất cả localhost
//     if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
//       return callback(null, true);
//     }
    
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
// }));
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', authMiddleware, ticketRoutes);
app.use('/api/knowledge', authMiddleware, knowledgeRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/integrations', authMiddleware, integrationRoutes);

// Additional API Routes
app.use('/api/roles', roleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/slas', slaRoutes);
app.use('/api/attachments', attachmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api', tenantRoutes);
app.use('/api/columns', columnRoutes);
app.use('/api/priorities', priorityRoutes);
app.use('/api/statuses', statusRoutes);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-ticket', (ticketId) => {
    socket.join(`ticket-${ticketId}`);
    console.log(`Client ${socket.id} joined ticket ${ticketId}`);
  });
  
  socket.on('leave-ticket', (ticketId) => {
    socket.leave(`ticket-${ticketId}`);
    console.log(`Client ${socket.id} left ticket ${ticketId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Initialize database connections and start server
async function startServer() {
  try {
    console.log('Starting Zoho Desk Monolith...');
    console.log("Mongo URI:", process.env.MONGO_URI);

    // Connect to databases
    await connectPostgres();
    await connectMongoDB();
    await connectRedis();
    
    // Start background workers
    startWorkers();
    
    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

// Start the server
startServer();

export default app;
