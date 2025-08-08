import { useState, useEffect, useRef } from 'react';

const ProjectShowcaseCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const carouselRef = useRef(null);
  const totalSlides = 5;
  const intervalRef = useRef(null);

  // Project content with tech stacks
  const projectContent = [
    {
      title: "SecureRights",
      description: "A secure and scalable full-stack platform for digital rights management using React, Node.js, and MongoDB. Includes user authentication, role-based access, and a responsive dashboard.",
      repository: "https://github.com/sktigpta/Gdg-Solution-Challenge.git",
      demo: "https://securerights.app/",
      tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      screenshots: [
        "/projects/securerightshome.png",
        "/projects/securerightsdashboard.png",
      ]
    },
    {
      title: "ProofX",
      description: "A productivity and task management tool with a drag-and-drop interface. Built with modern React practices, including authentication and responsive design.",
      repository: "https://github.com/sktigpta/proofX",
      demo: "https://proof-x-client.vercel.app/",
      tech: ["React", "JavaScript", "CSS3", "Vercel", "REST API"],
      screenshots: [
        "/projects/proofxdashboard.png",
        "/projects/proofxlogin.png",
        "/projects/proofxsignup.png",
      ]
    },
    {
      title: "Farm-floo",
      description: "A modern, responsive farmer-to-customer app with support for product uploads, user profiles, and order requests. Built with a clean UI and dark mode toggle.",
      repository: "https://github.com/sktigpta/Farm-flo",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
      screenshots: [
        "https://via.placeholder.com/800x600/1f2937/ffffff?text=Farm-floo+Dashboard"
      ]
    },
    {
      title: "Rent-blee",
      description: "A digital rental platform that allows users to find and book rental properties easily. Includes features like authentication, dynamic listings, and user-friendly filtering.",
      repository: "https://github.com/sktigpta?tab=repositories",
      demo: "https://rent-blee-demo.vercel.app",
      tech: ["React", "Next.js", "Tailwind", "MongoDB", "Vercel"],
      screenshots: [
        "/projects/rentblee/rentbleeHome.png",
        "/projects/rentblee/rentbleeLogin.png",
        "/projects/rentblee/rentbleeRegister.png",
      ]
    },
    {
      title: "Order Execution System (C++)",
      description: "A command-line based order matching engine built in C++ for processing buy/sell requests with low-latency execution, simulating a real-time trading platform.",
      repository: "https://github.com/yourusername/order-execution-system",
      demo: null,
      tech: ["C++", "STL", "Algorithms", "Data Structures", "CLI"],
      screenshots: [
        "/projects/ordexecoding.png",
      ]
    }
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (!showGallery) {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setActiveSlide((prev) => (prev + 1) % totalSlides);
        }
      }, 5000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, totalSlides, showGallery]);

  // Handle dot navigation
  const goToSlide = (index) => {
    setActiveSlide(index);
    // Reset timer when manually changing slides
    resetTimer();
  };

  // Navigate to previous slide
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    resetTimer();
  };

  // Navigate to next slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
    resetTimer();
  };

  // Reset timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    if (!isPaused && !showGallery) {
      intervalRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }
  };

  // Toggle pause/play
  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  // Toggle gallery view
  const toggleGallery = () => {
    setShowGallery(!showGallery);
    if (!showGallery) {
      clearInterval(intervalRef.current);
      setIsPaused(true);
    } else {
      setIsPaused(false);
      resetTimer();
    }
  };

  // Drag handling
  const handleDragStart = (e) => {
    setDragStart(e.clientX);
    document.body.style.cursor = 'grabbing';
  };

  const handleDragEnd = (e) => {
    if (dragStart) {
      const diff = dragStart - e.clientX;
      if (diff > 50) {
        // Dragged left - next slide
        nextSlide();
      } else if (diff < -50) {
        // Dragged right - previous slide
        prevSlide();
      }
      setDragStart(null);
      document.body.style.cursor = 'auto';
    }
  };

  const handleDragMove = (e) => {
    if (dragStart) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full rounded-xl bg-white/5 border border-white/20 backdrop-blur-sm overflow-hidden shadow-2xl" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
        <div className="relative">
        {/* Main Carousel */}
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out h-120 w-full cursor-grab relative"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onMouseMove={handleDragMove}
          onTouchStart={(e) => handleDragStart({ clientX: e.touches[0].clientX })}
          onTouchEnd={(e) => handleDragEnd({ clientX: e.changedTouches[0].clientX })}
          onTouchMove={handleDragMove}
        >
          {projectContent.map((project, index) => (
            <div
              key={index}
              className="min-w-full flex-shrink-0 relative overflow-hidden"
            >
              {/* Background Image with Stronger Gradient Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{
                  backgroundImage: `url(${project.screenshots[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Strong Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

              {/* Project Information */}
              <div className="absolute bottom-8 left-6 z-20 text-white max-w-lg">
                <div className="mb-4">
                  <h3 className="text-xl font-mono font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm font-sans opacity-90 mb-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="tech-tag bg-white/15 text-white px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm border border-white/10"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {/* repo and demo btn  */}
                <div className="flex space-x-3">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-xl hover:bg-opacity-90 transition duration-200 text-xs font-medium backdrop-blur-sm border border-white/20 hover:border-white/40"
                    >
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Repo
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-blue-500/30 hover:bg-blue-500/40 text-white px-3 py-1 rounded-xl hover:bg-blue-700 transition duration-200 text-xs font-medium backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50"
                    >
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-8 right-6 z-20 hidden lg:block">
                <div className="flex space-x-2">
                  <div className="shadow-lg">
                    <img
                      src={project.screenshots[0]}
                      alt="Project screenshot"
                      className="w-20 h-14 object-cover rounded-md border border-white/30"
                    />
                  </div>

                  {project.screenshots.length > 1 && (
                    <div className="shadow-lg">
                      <img
                        src={project.screenshots[1]}
                        alt="Project screenshot"
                        className="w-20 h-14 object-cover rounded-md border border-white/30"
                      />
                    </div>
                  )}
                </div>

                {project.screenshots.length > 2 && (
                  <button
                    onClick={toggleGallery}
                    className="mt-2 bg-white/20 text-white px-2 py-1 rounded-md hover:bg-white/30 transition text-xs flex items-center justify-center w-full"
                  >
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 8h16v13H4z" />
                      <path d="M6 5V3h12v2" />
                    </svg>
                    See All ({project.screenshots.length})
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Slide Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="hidden lg:block absolute left-5.5 top-1/2 transform -translate-y-1/2 bg-white/10 border border-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-white z-20 hover:bg-white/20 transition-all focus:outline-none"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="hidden lg:block absolute right-5.5 top-1/2 transform -translate-y-1/2 bg-white/10 border border-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-white z-20 hover:bg-white/20 transition-all focus:outline-none"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Fixed Dots Navigation - Perfect Center Alignment */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center justify-center space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 scale-100 hover:bg-white/70'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          className="absolute top-2 right-2 text-white bg-white/10 border border-white/20 backdrop-blur-sm p-1 rounded-full z-20 hover:bg-white/20 transition duration-200"
          onClick={togglePlayPause}
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
        >
          {isPaused ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>
      </div>

      {/* Improved Full Gallery Modal with Blur Effect */}
      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur effect */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={toggleGallery}
          />

          {/* Modal Content */}
          <div className="relative bg-neutral-900 w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden shadow-2xl z-10 flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-neutral-800">
              <h2 className="text-white text-lg font-bold">
                {projectContent[activeSlide].title} - Screenshots ({projectContent[activeSlide].screenshots.length})
              </h2>
              <button
                onClick={toggleGallery}
                className="text-neutral-400 hover:text-white transition p-2"
                aria-label="Close gallery"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Modal Body with Scrolling */}
            <div className="overflow-y-auto p-4 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectContent[activeSlide].screenshots.map((screenshot, idx) => (
                  <div key={idx} className="aspect-video bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={screenshot}
                      alt={`${projectContent[activeSlide].title} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectShowcaseCarousel;