import { ServiceConfig, getAllServices } from '../config/proxy';
import { serviceDiscovery } from './service-discovery';

export interface LoadBalancerOptions {
  strategy: 'round-robin' | 'health-based' | 'random';
  healthCheckEnabled: boolean;
}

export class LoadBalancer {
  private currentIndex: Map<string, number> = new Map();
  private options: LoadBalancerOptions;

  constructor(options: LoadBalancerOptions = {
    strategy: 'health-based',
    healthCheckEnabled: true
  }) {
    this.options = options;
  }

  /**
   * Get next available service instance
   */
  public getNextService(serviceName: string): ServiceConfig | null {
    const services = this.getAvailableServices(serviceName);
    
    if (services.length === 0) {
      return null;
    }

    switch (this.options.strategy) {
      case 'round-robin':
        return this.roundRobin(services, serviceName);
      case 'health-based':
        return this.healthBased(services);
      case 'random':
        return this.random(services);
      default:
        return this.healthBased(services);
    }
  }

  /**
   * Get all available services for a given service name
   */
  private getAvailableServices(serviceName: string): ServiceConfig[] {
    const allServices = getAllServices();
    const services = allServices.filter(service => service.name === serviceName);

    if (!this.options.healthCheckEnabled) {
      return services;
    }

    // Filter by health status
    return services.filter(service => 
      serviceDiscovery.isServiceHealthy(service.name)
    );
  }

  /**
   * Round-robin load balancing strategy
   */
  private roundRobin(services: ServiceConfig[], serviceName: string): ServiceConfig {
    const currentIndex = this.currentIndex.get(serviceName) || 0;
    const nextIndex = (currentIndex + 1) % services.length;
    this.currentIndex.set(serviceName, nextIndex);
    
    return services[nextIndex];
  }

  /**
   * Health-based load balancing strategy
   * Prefers services with better health status and response times
   */
  private healthBased(services: ServiceConfig[]): ServiceConfig {
    if (services.length === 0) {
      throw new Error('No healthy services available');
    }

    // Get health information for all services
    const servicesWithHealth = services.map(service => ({
      service,
      health: serviceDiscovery.getServiceHealth(service.name)
    })).filter(item => item.health);

    // Sort by health status and response time
    servicesWithHealth.sort((a, b) => {
      if (!a.health || !b.health) return 0;
      
      // Prefer healthy services
      if (a.health.status === 'healthy' && b.health.status !== 'healthy') return -1;
      if (a.health.status !== 'healthy' && b.health.status === 'healthy') return 1;
      
      // If both healthy, prefer faster response time
      if (a.health.status === 'healthy' && b.health.status === 'healthy') {
        return a.health.responseTime - b.health.responseTime;
      }
      
      return 0;
    });

    return servicesWithHealth[0]?.service || services[0];
  }

  /**
   * Random load balancing strategy
   */
  private random(services: ServiceConfig[]): ServiceConfig {
    const randomIndex = Math.floor(Math.random() * services.length);
    return services[randomIndex];
  }

  /**
   * Get service with fallback strategy
   */
  public getServiceWithFallback(serviceName: string): ServiceConfig | null {
    // Try health-based first
    const healthBasedService = this.getNextService(serviceName);
    if (healthBasedService) {
      return healthBasedService;
    }

    // Fallback to any available service (even unhealthy)
    const allServices = getAllServices();
    const services = allServices.filter(service => service.name === serviceName);
    
    if (services.length === 0) {
      return null;
    }

    // Use round-robin for fallback
    return this.roundRobin(services, serviceName);
  }

  /**
   * Get multiple healthy services for a given service name
   */
  public getHealthyServices(serviceName: string): ServiceConfig[] {
    const allServices = getAllServices();
    return allServices.filter(service => 
      service.name === serviceName && 
      serviceDiscovery.isServiceHealthy(service.name)
    );
  }

  /**
   * Check if service is available
   */
  public isServiceAvailable(serviceName: string): boolean {
    const availableServices = this.getAvailableServices(serviceName);
    return availableServices.length > 0;
  }

  /**
   * Get load balancer statistics
   */
  public getStats(): {
    strategy: string;
    healthCheckEnabled: boolean;
    serviceCounts: Record<string, number>;
  } {
    const allServices = getAllServices();
    const serviceCounts: Record<string, number> = {};

    allServices.forEach(service => {
      const availableCount = this.getAvailableServices(service.name).length;
      const totalCount = allServices.filter(s => s.name === service.name).length;
      serviceCounts[service.name] = availableCount;
    });

    return {
      strategy: this.options.strategy,
      healthCheckEnabled: this.options.healthCheckEnabled,
      serviceCounts
    };
  }

  /**
   * Update load balancer options
   */
  public updateOptions(options: Partial<LoadBalancerOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Reset round-robin counters
   */
  public resetCounters(): void {
    this.currentIndex.clear();
  }
}

// Export singleton instance
export const loadBalancer = new LoadBalancer(); 