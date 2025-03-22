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

  // Visual feedback ref for theme change
  const [themeTransition, setThemeTransition] = useState(false);
  
  /**
   * Toggle between theme modes with enhanced error handling
   * and visual feedback when changing themes
   */
  const toggleTheme = () => {
    try {
      // Cycle through themes: light → dark → system → light
      let newTheme: ThemeMode = 'dark';
      if (themeMode === 'light') newTheme = 'dark';
      else if (themeMode === 'dark') newTheme = 'system';
      else newTheme = 'light';
      
      // Provide visual feedback when theme changes
      setThemeTransition(true);
      setTimeout(() => setThemeTransition(false), 400);
      
      // Update localStorage and state
      try {
        localStorage.setItem('theme', newTheme);
      } catch (storageError) {
        // Silent fail if localStorage is not available
        console.warn('Could not save theme preference:', storageError);
      }
      
      setThemeMode(newTheme);
    } catch (error) {
      console.error('Failed to update theme:', error);
      // Fallback to dark theme if something goes wrong
      setThemeMode('dark');
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        {/* Theme transition flash effect */}
        {themeTransition && (
          <div 
            className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-30 z-[100] pointer-events-none"
            style={{ animation: 'theme-flash 0.4s ease-out forwards' }}
          />
        )}
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
