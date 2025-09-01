import 'dotenv/config';
import app from './app';
import { serviceDiscovery } from './services/service-discovery';
import { loadBalancer } from './services/load-balancer';

const PORT = process.env.PORT || 8080;
const HEALTH_CHECK_INTERVAL = parseInt(process.env.HEALTH_CHECK_INTERVAL || '30000');

async function startGateway() {
  try {
    // Start service discovery health checks
    serviceDiscovery.startHealthChecks(HEALTH_CHECK_INTERVAL);
    console.log(`Service discovery started with ${HEALTH_CHECK_INTERVAL}ms interval`);

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 API Gateway running on port ${PORT}`);
      console.log(`📊 Health check endpoint: http://localhost:${PORT}/health`);
      console.log(`🔍 Service health endpoint: http://localhost:${PORT}/health/services`);
      console.log(`⚡ Load balancer strategy: ${loadBalancer.getStats().strategy}`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      
      // Stop health checks
      serviceDiscovery.stopHealthChecks();
      console.log('✅ Service discovery stopped');
      
      // Close server
      server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('unhandledRejection');
    });

  } catch (error) {
    console.error('❌ Failed to start API Gateway:', error);
    process.exit(1);
  }
}

// Start the gateway
startGateway(); 