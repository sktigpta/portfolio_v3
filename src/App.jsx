// App.jsx
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Projects from './components/Projects';
import BlogPage from './components/BlogPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingPage from './components/LoadingPage';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isNavigatingRef = useRef(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Only update active section if not currently navigating
      if (!isNavigatingRef.current) {
        updateActiveSection();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on scroll position
  const updateActiveSection = () => {
    const sections = ['home', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for navbar

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  // Handle navigation to sections
  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isNavigatingRef.current = true;
      setActiveSection(sectionId);
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });

      // Reset navigation flag after scroll completes
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1000);
    }
  };

  // Initialize active section on mount
  useEffect(() => {
    updateActiveSection();
  }, []);

  // Navigation items - About and Blog are external pages
  const navItems = [
    { name: 'home', label: 'Home' },
    { name: 'about', label: 'About' },
    { name: 'skills', label: 'Skills' },
    { name: 'projects', label: 'Projects' },
    { name: 'blog', label: 'Blog' }
  ];

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar 
          activeSection={activeSection} 
          scrolled={scrolled} 
          navigateToSection={navigateToSection}
          navItems={navItems}
        />

        <main style={{ marginTop: '55px' }}>
          <Routes>
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={
              <>
                <section id="home">
                  <Hero />
                </section>
                <section id="skills">
                  <Skills />
                </section>
                <section id="projects">
                  <Projects />
                </section>
                <section id="contact">
                  <Contact />
                </section>
              </>
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;