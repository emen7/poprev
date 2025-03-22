import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  count: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/categories`);
        
        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.statusText}`);
        }
        
        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Urantia Book Categories</h1>
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4">Loading categories...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {categories.map(category => (
                <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{category.count} responses</span>
                    <Link 
                      to={`/responses?category=${category.slug}`}
                      className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
                    >
                      View Responses
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && !error && categories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg">No categories found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
