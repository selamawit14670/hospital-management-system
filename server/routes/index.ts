import { Router } from 'express';
import { healthRouter } from './healthRoutes';
import authRoutes from './authRoutes';

export const apiRouter = Router();

// Mount sub-routers
apiRouter.use(healthRouter);
apiRouter.use('/auth', authRoutes);
