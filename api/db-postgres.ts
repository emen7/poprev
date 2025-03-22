import { createPool, sql } from '@vercel/postgres';

// Create a connection pool to the Postgres database
const pool = createPool({
  // Configuration is automatically pulled from Vercel environment variables
  // when deployed on Vercel
});

// Response model interfaces
export interface Response {
  id: string;
  title: string;
  question: string;
  excerpt: string;
  answer: string;
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

// Database methods for Responses
export const responseDB = {
  // Get all responses
  getAll: async (): Promise<Response[]> => {
    const { rows } = await pool.query(`
      SELECT
        r.id,
        r.title,
        r.question,
        r.excerpt,
        r.answer,
        ARRAY_AGG(DISTINCT c.name) as categories,
        ARRAY_AGG(DISTINCT t.name) as tags,
        r.created_at as "createdAt"
      FROM responses r
      LEFT JOIN response_categories rc ON r.id = rc.response_id
      LEFT JOIN categories c ON rc.category_id = c.id
      LEFT JOIN response_tags rt ON r.id = rt.response_id
      LEFT JOIN tags t ON rt.tag_id = t.id
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `);
    return rows;
  },

  // Get a single response by ID
  getById: async (id: string): Promise<Response | null> => {
    const { rows } = await pool.query(`
      SELECT
        r.id,
        r.title,
        r.question,
        r.excerpt,
        r.answer,
        ARRAY_AGG(DISTINCT c.name) as categories,
        ARRAY_AGG(DISTINCT t.name) as tags,
        r.created_at as "createdAt"
      FROM responses r
      LEFT JOIN response_categories rc ON r.id = rc.response_id
      LEFT JOIN categories c ON rc.category_id = c.id
      LEFT JOIN response_tags rt ON r.id = rt.response_id
      LEFT JOIN tags t ON rt.tag_id = t.id
      WHERE r.id = $1
      GROUP BY r.id
    `, [id]);
    
    return rows.length ? rows[0] : null;
  },

  // Create a new response (simplified for demo)
  create: async (data: Omit<Response, 'id' | 'createdAt'>): Promise<Response> => {
    const { rows } = await pool.query(`
      INSERT INTO responses (title, question, excerpt, answer)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, question, excerpt, answer, created_at as "createdAt"
    `, [data.title, data.question, data.excerpt, data.answer]);
    
    // For simplicity, we're returning the response without categories and tags
    // In a real implementation, you would also insert into the joining tables
    return { 
      ...rows[0],
      categories: data.categories || [],
      tags: data.tags || []
    };
  }
};

// Database methods for Categories
export const categoryDB = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const { rows } = await pool.query(`
      SELECT 
        c.id, 
        c.name, 
        c.description, 
        c.slug,
        COUNT(rc.response_id) as count
      FROM categories c
      LEFT JOIN response_categories rc ON c.id = rc.category_id
      GROUP BY c.id
      ORDER BY c.name
    `);
    return rows;
  },

  // Get a single category by ID
  getById: async (id: string): Promise<Category | null> => {
    const { rows } = await pool.query(`
      SELECT 
        c.id, 
        c.name, 
        c.description, 
        c.slug,
        COUNT(rc.response_id) as count
      FROM categories c
      LEFT JOIN response_categories rc ON c.id = rc.category_id
      WHERE c.id = $1
      GROUP BY c.id
    `, [id]);
    
    return rows.length ? rows[0] : null;
  },

  // Create a new category
  create: async (data: Omit<Category, 'id' | 'count'>): Promise<Category> => {
    const { rows } = await pool.query(`
      INSERT INTO categories (name, description, slug)
      VALUES ($1, $2, $3)
      RETURNING id, name, description, slug
    `, [data.name, data.description, data.slug]);
    
    return { ...rows[0], count: 0 };
  }
};

// Initialize database schema (should be called during setup)
export async function initializeDatabase() {
  try {
    // Create responses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        question TEXT NOT NULL,
        excerpt TEXT,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        slug VARCHAR(100) UNIQUE NOT NULL
      )
    `);

    // Create tags table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      )
    `);

    // Create joining table for responses and categories
    await pool.query(`
      CREATE TABLE IF NOT EXISTS response_categories (
        response_id INTEGER REFERENCES responses(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        PRIMARY KEY (response_id, category_id)
      )
    `);

    // Create joining table for responses and tags
    await pool.query(`
      CREATE TABLE IF NOT EXISTS response_tags (
        response_id INTEGER REFERENCES responses(id) ON DELETE CASCADE,
        tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (response_id, tag_id)
      )
    `);

    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    throw error;
  }
}
