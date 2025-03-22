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
              <svg className="w-4 h-4 min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3M19 10v10a1 1 0 01-1 1h-3" />
              </svg>
              <span>Home</span>
            </Link>
            <Link 
              to="/responses" 
              className="px-3 py-2 rounded-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Responses</span>
            </Link>
            <Link 
              to="/categories" 
              className="px-3 py-2 rounded-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>Categories</span>
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
                {darkMode ? (
                  <svg className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
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
                {isMenuOpen ? (
                  <svg className="w-6 h-6 min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
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
                    <svg className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3M19 10v10a1 1 0 01-1 1h-3" />
                    </svg>
                    <span>Home</span>
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    to="/responses"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Responses</span>
                  </Link>
                  
                  <Link
                    to="/categories"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Categories</span>
                  </Link>
                  
                  <Link
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
