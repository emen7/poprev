import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './db';

// Mock responses data for development
const MOCK_RESPONSES = [
  {
    id: '1',
    title: 'Why is God described as a Trinity?',
    question: 'I\'ve heard that God is described as a Trinity in the Urantia Book. Can you explain this concept?',
    excerpt: 'The Urantia Book describes God as the Trinity of Trinities, consisting of the Universal Father, Eternal Son, and Infinite Spirit...',
    answer: `
      <p>The Urantia Book presents a detailed and nuanced view of God as a Trinity. This concept is fundamental to understanding the nature of Deity as presented in the text.</p>
      
      <p>In the Urantia Book, the Paradise Trinity consists of three persons:</p>
      
      <ol>
        <li><strong>The Universal Father</strong> - The First Source and Center, the original personality and the source of all things and beings.</li>
        <li><strong>The Eternal Son</strong> - The Second Source and Center, the spiritual center of Paradise and the universe, the perfect expression of the divine nature.</li>
        <li><strong>The Infinite Spirit</strong> - The Third Source and Center, the universal administrator, the source of mind, and the executive of the combined will of the Father and Son.</li>
      </ol>
      
      <p>Paper 10, Section 0, Paragraph 1 states: "The Paradise Trinity of eternal Deities facilitates the Father's escape from personality absolutism. The Trinity perfectly associates the limitless expression of God's infinite personal will with the absoluteness of Deity."</p>
    `,
    categories: ['Deity', 'Cosmology'],
    tags: ['God', 'Trinity', 'Paradise', 'First Source and Center'],
    createdAt: '2023-04-15T14:48:00.000Z'
  },
  {
    id: '2',
    title: 'What are the Mansion Worlds?',
    question: 'The Urantia Book mentions Mansion Worlds. What are they and what happens there?',
    excerpt: 'The Mansion Worlds are the seven transitional worlds where ascending mortals continue their spiritual progression after physical death...',
    answer: `
      <p>The Mansion Worlds are a series of seven transitional worlds described in the Urantia Book where human souls go after physical death to continue their spiritual progression. These worlds serve as training spheres for ascending mortals.</p>
      
      <p>On these worlds, you gradually shed your material nature and develop your morontia (soul) form, which is an intermediate state between the material and spiritual. Each mansion world has specific training and development goals.</p>
    `,
    categories: ['Afterlife', 'Spiritual Progression'],
    tags: ['Mansion Worlds', 'Morontia', 'Ascension'],
    createdAt: '2023-05-20T09:22:00.000Z'
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
      // Get a specific response by ID
      if (id) {
        const response = MOCK_RESPONSES.find(r => r.id === id);
        
        if (!response) {
          return res.status(404).json({ message: 'Response not found' });
        }
        
        return res.status(200).json(response);
      } 
      
      // Get all responses
      return res.status(200).json(MOCK_RESPONSES);
    }
    
    // Handle POST request - Create a new response
    if (req.method === 'POST') {
      const newResponse = {
        id: (MOCK_RESPONSES.length + 1).toString(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      
      // In production, we would save to the database
      // For now, just return the mock response
      return res.status(201).json(newResponse);
    }
    
    // Handle PUT request - Update an existing response
    if (req.method === 'PUT' && id) {
      const responseIndex = MOCK_RESPONSES.findIndex(r => r.id === id);
      
      if (responseIndex === -1) {
        return res.status(404).json({ message: 'Response not found' });
      }
      
      // In production, we would update in the database
      // For now, just return the updated mock response
      const updatedResponse = {
        ...MOCK_RESPONSES[responseIndex],
        ...req.body,
      };
      
      return res.status(200).json(updatedResponse);
    }
    
    // Handle DELETE request
    if (req.method === 'DELETE' && id) {
      // In production, we would delete from the database
      return res.status(200).json({ message: 'Response deleted successfully' });
    }
    
    // If we reach this point, it means the HTTP method is not supported
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling responses:', error);
    return res.status(500).json({ message: 'Internal server error', error: process.env.NODE_ENV === 'production' ? null : error });
  }
}
