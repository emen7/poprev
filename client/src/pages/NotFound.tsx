import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="btn btn-primary inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
