import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

type HeaderProps = {
  darkMode: boolean // Visual state of dark mode
  toggleDarkMode: () => void // Function to toggle theme
}

// Modern, accessible header component
const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  // toggleThemeMenu function removed as it's no longer used
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors"
          >
            Popular Revelation
          </Link>

          {/* Desktop Navigation with Simple, Constrained Icons */}
          <nav className="hidden md:flex space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <span className="text-lg inline-block w-4 h-4 text-center leading-none">🏠</span>
              <span>Home</span>
            </Link>
            <Link 
              to="/responses" 
              className="px-3 py-2 rounded-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <span className="text-lg inline-block w-4 h-4 text-center leading-none">📝</span>
              <span>Responses</span>
            </Link>
            <Link 
              to="/categories" 
              className="px-3 py-2 rounded-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <span className="text-lg inline-block w-4 h-4 text-center leading-none">🏷️</span>
              <span>Categories</span>
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <span className="text-lg inline-block w-4 h-4 text-center leading-none">ℹ️</span>
              <span>About</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Simple Theme Toggle Button */}
            <div className="relative">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors border border-gray-200 dark:border-gray-600"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span className="inline-block text-xl w-5 h-5 text-center leading-none">
                  {darkMode ? '☀️' : '🌙'}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative" ref={menuRef}>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors border border-gray-200 dark:border-gray-600"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                title={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span className="inline-block text-xl w-6 h-6 text-center leading-none">
                  {isMenuOpen ? '✖️' : '☰'}
                </span>
              </button>
              
              {/* Mobile Menu Dropdown with Animation */}
              <div 
                className={`absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border dark:border-gray-700 transform transition-all duration-300 origin-top-right ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                aria-hidden={!isMenuOpen}
              >
                <div className="py-1 border-b border-gray-100 dark:border-gray-700">
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <span className="inline-block text-xl w-5 h-5 text-blue-500 dark:text-blue-400 text-center leading-none">🏠</span>
                    <span>Home</span>
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    to="/responses"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <span className="inline-block text-xl w-5 h-5 text-blue-500 dark:text-blue-400 text-center leading-none">📝</span>
                    <span>Responses</span>
                  </Link>
                  
                  <Link
                    to="/categories"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <span className="inline-block text-xl w-5 h-5 text-blue-500 dark:text-blue-400 text-center leading-none">🏷️</span>
                    <span>Categories</span>
                  </Link>
                  
                  <Link
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <span className="inline-block text-xl w-5 h-5 text-blue-500 dark:text-blue-400 text-center leading-none">ℹ️</span>
                    <span>About</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header
