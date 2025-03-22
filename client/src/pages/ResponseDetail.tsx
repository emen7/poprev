import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

// Response interface
interface Reference {
  paper: number;
  section: number;
  paragraph: number;
  quote: string;
}

interface ResponseDetail {
  id: string;
  title: string;
  question: string;
  answer: string;
  content?: string; // For when fetching with content param
  references: Reference[];
  categories: string[];
  tags: string[];
  createdAt: string;
}

// Placeholder data as fallback
const MOCK_RESPONSE: ResponseDetail = {
  id: '1',
  title: 'Why is God described as a Trinity?',
  question: 'I\'ve heard that God is described as a Trinity in the Urantia Book. Can you explain this concept?',
  answer: `
    <p>The Urantia Book presents a detailed and nuanced view of God as a Trinity. This concept is fundamental to understanding the nature of Deity as presented in the text.</p>
    
    <p>In the Urantia Book, the Paradise Trinity consists of three persons:</p>
    
    <ol>
      <li><strong>The Universal Father</strong> - The First Source and Center, the original personality and the source of all things and beings.</li>
      <li><strong>The Eternal Son</strong> - The Second Source and Center, the spiritual center of Paradise and the universe, the perfect expression of the divine nature.</li>
      <li><strong>The Infinite Spirit</strong> - The Third Source and Center, the universal administrator, the source of mind, and the executive of the combined will of the Father and Son.</li>
    </ol>
    
    <p>Paper 10, Section 0, Paragraph 1 states: "The Paradise Trinity of eternal Deities facilitates the Father's escape from personality absolutism. The Trinity perfectly associates the limitless expression of God's infinite personal will with the absoluteness of Deity."</p>
    
    <p>This Trinity is not simply three different manifestations of the same being (as some might interpret the Christian Trinity), but rather three distinct personalities who are perfectly unified in purpose, action, and will. They function as one while maintaining their distinct identities and roles.</p>
    
    <p>The Trinity concept extends beyond these three personalities to encompass various Trinity associations, including what the book calls the "Trinity of Trinities." This complex structure of Deity relationships helps explain how God can be both personal and infinite, both one and many.</p>
  `,
  references: [
    { paper: 10, section: 0, paragraph: 1, quote: "The Paradise Trinity of eternal Deities facilitates the Father's escape from personality absolutism." },
    { paper: 10, section: 1, paragraph: 4, quote: "The Eternal Son is the perfect and final expression of the 'first' personal and absolute concept of the Universal Father." },
    { paper: 8, section: 2, paragraph: 3, quote: "The Infinite Spirit is the conjoint representative of the Father-Son partnership." }
  ],
  categories: ['Deity', 'Cosmology'],
  tags: ['God', 'Trinity', 'Paradise', 'First Source and Center'],
  createdAt: '2023-04-15T14:48:00.000Z'
};

const ResponseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [response, setResponse] = useState<ResponseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      if (!id) {
        navigate('/responses');
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Use the actual API when deployed
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const result = await fetch(`${apiUrl}/responses/${id}?content=true`);
        
        if (!result.ok) {
          throw new Error(`Error fetching response: ${result.statusText}`);
        }
        
        const data = await result.json();
        setResponse(data);
      } catch (err) {
        console.error('Failed to fetch response:', err);
        setError('Failed to load response. Using sample data instead.');
        
        // Fall back to mock data
        setResponse(MOCK_RESPONSE);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link to="/responses" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
              &larr; Back to all responses
            </Link>
            
            <div className="card animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-8"></div>
              
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
              </div>
              
              <div className="flex gap-2 mb-6">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link to="/responses" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
              &larr; Back to all responses
            </Link>
            
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
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
          </div>
        </div>
      </div>
    );
  }
  
  if (!response) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link to="/responses" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
              &larr; Back to all responses
            </Link>
            
            <div className="card text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium">Response not found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                The response you're looking for could not be loaded.
              </p>
              <Link to="/responses" className="mt-6 btn btn-primary">
                Browse All Responses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/responses" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6 group"
          >
            <svg className="h-5 w-5 mr-2 transform transition-transform group-hover:translate-x-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all responses
          </Link>
          
          <div className="card mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{response.title}</h1>
            
            <div className="text-lg italic text-gray-700 dark:text-gray-300 mb-8 border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2">
              {response.question}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
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

            <div className="flex flex-wrap gap-2 mb-6">
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
            
            <div className="prose dark:prose-invert prose-lg max-w-none mb-8 prose-headings:text-blue-700 dark:prose-headings:text-blue-400 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: response.answer }}
            />
          </div>
          
          <div className="card bg-blue-50 dark:bg-blue-900/10 mb-8 border-t-4 border-blue-500 dark:border-blue-400">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Urantia Book References
            </h2>
            <div className="space-y-4">
              {response.references.map((ref, index) => (
                <div key={index} className="border-b border-blue-100 dark:border-blue-900/30 pb-4 last:border-b-0 last:pb-0">
                  <div className="font-medium text-blue-800 dark:text-blue-300">
                    Paper {ref.paper}, Section {ref.section}, Paragraph {ref.paragraph}
                  </div>
                  <blockquote className="mt-1 italic pl-4 border-l-4 border-blue-200 dark:border-blue-800/50 text-gray-700 dark:text-gray-300">
                    "{ref.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Added on {formatDate(response.createdAt)}</span>
            </div>
            <button 
              className="btn btn-outline flex items-center gap-2"
              title="Download as PDF"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponseDetail
