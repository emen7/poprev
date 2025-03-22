import mongoose from 'mongoose';

// Cached connection for MongoDB
let cachedConnection: typeof mongoose | null = null;

/**
 * Connect to MongoDB with connection caching for serverless environment
 */
export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  // If no cached connection exists, create a new connection
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    
    const connection = await mongoose.connect(mongoUri);
    cachedConnection = connection;
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
