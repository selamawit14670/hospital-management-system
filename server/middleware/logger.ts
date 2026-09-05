import type { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.path.startsWith('/@') && !req.path.includes('.')) {
      console.log(`[MediCare API] ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
};
