import { useState, useEffect } from "react"
import { FaGithub, FaLinkedinIn, FaTwitter, } from "react-icons/fa"
import { FaReact, FaNodeJs, FaFigma, FaAws } from "react-icons/fa"
import { SiTensorflow } from "react-icons/si"

function Hero({ navigateToSection }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  )

  // Reduced particle count for mobile
  const getParticleCount = () => {
    if (windowWidth <= 768) return 15 // Much fewer particles on mobile
    return 45 // Reduced from 60 for better performance
  }

  const getBackgroundParticleCount = () => {
    if (windowWidth <= 768) return 5 // Much fewer background particles on mobile
    return 15 // Reduced from 25
  }

  // Create particles with random positions, animations, opacity and enhanced movement
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * (windowWidth <= 768 ? 3 : 5), // Smaller on mobile
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20, // Shorter durations for better performance
      blinkDelay: Math.random() * 5,
      blinkDuration: 1 + Math.random() * 3,
      baseOpacity: 0.3 + Math.random() * 0.7,
      movementRange: windowWidth <= 768 ? 20 + Math.random() * 30 : 30 + Math.random() * 70,
      movementDirection: Math.random() > 0.5 ? 1 : -1,
      movementAxis: Math.random() > 0.5 ? 'horizontal' : 'vertical'
    }))
  }

  // Generate background particles for blur effect
  const generateBackgroundParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: windowWidth <= 768 ? 6 + Math.random() * 12 : 8 + Math.random() * 20,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 25, // Shorter for mobile
      opacity: 0.1 + Math.random() * 0.2, // Lower opacity
      moveX: (Math.random() - 0.5) * (windowWidth <= 768 ? 100 : 200),
      moveY: (Math.random() - 0.5) * (windowWidth <= 768 ? 100 : 200)
    }))
  }

  const [particles, setParticles] = useState(() => generateParticles(getParticleCount()))
  const [backgroundParticles, setBackgroundParticles] = useState(() => generateBackgroundParticles(getBackgroundParticleCount()))

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Track window size for responsive design
    const handleResize = () => {
      const newWidth = window.innerWidth
      setWindowWidth(newWidth)
      // Regenerate particles on resize for better performance
      setParticles(generateParticles(newWidth <= 768 ? 15 : 45))
      setBackgroundParticles(generateBackgroundParticles(newWidth <= 768 ? 5 : 15))
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleScrollDown = () => {
    if (navigateToSection) {
      navigateToSection(1)
    } else {
      // Smooth scroll to next section
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={`relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>

      {/* Simplified blur background for mobile */}
      <div className={`absolute inset-0 ${windowWidth <= 768 ? 'backdrop-blur-xl' : 'backdrop-blur-3xl'} bg-black/30`}></div>

      {/* Background Particles with Blur Effect - Disabled on mobile for performance */}
      {windowWidth > 768 && (
        <div className="absolute w-full h-full pointer-events-none">
          {backgroundParticles.map((particle) => (
            <div
              key={`bg-${particle.id}`}
              className={`absolute transform ${isLoaded ? "scale-100" : "scale-0"} transition-all duration-700`}
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transitionDelay: `${particle.delay * 0.05}s`,
                animation: `bgFloat ${particle.duration}s infinite ease-in-out`,
                animationDelay: `${particle.delay}s`,
                filter: 'blur(8px)',
                opacity: particle.opacity,
              }}
            >
              <div
                className="w-full h-full rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
                style={{
                  boxShadow: `0 0 ${particle.size * 2}px rgba(147, 197, 253, 0.3)`
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className={`relative z-20 text-center max-w-3xl px-5 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} transition-all duration-1000 ease-out`}>
        {/* Profile Picture */}
        <div className={`mb-2 flex justify-center transform ${isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"} transition-all duration-1000 ease-out delay-200`}>
          <div className="relative">
            <div
              className="w-[60px] h-[60px] rounded-full bg-gradient-to-br overflow-hidden border-white/20 shadow-lg flex items-center justify-center text-white font-bold text-2xl"
            >
              <img src="/projects/profile/profile.png" alt="profile image" />
            </div>
          </div>
        </div>

        <div className="mb-5 flex justify-center overflow-hidden">
          <h1 className={`${windowWidth <= 768 ? 'text-4xl' : 'text-5xl md:text-6xl'} font-extrabold tracking-tighter transform ${isLoaded ? "translate-y-0" : "translate-y-full"} transition-transform duration-1000 ease-out text-white drop-shadow-2xl cursor-pointer hover:scale-105 transition-all duration-500`}>
            Shaktidhar Gupta
          </h1>
        </div>

        <div className="h-8 overflow-hidden mb-6">
          <div className="cycling-text">
            <p className={`h-8 flex items-center justify-center ${windowWidth <= 768 ? 'text-base' : 'text-lg'} uppercase tracking-widest text-gray-300`}>Software Developer</p>
            <p className={`h-8 flex items-center justify-center ${windowWidth <= 768 ? 'text-base' : 'text-lg'} uppercase tracking-widest text-gray-300`}>UX Designer</p>
            <p className={`h-8 flex items-center justify-center ${windowWidth <= 768 ? 'text-base' : 'text-lg'} uppercase tracking-widest text-gray-300`}>Creative Coder</p>
          </div>
        </div>

        <p className={`${windowWidth <= 768 ? 'text-base' : 'text-lg'} mb-10 opacity-80 max-w-lg mx-auto transform ${isLoaded ? "translate-y-0 opacity-80" : "translate-y-5 opacity-0"} transition-all duration-1000 ease-out delay-300`} style={{ fontFamily: '"DM Serif Display", serif' }}>
          Crafting digital experiences that blend aesthetics with functionality
        </p>

        <div
          className={`flex flex-wrap justify-center gap-5 ${isLoaded
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-5 opacity-0 blur-sm"
            } transition-all duration-1000 ease-out delay-500`}
        >
          <a
            href="https://www.linkedin.com/in/sktigpta/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3  border border-white font-medium rounded-md hover:bg-white hover:text-black transition-colors duration-300"
          >
            Let's Connect
          </a>
        </div>

      </div>

      {/* Simplified Floating shapes - Reduced count and effects on mobile */}
      <div className="absolute w-full h-full z-10">
        {[...Array(windowWidth <= 768 ? 8 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 opacity-20 transition-opacity duration-1000"
            style={{
              top: `${15 + (i * 4) % 70}%`,
              left: `${10 + (i * 5) % 80}%`,
              animation: `floatBadge ${windowWidth <= 768 ? 6 : 8}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
              filter: `blur(${windowWidth <= 768 ? 0.5 : 1 + (i % 3) * 0.5}px)`
            }}
          >
            <div
              className="w-full h-full border border-blue-300/40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full backdrop-blur-sm"
              style={{
                animation: `floatShape ${12 + i % 8}s infinite linear`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: windowWidth <= 768 ? '0 0 10px rgba(147, 197, 253, 0.1)' : '0 0 20px rgba(147, 197, 253, 0.2)'
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Skill badges - Only on desktop */}
      {windowWidth > 1024 && (
        <div className="absolute w-full h-full z-15">
          {[
            {
              text: "React",
              icon: <FaReact className="text-cyan-400" />,
              top: "25%",
              left: "25%",
              delay: "0.2s",
              color: "from-cyan-400/20 to-blue-500/20"
            },
            {
              text: "Node.js",
              icon: <FaNodeJs className="text-green-400" />,
              top: "40%",
              right: "10%",
              delay: "1.3s",
              color: "from-green-400/20 to-green-600/20"
            },
            {
              text: "TensorFlow",
              icon: <SiTensorflow className="text-orange-400" />,
              bottom: "38%",
              left: "14%",
              delay: "0.6s",
              color: "from-orange-400/20 to-red-500/20"
            },
            {
              text: "Figma",
              icon: <FaFigma className="text-purple-400" />,
              top: "70%",
              right: "20%",
              delay: "1.8s",
              color: "from-purple-400/20 to-pink-500/20"
            },
            {
              text: "AWS",
              icon: <FaAws className="text-yellow-400" />,
              top: "80%",
              right: "63%",
              delay: "1s",
              color: "from-yellow-400/20 to-orange-500/20"
            }
          ].map((skill, i) => (
            <div
              key={i}
              className={`absolute px-5 py-3 rounded-xl border border-white/20 bg-gradient-to-r ${skill.color} flex items-center gap-3 cursor-pointer transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:border-white/40 ${isLoaded ? "scale-100 opacity-90" : "scale-75 opacity-0"}`}
              style={{
                top: skill.top,
                left: skill.left,
                right: skill.right,
                bottom: skill.bottom,
                transitionDelay: skill.delay,
                backdropFilter: "blur(12px)",
                animation: `skillFloat ${8 + i * 2}s infinite ease-in-out`,
                animationDelay: skill.delay,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              {skill.icon}
              <span className="text-sm font-semibold text-white">{skill.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Animated Particles with better performance */}
      <div className="absolute w-full h-full pointer-events-none z-10">
        {particles.map((particle) => {
          const moveX = particle.movementAxis === 'horizontal' ? particle.movementRange * particle.movementDirection : 0;
          const moveY = particle.movementAxis === 'vertical' ? particle.movementRange * particle.movementDirection : 0;

          return (
            <div
              key={particle.id}
              className={`absolute transform ${isLoaded ? "scale-100" : "scale-0"} transition-all duration-500`}
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transitionDelay: `${particle.delay * 0.1}s`,
                animation: `
                  particleFloat-${particle.id} ${particle.duration}s infinite alternate ease-in-out, 
                  particleBlink-${particle.id} ${particle.blinkDuration}s infinite ease-in-out
                `,
                animationDelay: `${particle.delay}s, ${particle.blinkDelay}s`,
              }}
            >
              <div
                className="w-full h-full rounded-full bg-gradient-to-r from-white via-blue-200 to-purple-200"
                style={{
                  boxShadow: `0 0 ${particle.size + (windowWidth <= 768 ? 2 : 5)}px rgba(255, 255, 255, ${particle.baseOpacity * (windowWidth <= 768 ? 0.4 : 0.8)})`
                }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Social media icons - Hidden on mobile for performance */}
      {windowWidth > 768 && (
        <div className="absolute bottom-17 right-10 flex gap-4 z-20">
          <a
            href="https://github.com/sktigpta/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sktigpta/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://twitter.com/sktigpta"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      )}

      {/* Scroll indicator */}
      <div
        onClick={handleScrollDown}
        className={`absolute bottom-15 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer ${isLoaded ? "translate-y-0 opacity-70" : "translate-y-8 opacity-0"} transition-all duration-1000 ease-out delay-1000 hover:opacity-100`}
      >
        <div className="relative group inline-block overflow-hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm text-xs text-gray-400 tracking-widest uppercase font-semibold mb-3 hover:scale-105 transition-all duration-300">
          <span className="relative z-10">Scroll Down</span>
          <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out"></div>
        </div>
      </div>

      {/* All CSS animations */}
      <style jsx>{`
        /* Background float animation */
        @keyframes bgFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-25px, 20px) scale(0.9); }
          75% { transform: translate(15px, 35px) scale(1.05); }
        }

        /* Float badge animation */
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(-25px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-2deg); }
        }

        /* Float shape animation */
        @keyframes floatShape {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Skill float animation */
        @keyframes skillFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            filter: brightness(1);
          }
          25% { 
            transform: translateY(-8px) translateX(3px) rotate(1deg); 
            filter: brightness(1.1);
          }
          50% { 
            transform: translateY(-15px) translateX(-2px) rotate(0deg); 
            filter: brightness(1.2);
          }
          75% { 
            transform: translateY(-5px) translateX(4px) rotate(-1deg); 
            filter: brightness(1.05);
          }
        }

        /* Cycling text animation */
        .cycling-text {
          animation: cycleText 9s infinite;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes cycleText {
          0%, 30% { transform: translateY(0); }
          33.33%, 63.33% { transform: translateY(-32px); }
          66.66%, 96.66% { transform: translateY(-64px); }
          100% { transform: translateY(0); }
        }

        /* Dynamic particle animations */
        ${particles.map(particle => {
        const moveX = particle.movementAxis === 'horizontal' ? particle.movementRange * particle.movementDirection : 0;
        const moveY = particle.movementAxis === 'vertical' ? particle.movementRange * particle.movementDirection : 0;

        return `
            @keyframes particleFloat-${particle.id} {
              0% { transform: translate(0, 0) rotate(0deg); opacity: ${particle.baseOpacity * 0.8}; }
              25% { transform: translate(${moveX * 0.3}px, ${moveY * 0.3}px) rotate(${particle.movementDirection * 45}deg); opacity: ${particle.baseOpacity}; }
              50% { transform: translate(${moveX * 0.7}px, ${moveY * 0.7}px) rotate(${particle.movementDirection * 90}deg); opacity: ${particle.baseOpacity * 1.2}; }
              75% { transform: translate(${moveX * 0.5}px, ${moveY * 0.5}px) rotate(${particle.movementDirection * 45}deg); opacity: ${particle.baseOpacity}; }
              100% { transform: translate(${moveX}px, ${moveY}px) rotate(${particle.movementDirection * 180}deg); opacity: ${particle.baseOpacity * 0.8}; }
            }
            @keyframes particleBlink-${particle.id} {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
          `;
      }).join('')}
      `}</style>
    </div>
  )
}

export default Hero