import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ activeSection, scrolled, navigateToSection, navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.mobile-menu-overlay') && 
          !e.target.closest('.hamburger-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMenuOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1]
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 20
    },
    open: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1]
      }
    })
  };
  
  // Enhanced navigation handler with cross-route support
  const handleNavigation = (sectionId) => {
    const isOnHomePage = location.pathname === '/';
    const homeSections = ['home', 'skills', 'projects', 'contact'];
    
    if (sectionId === 'blog') {
      navigate('/blog');
    } else if (sectionId === 'about') {
      navigate('/about');
    } else if (sectionId === 'home') {
      if (!isOnHomePage) {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        navigateToSection(sectionId);
      }
    } else if (homeSections.includes(sectionId)) {
      // For skills, projects, contact - always navigate to home first if not already there
      if (!isOnHomePage) {
        navigate('/');
        // Wait for navigation to complete, then scroll to section
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 200); // Increased timeout to ensure page loads
      } else {
        // Already on home page, just scroll to section
        navigateToSection(sectionId);
      }
    }
    setIsMenuOpen(false);
  };

  // Handle logo click
  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  // Get current active section based on location
  const getCurrentActiveSection = () => {
    if (location.pathname === '/blog') return 'blog';
    if (location.pathname === '/about') return 'about';
    // Only return activeSection if we're on the home page
    if (location.pathname === '/') return activeSection;
    return 'home'; // Default fallback
  };

  const currentActiveSection = getCurrentActiveSection();
  
  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.div 
          className="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="currentColor"/>
          </svg>
          <span className="logo-text">Shaktidhar</span>
        </motion.div>
        
        {/* Desktop menu */}
        <div className="nav-items-container">
          <ul className="navbar-links">
            {navItems.map((item, i) => (
              <motion.li 
                key={item.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * (i + 1) }}
              >
                <button
                  onClick={() => handleNavigation(item.name)}
                  className={currentActiveSection === item.name ? 'active' : ''}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  {currentActiveSection === item.name && (
                    <motion.div 
                      className="active-indicator" 
                      layoutId="desktopActiveIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>

          <motion.div 
            className="contact-button-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => handleNavigation('contact')}
              className={`contact-button ${currentActiveSection === 'contact' ? 'active' : ''}`}
              aria-label="Navigate to Contact"
            >
              Contact
            </button>
          </motion.div>
        </div>

        {/* Mobile controls container */}
        <div className="mobile-controls">
          <motion.div 
            className="contact-button-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => handleNavigation('contact')}
              className={`contact-button ${currentActiveSection === 'contact' ? 'active' : ''}`}
              aria-label="Navigate to Contact"
            >
              Contact
            </button>
          </motion.div>
          
          <button 
            className="hamburger-button" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-icon">
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </span>
          </button>
        </div>
        
        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="mobile-menu-overlay"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <ul className="mobile-nav-links">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item.name}
                    custom={i}
                    variants={menuItemVariants}
                  >
                    <button
                      className={currentActiveSection === item.name ? 'active' : ''}
                      onClick={() => handleNavigation(item.name)}
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {item.label}
                      {currentActiveSection === item.name && (
                        <motion.div 
                          className="active-indicator-mobile" 
                          layoutId="mobileActiveIndicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;