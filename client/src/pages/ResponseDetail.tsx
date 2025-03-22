import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// Placeholder data (would come from API in real app)
const MOCK_RESPONSE = {
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
}

const ResponseDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [response] = useState(MOCK_RESPONSE)
  const [loading] = useState(false)

  useEffect(() => {
    // This would fetch from API in real app
    /*
    const fetchResponse = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/responses/${id}`)
        const data = await response.json()
        setResponse(data)
      } catch (error) {
        console.error('Error fetching response:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchResponse()
    }
    */
  }, [id])

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
          <div className="flex justify-center py-12">
            <p>Loading response...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Link to="/responses" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
            &larr; Back to all responses
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{response.title}</h1>
          
          <div className="text-lg italic text-gray-700 dark:text-gray-300 mb-8">
            {response.question}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {response.categories.map(category => (
              <span
                key={category}
                className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {response.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="prose dark:prose-invert prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: response.answer }}
          />
          
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Urantia Book References</h2>
            <div className="space-y-4">
              {response.references.map((ref, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="font-medium">
                    Paper {ref.paper}, Section {ref.section}, Paragraph {ref.paragraph}
                  </div>
                  <blockquote className="mt-1 italic pl-4 border-l-4 border-gray-300 dark:border-gray-600">
                    "{ref.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Added on {formatDate(response.createdAt)}
            </div>
            <button 
              className="btn btn-secondary flex items-center gap-2"
              title="Download as PDF"
            >
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponseDetail
