import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './db';

// Mock categories data for development
const MOCK_CATEGORIES = [
  {
    id: '1',
    name: 'Deity',
    description: 'Topics related to the nature, attributes, and activities of God and other divine beings.',
    slug: 'deity',
    count: 12
  },
  {
    id: '2',
    name: 'Cosmology',
    description: 'Discussions on universe structure, cosmic evolution, and celestial hierarchies.',
    slug: 'cosmology',
    count: 8
  },
  {
    id: '3',
    name: 'Afterlife',
    description: 'Information about what happens after physical death, including mansion worlds and ascension.',
    slug: 'afterlife',
    count: 6
  },
  {
    id: '4',
    name: 'Spiritual Progression',
    description: 'Concepts related to soul growth, spiritual evolution, and advancement through the universe.',
    slug: 'spiritual-progression',
    count: 9
  },
  {
    id: '5',
    name: 'Jesus',
    description: 'Topics about the life, teachings, and significance of Jesus as portrayed in the Urantia Book.',
    slug: 'jesus',
    count: 15
  }
];

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
    // Connect to MongoDB (this will be used in production, but for now we'll use mock data)
    // Uncomment this when ready to connect to a real database
    // await connectToDatabase();
    
    const { id } = req.query;
    
    // Handle GET requests
    if (req.method === 'GET') {
      // Get a specific category by ID
      if (id) {
        const category = MOCK_CATEGORIES.find(c => c.id === id);
        
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
        
        return res.status(200).json(category);
      } 
      
      // Get all categories
      return res.status(200).json(MOCK_CATEGORIES);
    }
    
    // Handle POST request - Create a new category
    if (req.method === 'POST') {
      const newCategory = {
        id: (MOCK_CATEGORIES.length + 1).toString(),
        ...req.body,
        count: 0
      };
      
      // In production, we would save to the database
      // For now, just return the mock response
      return res.status(201).json(newCategory);
    }
    
    // Handle PUT request - Update an existing category
    if (req.method === 'PUT' && id) {
      const categoryIndex = MOCK_CATEGORIES.findIndex(c => c.id === id);
      
      if (categoryIndex === -1) {
        return res.status(404).json({ message: 'Category not found' });
      }
      
      // In production, we would update in the database
      // For now, just return the updated mock category
      const updatedCategory = {
        ...MOCK_CATEGORIES[categoryIndex],
        ...req.body,
      };
      
      return res.status(200).json(updatedCategory);
    }
    
    // Handle DELETE request
    if (req.method === 'DELETE' && id) {
      // In production, we would delete from the database
      return res.status(200).json({ message: 'Category deleted successfully' });
    }
    
    // If we reach this point, it means the HTTP method is not supported
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling categories:', error);
    return res.status(500).json({ message: 'Internal server error', error: process.env.NODE_ENV === 'production' ? null : error });
  }
}
