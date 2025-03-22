const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50">
              About The Urantia Book
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A unique integration of science, philosophy, and religion that offers profound insights into the nature of reality.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="card mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Overview</h2>
              </div>
              
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p>
                  The Urantia Book, first published by the Urantia Foundation in 1955, is a spiritual, philosophical, and religious book that originated in Chicago sometime between 1924 and 1955. The authorship remains a matter of speculation, but the book purports to have been presented by celestial beings as a revelation to our world (Urantia).
                </p>
                
                <p>
                  The book offers a unique integration of science, philosophy, and religion. It contains nearly 2,000 pages divided into 196 "papers" that are grouped into four parts:
                </p>
              </div>
            </div>
            
            {/* Book Parts */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="card transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-8 w-8 flex items-center justify-center rounded-full mr-3 text-blue-600 dark:text-blue-400 font-bold">
                    I
                  </div>
                  <h3 className="text-xl font-semibold">The Central and Superuniverses</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Addresses the nature of God, the structure of the universe, and the hierarchy of celestial beings. Details the Paradise Trinity and the organization of the grand universe.
                </p>
              </div>
              
              <div className="card transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-8 w-8 flex items-center justify-center rounded-full mr-3 text-blue-600 dark:text-blue-400 font-bold">
                    II
                  </div>
                  <h3 className="text-xl font-semibold">The Local Universe</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Describes our local region of the cosmos and its administration. Explores the creation and evolution of our part of the universe under the sovereignty of Christ Michael.
                </p>
              </div>
              
              <div className="card transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-8 w-8 flex items-center justify-center rounded-full mr-3 text-blue-600 dark:text-blue-400 font-bold">
                    III
                  </div>
                  <h3 className="text-xl font-semibold">The History of Urantia</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Covers the history of Earth, including geological, biological, and cultural evolution. Presents an alternative view of human development and the progression of civilization.
                </p>
              </div>
              
              <div className="card transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-8 w-8 flex items-center justify-center rounded-full mr-3 text-blue-600 dark:text-blue-400 font-bold">
                    IV
                  </div>
                  <h3 className="text-xl font-semibold">The Life and Teachings of Jesus</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Presents a detailed account of the life of Jesus, far beyond what is found in the Bible. Covers his entire life from birth to death, including the "missing years" not documented in scripture.
                </p>
              </div>
            </div>
            
            {/* About Popular Revelation */}
            <div className="card bg-blue-50 dark:bg-blue-900/10 mb-8 border-t-4 border-blue-500 dark:border-blue-400">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">About Popular Revelation</h2>
              </div>
              
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p>
                  Popular Revelation is a platform dedicated to providing high-quality responses to questions about the Urantia Book. Our goal is to make the teachings of the Urantia Book more accessible to both newcomers and longtime readers.
                </p>
                
                <p>
                  Each response on our platform is carefully crafted to address specific questions about the Urantia Book's teachings, with proper citations and references to the relevant papers and sections.
                </p>
                
                <p>
                  We strive to present the information in a clear, concise, and accessible manner, while remaining faithful to the original text and its profound spiritual and philosophical concepts.
                </p>
              </div>
            </div>
            
            {/* External Resources */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">External Resources</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://www.urantia.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline inline-flex items-center"
                >
                  Urantia Foundation
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a 
                  href="https://www.urantia.org/urantia-book/read-urantia-book-online" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline inline-flex items-center"
                >
                  Read Online
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
