import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/routes';
import { requestLogger } from './server/middleware/logger';
import { errorHandler } from './server/middleware/errorHandler';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(requestLogger);

  // Mount API routes
  app.use('/api', apiRouter);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'MediCare Hospital Management System',
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error Handler Middleware
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MediCare Hospital System running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
