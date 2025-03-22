import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Popular Revelation
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300">
              High-quality responses to questions about the Urantia Book
            </p>
            <Link 
              to="/responses" 
              className="btn btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Responses
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Browse by Topic</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Explore responses organized by categories and topics from the Urantia Book, making it easy to find answers relevant to your interests.
              </p>
              <Link 
                to="/categories" 
                className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center transition-colors hover:text-blue-700 dark:hover:text-blue-300"
              >
                <span>View Categories</span>
                <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <div className="card hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Recent Additions</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Check out the latest responses to questions about Urantia Book teachings, regularly updated with new insights and explanations.
              </p>
              <Link 
                to="/responses?sort=newest" 
                className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center transition-colors hover:text-blue-700 dark:hover:text-blue-300"
              >
                <span>View Latest</span>
                <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <div className="card hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">About the Urantia Book</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Learn more about the Urantia Book and its teachings about God, the universe, and human origin and destiny in cosmic context.
              </p>
              <Link 
                to="/about" 
                className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center transition-colors hover:text-blue-700 dark:hover:text-blue-300"
              >
                <span>Learn More</span>
                <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 dark:bg-blue-900/10 py-14 my-10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Deepen Your Understanding</h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The Urantia Book provides profound insights into the nature of reality, spirituality, and our place in the cosmos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/responses" 
                className="btn btn-primary px-6 py-3"
              >
                Browse Responses
              </Link>
              <Link 
                to="/about" 
                className="btn btn-outline px-6 py-3"
              >
                About the Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
