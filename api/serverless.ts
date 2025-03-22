import { VercelRequest, VercelResponse } from '@vercel/node';
import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';

// Import routes
import responseRoutes from '../server/src/routes/responses';
import categoryRoutes from '../server/src/routes/categories';
import authRoutes from '../server/src/routes/auth';

// Environment variables
dotenv.config();

// MongoDB connection management
let cachedDb: typeof mongoose | null = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    
    const db = await mongoose.connect(mongoUri);
    cachedDb = db;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Create serverless handler function for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Connect to database first
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Extract URL from the request
  const url = req.url;
  
  // Route to appropriate handler based on path
  if (url?.startsWith('/api/responses')) {
    return handleRoute(responseRoutes, req, res);
  } else if (url?.startsWith('/api/categories')) {
    return handleRoute(categoryRoutes, req, res);
  } else if (url?.startsWith('/api/auth')) {
    return handleRoute(authRoutes, req, res);
  } else if (url === '/api/health') {
    return res.status(200).json({ status: 'ok' });
  } else {
    return res.status(404).json({ error: 'Not found' });
  }
}

// Helper function to handle routing
function handleRoute(router: any, req: VercelRequest, res: VercelResponse) {
  const app = express();

  // Apply middleware for all requests
  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://poprev-client-b.vercel.app'
  }));
  app.use(express.json());

  // Apply rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false
  });
  app.use(limiter);

  // Mount the router
  app.use('/api', router);

  // Error handling middleware
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'production' ? {} : err
    });
  });

  // Create a mock request and response to pass to the Express app
  return new Promise<void>((resolve) => {
    app(req as any, res as any, () => {
      resolve();
    });
  });
}
