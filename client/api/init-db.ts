import { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeDatabase } from './db-postgres';

// This is a utility endpoint that can be called to initialize the database schema
// In a production app, you might want to protect this with admin authentication
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    await initializeDatabase();
    return res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    return res.status(500).json({ 
      message: 'Failed to initialize database', 
      error: process.env.NODE_ENV === 'production' ? null : error 
    });
  }
}
