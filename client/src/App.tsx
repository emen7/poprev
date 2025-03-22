import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Categories from './pages/Categories'
import Responses from './pages/Responses'
import ResponseDetail from './pages/ResponseDetail'
import NotFound from './pages/NotFound'

// Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/responses" element={<Responses />} />
              <Route path="/responses/:id" element={<ResponseDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App
