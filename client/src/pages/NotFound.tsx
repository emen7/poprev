import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NotFound = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    // Trigger animation after component mounts
    setMounted(true)
  }, [])
  
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="container">
        <div className="max-w-lg mx-auto text-center card overflow-hidden">
          {/* Animated SVG */}
          <div className={`transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <svg className="h-64 w-64 mx-auto mb-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L4.929 4.929M12.001 12l7.071 7.071" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                className="text-blue-400 dark:text-blue-300"
              />
              <path 
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-blue-600 dark:text-blue-400"
              />
            </svg>
          </div>
          
          {/* Text content with staggered animation */}
          <div className={`transform transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-6">404</h1>
            <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Page Not Found</h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
              The page you are looking for doesn't exist or has been moved to another location.
            </p>
          </div>
          
          {/* Buttons with staggered animation */}
          <div className={`transform transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/" 
                className="btn btn-primary inline-flex items-center px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Home
              </Link>
              <Link 
                to="/responses" 
                className="btn btn-outline inline-flex items-center px-6 py-3"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Browse Responses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
