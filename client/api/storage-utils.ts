// Import just what we need - we're only using it for type checking in this version
import { put } from '@vercel/blob';

// Type definitions
export interface Response {
  id: string;
  title: string;
  question: string;
  excerpt: string;
  contentBlobUrl: string; // URL pointing to the Blob storage for answer content
  categories: string[];
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  count: number;
}

// Initialize in-memory storage with mock data
const MOCK_RESPONSES: Response[] = [
  {
    id: '1',
    title: 'Why is God described as a Trinity?',
    question: 'I\'ve heard that God is described as a Trinity in the Urantia Book. Can you explain this concept?',
    excerpt: 'The Urantia Book describes God as the Trinity of Trinities, consisting of the Universal Father, Eternal Son, and Infinite Spirit...',
    contentBlobUrl: '',
    categories: ['Deity', 'Cosmology'],
    tags: ['God', 'Trinity', 'Paradise', 'First Source and Center'],
    createdAt: '2023-04-15T14:48:00.000Z'
  },
  {
    id: '2',
    title: 'What are the Mansion Worlds?',
    question: 'The Urantia Book mentions Mansion Worlds. What are they and what happens there?',
    excerpt: 'The Mansion Worlds are the seven transitional worlds where ascending mortals continue their spiritual progression after physical death...',
    contentBlobUrl: '',
    categories: ['Afterlife', 'Spiritual Progression'],
    tags: ['Mansion Worlds', 'Morontia', 'Ascension'],
    createdAt: '2023-05-20T09:22:00.000Z'
  }
];

const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Deity',
    description: 'Topics related to the nature, attributes, and activities of God and other divine beings.',
    slug: 'deity',
    count: 1
  },
  {
    id: '2',
    name: 'Cosmology',
    description: 'Discussions on universe structure, cosmic evolution, and celestial hierarchies.',
    slug: 'cosmology',
    count: 1
  },
  {
    id: '3',
    name: 'Afterlife',
    description: 'Information about what happens after physical death, including mansion worlds and ascension.',
    slug: 'afterlife',
    count: 1
  },
  {
    id: '4',
    name: 'Spiritual Progression',
    description: 'Concepts related to soul growth, spiritual evolution, and advancement through the universe.',
    slug: 'spiritual-progression',
    count: 1
  }
];

// In-memory data store (would be replaced by actual Vercel storage in production)
let responses = [...MOCK_RESPONSES];
let categories = [...MOCK_CATEGORIES];

// Functions for Response data
export const responseStorage = {
  // Get all responses
  getAll: async (): Promise<Response[]> => {
    return responses;
  },

  // Get a response by ID
  getById: async (id: string): Promise<Response | null> => {
    const response = responses.find(r => r.id === id);
    return response || null;
  },

  // Create a new response
  create: async (data: Omit<Response, 'id' | 'createdAt' | 'contentBlobUrl'>, content: string): Promise<Response> => {
    try {
      // In production, we'd upload to Blob storage
      // For now, just simulate a URL
      const blobUrl = `https://example.com/responses/${Date.now()}.html`;

      // Generate new response object
      const newResponse: Response = {
        id: Date.now().toString(), 
        contentBlobUrl: blobUrl,
        createdAt: new Date().toISOString(),
        ...data,
      };

      // Add to our in-memory array
      responses.push(newResponse);
      
      return newResponse;
    } catch (error) {
      console.error('Error creating response:', error);
      throw error;
    }
  },

  // Get response content (simulated)
  getContent: async (contentBlobUrl: string): Promise<string> => {
    // In production, this would fetch from Blob storage
    const mockContent = `
      <p>This is sample content for a response.</p>
      <p>In a production environment, this would be fetched from Vercel Blob storage.</p>
    `;
    return mockContent;
  },

  // Delete a response
  delete: async (id: string): Promise<boolean> => {
    const initialLength = responses.length;
    responses = responses.filter(r => r.id !== id);
    return responses.length < initialLength;
  }
};

// Functions for Category data
export const categoryStorage = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    return categories;
  },

  // Get a category by ID
  getById: async (id: string): Promise<Category | null> => {
    const category = categories.find(c => c.id === id);
    return category || null;
  },

  // Create a new category
  create: async (data: Omit<Category, 'id' | 'count'>): Promise<Category> => {
    const newCategory: Category = {
      id: Date.now().toString(),
      count: 0,
      ...data,
    };
    
    categories.push(newCategory);
    return newCategory;
  },

  // Delete a category
  delete: async (id: string): Promise<boolean> => {
    const initialLength = categories.length;
    categories = categories.filter(c => c.id !== id);
    return categories.length < initialLength;
  }
};

// Initialize storage with mock data (this would connect to Vercel services in production)
export async function initializeStorage(): Promise<boolean> {
  console.log('Mock storage initialized with sample data');
  return true;
}
