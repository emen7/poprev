import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Placeholder data (would come from API in real app)
const MOCK_RESPONSES = [
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
]

const Responses = () => {
  const [responses, setResponses] = useState(MOCK_RESPONSES)
  const [loading, setLoading] = useState(false)

  // In a real app, this would fetch from the API
  useEffect(() => {
    // Example API fetch (commented out for now)
    /*
    const fetchResponses = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/responses')
        const data = await response.json()
        setResponses(data)
      } catch (error) {
        console.error('Error fetching responses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResponses()
    */
  }, [])

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
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-3 py-2"
              defaultValue="newest"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <p>Loading responses...</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {responses.map(response => (
              <div 
                key={response.id} 
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Link to={`/responses/${response.id}`} className="block">
                  <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-400 hover:underline">
                    {response.title}
                  </h2>
                </Link>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  {response.question}
                </p>
                <p className="mb-4">
                  {response.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {response.categories.map(category => (
                    <span 
                      key={category} 
                      className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {response.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Added on {formatDate(response.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Responses
