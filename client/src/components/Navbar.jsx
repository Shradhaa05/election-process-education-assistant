import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get current path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  // Helper function to check if the route is active
  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <nav className="navbar" id="navbar" style={{ boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none' }}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🏛️</span>
          CivicGuide
        </Link>
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/steps" className={isActive('/steps')} onClick={closeMenu}>How to Vote</Link></li>
          <li><Link to="/timeline" className={isActive('/timeline')} onClick={closeMenu}>Timeline</Link></li>
          <li><Link to="/quizzes" className={isActive('/quizzes')} onClick={closeMenu}>Quizzes</Link></li>
          <li><Link to="/map" className={isActive('/map')} onClick={closeMenu}>Map</Link></li>
          <li><Link to="/analytics" className={isActive('/analytics')} onClick={closeMenu}>Analytics</Link></li>
          
          {/* Theme Toggle Button */}
          <li>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle" 
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
          
          <li><Link to="/ask" className="nav-btn" onClick={closeMenu}>Ask Assistant</Link></li>
          <li><Link to="/faq" className={isActive('/faq')} onClick={closeMenu}>FAQs</Link></li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
