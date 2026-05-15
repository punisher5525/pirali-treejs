export class ServiceLocator {
  private readonly services = new Map<string, unknown>();

  register<T>(key: string, service: T): void {
    if (this.services.has(key)) {
      throw new Error(`Service already registered: ${key}`);
    }
    this.services.set(key, service);
  }

  resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not registered: ${key}`);
    }
    return service as T;
  }
}
