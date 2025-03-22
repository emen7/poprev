import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Popular Revelation
          </h1>
          <p className="text-xl mb-8">
            High-quality responses to questions about the Urantia Book
          </p>
          <Link 
            to="/responses" 
            className="btn btn-primary text-lg px-8 py-3"
          >
            Explore Responses
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Browse by Topic</h2>
            <p className="mb-4">
              Explore responses organized by categories and topics from the Urantia Book.
            </p>
            <Link to="/categories" className="text-blue-600 dark:text-blue-400 hover:underline">
              View Categories &rarr;
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Recent Additions</h2>
            <p className="mb-4">
              Check out the latest responses to questions about Urantia Book teachings.
            </p>
            <Link to="/responses?sort=newest" className="text-blue-600 dark:text-blue-400 hover:underline">
              View Latest &rarr;
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">About the Urantia Book</h2>
            <p className="mb-4">
              Learn more about the Urantia Book and its teachings about God, universe, and human origin.
            </p>
            <Link to="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
