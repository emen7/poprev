import { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeStorage } from './storage-utils.js';

// This is a utility endpoint to initialize our mock/Vercel storage
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    await initializeStorage();
    return res.status(200).json({ 
      message: 'Storage initialized successfully',
      note: 'In production, this would initialize Vercel Blob and Edge Config data'
    });
  } catch (error) {
    console.error('Error initializing storage:', error);
    return res.status(500).json({ 
      message: 'Failed to initialize storage', 
      error: process.env.NODE_ENV === 'production' ? null : error 
    });
  }
}
