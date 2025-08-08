import React, { useState, useEffect } from 'react';
import { Quote, Download, FileText, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sameer Saikh',
    text: 'Shaktidhar is an exceptional developer who consistently delivers high-quality work. His attention to detail and ability to translate complex requirements into elegant solutions is outstanding.',
    rating: 3.4,
    avatar: null
  },
  {
    id: 2,
    name: 'Robbin',
    role: 'Marketing Associate',
    company: 'Marketing Company',
    text: 'Working with Shaktidhar was a pleasure. His technical skills are top-notch, and he has a great eye for design. He always goes above and beyond to ensure the best user experience.',
    rating: 5,
    avatar: null
  },
  {
    id: 3,
    name: 'Praduman Gupta',
    role: 'UX Designer',
    company: 'Creative Studio',
    text: 'Shaktidhar\'s ability to bridge the gap between design and development is remarkable. He understands user needs and creates intuitive interfaces that users love.',
    rating: 5,
    avatar: null
  }
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Auto-carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    // Simulate slight delay for loading spinner
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/cv.pdf'; // Path to your CV in the public folder
      link.download = 'Shaktidhar_Gupta_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      setDownloadSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
    }, 500); // optional delay for smoother animation
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-black min-h-screen" style={{
      marginTop: '55px',
      minHeight: 'calc(100vh - 50px)',
      padding: '1rem 1rem'
    }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-left">
            About Me
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 lg:mb-16 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl lg:text-4xl font-bold shadow-2xl">
              SG
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center text-left w-full">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4 md:mb-6">
              Who I Am
            </h3>
            <p className="text-neutral-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              I'm a passionate frontend developer and UI/UX enthusiast, currently pursuing my B.Tech at
              Rungta College of Engineering and Technology. I enjoy turning ideas into interactive, visually
              appealing digital experiences, with a focus on clean code and user-friendly design.
            </p>
            <p className="text-neutral-300 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
              I specialize in creating responsive web applications and interfaces that blend creativity with
              functionality. As I progress in my academic journey, I'm constantly exploring new tools and
              techniques to bridge the gap between design and development.
            </p>

            {/* Download CV Section */}
            <div className="bg-neutral-800/30 border border-neutral-700 rounded-lg p-6 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              {/* Left Side: Title + Description */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-blue-400" size={24} />
                  <h4 className="text-white font-semibold text-lg">Download My Resume</h4>
                </div>
                <p className="text-neutral-300 text-sm">
                  Get a detailed overview of my skills, experience, and projects in PDF format.
                </p>
              </div>

              {/* Right Side: Download Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className={`
        w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
        ${isDownloading
                      ? 'bg-blue-500/50 text-white cursor-not-allowed'
                      : downloadSuccess
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                    }
      `}
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Preparing Download...
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <CheckCircle size={18} />
                      Downloaded Successfully!
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Download CV
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-12 lg:mt-16 w-full">
          <div className="mb-8 md:mb-12 text-left">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
              What Others Say About Me
            </h3>
            <p className="text-neutral-300 text-sm md:text-base">
              Feedback from colleagues and clients
            </p>
          </div>

          {/* Desktop View - Static grid for 3 or fewer testimonials, carousel for more than 3 */}
          {testimonials.length <= 3 ? (
            <div className="hidden lg:grid lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 hover:bg-neutral-800/70 transition-colors duration-300"
                >
                  <div className="mb-4">
                    <Quote size={24} className="text-blue-400 mb-3" />
                    <p className="text-neutral-300 italic leading-relaxed text-sm">
                      {testimonial.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                      {testimonial.role && (
                        <p className="text-neutral-400 text-xs">{testimonial.role}</p>
                      )}
                      {testimonial.company && (
                        <p className="text-neutral-500 text-xs">{testimonial.company}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop carousel for more than 3 testimonials
            <div className="hidden lg:block relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-6"
                  style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-1/3 flex-shrink-0"
                    >
                      <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 hover:bg-neutral-800/70 transition-colors duration-300 h-full">
                        <div className="mb-4">
                          <Quote size={24} className="text-blue-400 mb-3" />
                          <p className="text-neutral-300 italic leading-relaxed text-sm">
                            {testimonial.text}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                            {testimonial.role && (
                              <p className="text-neutral-400 text-xs">{testimonial.role}</p>
                            )}
                            {testimonial.company && (
                              <p className="text-neutral-500 text-xs">{testimonial.company}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator for Desktop Carousel */}
              {testimonials.length > 3 && (
                <div className="flex justify-center mt-6 gap-2">
                  {Array.from({ length: Math.ceil(testimonials.length - 2) }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentSlide
                        ? 'bg-blue-400'
                        : 'bg-neutral-600 hover:bg-neutral-500'
                        }`}
                      aria-label={`Go to testimonial group ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile/Tablet Carousel - Always shows one testimonial at a time */}
          <div className="lg:hidden relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0"
                  >
                    <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 md:p-6 h-full">
                      <div className="mb-4">
                        <Quote size={20} className="text-blue-400 mb-3" />
                        <p className="text-neutral-300 italic leading-relaxed text-sm md:text-base">
                          {testimonial.text}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm md:text-base">
                            {testimonial.name}
                          </h4>
                          {testimonial.role && (
                            <p className="text-neutral-400 text-xs md:text-sm">{testimonial.role}</p>
                          )}
                          {testimonial.company && (
                            <p className="text-neutral-500 text-xs">{testimonial.company}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator for Mobile */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-200 ${index === currentSlide
                    ? 'bg-blue-400'
                    : 'bg-neutral-600 hover:bg-neutral-500'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;