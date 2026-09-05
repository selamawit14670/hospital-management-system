import type { Request, Response } from 'express';

export const getHealthStatus = (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    system: 'MediCare Hospital Management System',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      api: 'online',
      database: 'ready',
    },
  });
};
