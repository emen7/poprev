import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

interface Response {
  id: string;
  title: string;
  question: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  createdAt: string;
}

const Responses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get filter params from URL
  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');
  const sort = searchParams.get('sort') || 'newest';
  
  // Set up sorting options
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use the actual API when deployed
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/responses`);
        
        if (!response.ok) {
          throw new Error(`Error fetching responses: ${response.statusText}`);
        }
        
        let data = await response.json();
        
        // Apply category filter if present
        if (categoryFilter) {
          data = data.filter((item: Response) => 
            item.categories.some((cat: string) => 
              cat.toLowerCase() === categoryFilter.toLowerCase()
            )
          );
        }
        
        // Apply tag filter if present
        if (tagFilter) {
          data = data.filter((item: Response) => 
            item.tags.some((tag: string) => 
              tag.toLowerCase() === tagFilter.toLowerCase()
            )
          );
        }
        
        // Apply sorting
        data = sortResponses(data, sort);
        
        setResponses(data);
      } catch (err) {
        console.error('Failed to fetch responses:', err);
        setError('Failed to load responses. Using sample data instead.');
        
        // Fall back to mock data
        let mockData = MOCK_RESPONSES;
        
        // Apply filters to mock data too
        if (categoryFilter) {
          mockData = mockData.filter(item => 
            item.categories.some(cat => 
              cat.toLowerCase() === categoryFilter.toLowerCase()
            )
          );
        }
        
        if (tagFilter) {
          mockData = mockData.filter(item => 
            item.tags.some(tag => 
              tag.toLowerCase() === tagFilter.toLowerCase()
            )
          );
        }
        
        // Apply sorting
        mockData = sortResponses(mockData, sort);
        
        setResponses(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [categoryFilter, tagFilter, sort]);
  
  // Sorting function
  const sortResponses = (data: Response[], sortType: string) => {
    return [...data].sort((a, b) => {
      switch (sortType) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  };
  
  // Mock data as fallback
  const MOCK_RESPONSES: Response[] = [
    {
      id: '1',
      title: 'Why is God described as a Trinity?',
      question: 'I\'ve heard that God is described as a Trinity in the Urantia Book. Can you explain this concept?',
      excerpt: 'The Urantia Book describes God as the Trinity of Trinities, consisting of the Universal Father, Eternal Son, and Infinite Spirit...',
      categories: ['Deity', 'Cosmology'],
      tags: ['God', 'Trinity', 'Paradise', 'First Source and Center'],
      createdAt: '2023-04-15T14:48:00.000Z'
    },
    {
      id: '2',
      title: 'What are the Mansion Worlds?',
      question: 'The Urantia Book mentions Mansion Worlds. What are they and what happens there?',
      excerpt: 'The Mansion Worlds are the seven transitional worlds where ascending mortals continue their spiritual progression after physical death...',
      categories: ['Afterlife', 'Spiritual Progression'],
      tags: ['Mansion Worlds', 'Morontia', 'Ascension'],
      createdAt: '2023-05-20T09:22:00.000Z'
    },
    {
      id: '3',
      title: 'What is the relationship between Jesus and Michael of Nebadon?',
      question: 'Can you explain the relationship between Jesus Christ and Michael of Nebadon as described in the Urantia Book?',
      excerpt: 'According to the Urantia Book, Jesus of Nazareth was the human incarnation of Michael of Nebadon, a Creator Son of God...',
      categories: ['Jesus', 'Cosmology'],
      tags: ['Michael of Nebadon', 'Incarnation', 'Creator Son'],
      createdAt: '2023-06-12T16:35:00.000Z'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Responses</h1>
          <div className="flex space-x-4">
            <select 
              className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="grid gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                <div className="flex gap-2 mb-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-14"></div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8">
            {responses.length === 0 ? (
              <div className="card text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">No responses found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {categoryFilter || tagFilter ? 
                    `Try removing filters or searching for a different topic.` : 
                    `Check back later for new responses.`}
                </p>
                {(categoryFilter || tagFilter) && (
                  <button 
                    onClick={() => setSearchParams({})}
                    className="mt-4 btn btn-outline"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              responses.map(response => (
                <div 
                  key={response.id} 
                  className="card hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <Link to={`/responses/${response.id}`} className="block">
                    <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      {response.title}
                    </h2>
                  </Link>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    {response.question}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {response.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {response.categories.map(category => (
                      <Link
                        key={category}
                        to={`/responses?category=${encodeURIComponent(category.toLowerCase())}`}
                        className="badge badge-blue hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {response.tags.map(tag => (
                      <Link
                        key={tag}
                        to={`/responses?tag=${encodeURIComponent(tag.toLowerCase())}`}
                        className="badge badge-gray hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Added on {formatDate(response.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Responses
