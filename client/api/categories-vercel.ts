import { VercelRequest, VercelResponse } from '@vercel/node';
import { categoryStorage } from './storage-utils.js';

// API handler for categories
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
      // Get a specific category by ID
      if (id) {
        const category = await categoryStorage.getById(id as string);
        
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
        
        return res.status(200).json(category);
      } 
      
      // Get all categories
      const categories = await categoryStorage.getAll();
      return res.status(200).json(categories);
    }
    
    // Handle POST request - Create a new category
    if (req.method === 'POST') {
      const { name, description, slug } = req.body;
      
      if (!name || !slug) {
        return res.status(400).json({ 
          message: 'Missing required fields', 
          required: ['name', 'slug'] 
        });
      }
      
      const newCategory = await categoryStorage.create({ 
        name, 
        description: description || '', 
        slug 
      });
      
      return res.status(201).json(newCategory);
    }
    
    // Handle DELETE request
    if (req.method === 'DELETE' && id) {
      const success = await categoryStorage.delete(id as string);
      
      if (!success) {
        return res.status(404).json({ message: 'Category not found or could not be deleted' });
      }
      
      return res.status(200).json({ message: 'Category deleted successfully' });
    }
    
    // If we reach this point, it means the HTTP method is not supported
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling categories:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'production' ? null : error 
    });
  }
}
