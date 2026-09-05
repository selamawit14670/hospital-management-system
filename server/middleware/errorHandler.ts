import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('[MediCare Server Error]:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Hospital System Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
