import axios from 'axios';
import { ServiceConfig, getAllServices } from '../config/proxy';

export interface ServiceHealth {
  service: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  responseTime: number;
  lastCheck: Date;
  error?: string;
}

export interface ServiceRegistry {
  [serviceName: string]: ServiceHealth;
}

class ServiceDiscovery {
  private registry: ServiceRegistry = {};
  private healthCheckInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeRegistry();
  }

  /**
   * Initialize service registry with all configured services
   */
  private initializeRegistry(): void {
    const services = getAllServices();
    services.forEach(service => {
      this.registry[service.name] = {
        service: service.name,
        status: 'unknown',
        responseTime: 0,
        lastCheck: new Date()
      };
    });
  }

  /**
   * Start health check monitoring
   */
  public startHealthChecks(intervalMs: number = 30000): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    this.healthCheckInterval = setInterval(() => {
      this.performHealthChecks();
    }, intervalMs);

    // Perform initial health check
    this.performHealthChecks();
  }

  /**
   * Stop health check monitoring
   */
  public stopHealthChecks(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  /**
   * Perform health checks for all services
   */
  private async performHealthChecks(): Promise<void> {
    const services = getAllServices();
    const healthChecks = services.map(service => this.checkServiceHealth(service));
    
    await Promise.allSettled(healthChecks);
  }

  /**
   * Check health of a specific service
   */
  private async checkServiceHealth(serviceConfig: ServiceConfig): Promise<void> {
    const startTime = Date.now();
    
    try {
      const healthUrl = `${serviceConfig.url}${serviceConfig.healthCheck || '/health'}`;
      const response = await axios.get(healthUrl, {
        timeout: 5000,
        headers: {
          'User-Agent': 'API-Gateway-HealthCheck'
        }
      });

      const responseTime = Date.now() - startTime;
      
      this.registry[serviceConfig.name] = {
        service: serviceConfig.name,
        status: response.status === 200 ? 'healthy' : 'unhealthy',
        responseTime,
        lastCheck: new Date()
      };

      console.log(`Health check for ${serviceConfig.name}: ${this.registry[serviceConfig.name].status} (${responseTime}ms)`);
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      this.registry[serviceConfig.name] = {
        service: serviceConfig.name,
        status: 'unhealthy',
        responseTime,
        lastCheck: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      console.error(`Health check failed for ${serviceConfig.name}:`, error);
    }
  }

  /**
   * Get health status of a specific service
   */
  public getServiceHealth(serviceName: string): ServiceHealth | undefined {
    return this.registry[serviceName];
  }

  /**
   * Get health status of all services
   */
  public getAllServiceHealth(): ServiceHealth[] {
    return Object.values(this.registry);
  }

  /**
   * Check if a service is healthy
   */
  public isServiceHealthy(serviceName: string): boolean {
    const health = this.getServiceHealth(serviceName);
    return health?.status === 'healthy';
  }

  /**
   * Get healthy services only
   */
  public getHealthyServices(): ServiceHealth[] {
    return this.getAllServiceHealth().filter(service => service.status === 'healthy');
  }

  /**
   * Get unhealthy services
   */
  public getUnhealthyServices(): ServiceHealth[] {
    return this.getAllServiceHealth().filter(service => service.status === 'unhealthy');
  }

  /**
   * Manual health check for a specific service
   */
  public async checkServiceHealthManually(serviceName: string): Promise<ServiceHealth | undefined> {
    const serviceConfig = getAllServices().find(s => s.name === serviceName);
    if (!serviceConfig) {
      return undefined;
    }

    await this.checkServiceHealth(serviceConfig);
    return this.getServiceHealth(serviceName);
  }

  /**
   * Get service registry statistics
   */
  public getStats(): {
    total: number;
    healthy: number;
    unhealthy: number;
    unknown: number;
  } {
    const services = this.getAllServiceHealth();
    return {
      total: services.length,
      healthy: services.filter(s => s.status === 'healthy').length,
      unhealthy: services.filter(s => s.status === 'unhealthy').length,
      unknown: services.filter(s => s.status === 'unknown').length
    };
  }
}

// Export singleton instance
export const serviceDiscovery = new ServiceDiscovery(); 