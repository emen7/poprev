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

          {/* Desktop Navigation with Enhanced Styling */}
          <nav className="hidden md:flex space-x-2">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center space-x-1"
            >
              <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            <Link 
              to="/responses" 
              className="px-3 py-2 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center space-x-1"
            >
              <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Responses</span>
            </Link>
            <Link 
              to="/categories" 
              className="px-3 py-2 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center space-x-1"
            >
              <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>Categories</span>
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center space-x-1"
            >
              <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>About</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button with Animation */}
            <div className="relative" aria-live="polite">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow transform hover:scale-105 active:scale-95"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="relative w-5 h-5 overflow-hidden">
                  {/* Sun icon */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`absolute inset-0 h-5 w-5 transform transition-transform duration-500 ease-in-out ${darkMode ? 'rotate-90 translate-y-10 opacity-0' : 'rotate-0 translate-y-0 opacity-100'}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  
                  {/* Moon icon */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`absolute inset-0 h-5 w-5 transform transition-transform duration-500 ease-in-out ${darkMode ? 'rotate-0 translate-y-0 opacity-100' : '-rotate-90 -translate-y-10 opacity-0'}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative" ref={menuRef}>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow transform hover:scale-105 active:scale-95"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                title={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="relative w-6 h-6 overflow-hidden">
                  {/* Menu icon (hamburger) */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`absolute h-6 w-6 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  </svg>
                  
                  {/* Close icon (X) */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`absolute h-6 w-6 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </div>
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
                    className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home</span>
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    to="/responses"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Responses</span>
                  </Link>
                  
                  <Link
                    to="/categories"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Categories</span>
                  </Link>
                  
                  <Link
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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
