import { VercelRequest, VercelResponse } from '@vercel/node';
import { responseDB, Response } from './db-postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id } = req.query;
    
    // Handle GET requests
    if (req.method === 'GET') {
      // Get a specific response by ID
      if (id) {
        const response = await responseDB.getById(id as string);
        
        if (!response) {
          return res.status(404).json({ message: 'Response not found' });
        }
        
        return res.status(200).json(response);
      } 
      
      // Get all responses
      const responses = await responseDB.getAll();
      return res.status(200).json(responses);
    }
    
    // Handle POST request - Create a new response
    if (req.method === 'POST') {
      const responseData = req.body as Omit<Response, 'id' | 'createdAt'>;
      const newResponse = await responseDB.create(responseData);
      return res.status(201).json(newResponse);
    }
    
    // If we reach this point, it means the HTTP method is not supported
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling responses:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'production' ? null : error 
    });
  }
}
