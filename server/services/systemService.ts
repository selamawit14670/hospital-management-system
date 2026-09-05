export class SystemService {
  static getSystemMetrics() {
    return {
      uptimeSeconds: process.uptime(),
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version,
    };
  }
}
