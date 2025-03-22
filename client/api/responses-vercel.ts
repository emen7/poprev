import { VercelRequest, VercelResponse } from '@vercel/node';
import { responseStorage } from './storage-utils';

// API handler for responses
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
        const response = await responseStorage.getById(id as string);
        
        if (!response) {
          return res.status(404).json({ message: 'Response not found' });
        }
        
        // If there's a content query parameter, also fetch the full content
        if (req.query.content === 'true' && response.contentBlobUrl) {
          const content = await responseStorage.getContent(response.contentBlobUrl);
          return res.status(200).json({ ...response, content });
        }
        
        return res.status(200).json(response);
      } 
      
      // Get all responses
      const responses = await responseStorage.getAll();
      return res.status(200).json(responses);
    }
    
    // Handle POST request - Create a new response
    if (req.method === 'POST') {
      const { content, ...responseData } = req.body;
      
      if (!content || !responseData.title || !responseData.question) {
        return res.status(400).json({ 
          message: 'Missing required fields', 
          required: ['title', 'question', 'content'] 
        });
      }
      
      const newResponse = await responseStorage.create(responseData, content);
      return res.status(201).json(newResponse);
    }
    
    // Handle DELETE request
    if (req.method === 'DELETE' && id) {
      const success = await responseStorage.delete(id as string);
      
      if (!success) {
        return res.status(404).json({ message: 'Response not found or could not be deleted' });
      }
      
      return res.status(200).json({ message: 'Response deleted successfully' });
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
