import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

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

type ThemeMode = 'light' | 'dark' | 'system';

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Get stored theme or default to 'dark'
    const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
    return storedTheme || 'dark';
  });

  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', themeMode);
    
    // Apply theme to document
    if (themeMode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      
      // Listen for system preference changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }
  }, [themeMode]);

  /**
   * Simple theme toggle with fallback
   */
  const toggleTheme = () => {
    try {
      // Simpler cycle: dark → light → dark (skip system for reliability)
      const newTheme: ThemeMode = themeMode === 'dark' ? 'light' : 'dark';
      
      // Update state first
      setThemeMode(newTheme);
      
      // Then try to persist to localStorage
      try {
        localStorage.setItem('theme', newTheme);
      } catch (storageError) {
        console.warn('Could not save theme preference:', storageError);
      }
    } catch (error) {
      console.error('Theme toggle failed:', error);
      // Just toggle the dark mode directly as fallback
      setIsDarkMode(!isDarkMode);
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        {/* No flash effect - simplified UI */}
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
          <Header darkMode={isDarkMode} toggleDarkMode={toggleTheme} />
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
