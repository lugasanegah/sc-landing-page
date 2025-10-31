import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./domains/shared/repositories/storage";
import adminRoutes from "./routes/admin";
import { errorHandler } from "./middleware/errorHandler";

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB (only in production or if explicitly required)
    try {
      const { connectMongoDB } = await import('./db/mongodb');
      await connectMongoDB();
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      // In production, we might want to exit if DB connection fails
      // process.exit(1);
    }

  // if (process.env.NODE_ENV === 'production') {
  //   try {
  //     const { connectMongoDB } = await import('./db/mongodb');
  //     await connectMongoDB();
  //   } catch (error) {
  //     console.error('Failed to connect to MongoDB:', error);
  //     // In production, we might want to exit if DB connection fails
  //     // process.exit(1);
  //   }
  // } else {
  //   console.log('Skipping MongoDB connection in development mode');
  // }

  // Admin routes
  app.use('/api/admin', adminRoutes);
  
  // Demo requests routes (only if database is available)
  if (process.env.DATABASE_URL) {
    try {
      const demoRoutes = await import('./routes/demo');
      app.use('/api/demo-requests', demoRoutes.default);
    } catch (error) {
      console.error('Failed to load demo routes:', error);
    }
  } else {
    console.log('Skipping demo routes - DATABASE_URL not set');
  }
  
  // Public routes
  const publicRoutes = await import('./routes/public');
  app.use('/api', publicRoutes.default);

  // Error handling middleware (should be last)
  app.use(errorHandler);

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
