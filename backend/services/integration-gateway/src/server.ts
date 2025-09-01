import app from './app.js';
import { startGrpcServer } from './grpc/integration.grpc.js';

const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    // Start gRPC server
    await startGrpcServer();
    console.log('✅ gRPC server started successfully');

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`🚀 Integration Gateway server running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer(); 