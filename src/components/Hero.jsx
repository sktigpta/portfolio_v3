"use client"

import { useState, useEffect } from "react"
import { FaGithub, FaLinkedinIn, FaTwitter, FaDribbble } from "react-icons/fa"
import { FaReact, FaNodeJs, FaFigma, FaAws } from "react-icons/fa"
import { SiTensorflow } from "react-icons/si"



function Hero({ navigateToSection }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  )

  // Create particles with random positions, animations, opacity and blinking effect
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 5, // More variable size between 1-6px
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 30, // Longer, more varied durations
      blinkDelay: Math.random() * 5,
      blinkDuration: 0.5 + Math.random() * 4, // More varied blinking
      opacity: 0.2 + Math.random() * 0.8, // Random opacity between 0.2 and 1
      movementRange: 30 + Math.random() * 70, // Random movement range
      movementDirection: Math.random() > 0.5 ? 1 : -1, // Random direction
      movementAxis: Math.random() > 0.5 ? 'horizontal' : 'vertical' // Random axis
    }))
  }

  // Generate background particles for blur effect
  const generateBackgroundParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 8 + Math.random() * 20, // Larger particles for background
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 40,
      opacity: 0.1 + Math.random() * 0.3,
      moveX: (Math.random() - 0.5) * 200,
      moveY: (Math.random() - 0.5) * 200
    }))
  }

  const [particles, setParticles] = useState(() => generateParticles(60)) // Increased particle count
  const [backgroundParticles, setBackgroundParticles] = useState(() => generateBackgroundParticles(25))

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Track window size for responsive design
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return (
    <div className={`relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>

      {/* Blurred Background Layer */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/30"></div>

      {/* Background Particles with Blur Effect */}
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

      {/* Main content */}
      <div className={`relative z-20 text-center max-w-3xl px-5 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} transition-all duration-1000 ease-out`}>
        {/* Profile Picture */}
        <div className={`mb-2 flex justify-center transform ${isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"} transition-all duration-1000 ease-out delay-200`}>
          <div className="relative">
            <img 
              src="/projects/profile/profile.png" 
              alt="Shaktidhar Gupta" 
              className="w-[100px] h-[100px] rounded-full object-cover border-1 border-white/20 shadow-lg"
              onError={(e) => {
                console.error('Failed to load profile image:', e.target.src);
                // Fallback to initials if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white/20 shadow-lg" style={{ display: 'none' }}>
              SG
            </div>
          </div>
        </div>

        <div className="mb-5 flex justify-center overflow-hidden">
          <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tighter transform ${isLoaded ? "translate-y-0" : "translate-y-full"} transition-transform duration-1000 ease-out bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl`}>
            Shaktidhar Gupta
          </h1>
        </div>

        <div className="h-8 overflow-hidden mb-6">
          <div className="animate-cycleText">
            <p className="h-8 flex items-center justify-center text-lg uppercase tracking-widest text-gray-300">Software Developer</p>
            <p className="h-8 flex items-center justify-center text-lg uppercase tracking-widest text-gray-300">UX Designer</p>
            <p className="h-8 flex items-center justify-center text-lg uppercase tracking-widest text-gray-300">Creative Coder</p>
          </div>
        </div>

        <p className={`text-lg mb-10 opacity-80 max-w-lg mx-auto transform ${isLoaded ? "translate-y-0 opacity-80" : "translate-y-5 opacity-0"} transition-all duration-1000 ease-out delay-300`} style={{ fontFamily: '"DM Serif Display", serif' }}>
          Crafting digital experiences that blend aesthetics with functionality
        </p>

        <div className={`flex flex-wrap justify-center gap-5 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"} transition-all duration-1000 ease-out delay-500`}>

          <a
            href="https://www.linkedin.com/in/sktigpta/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border border-white font-medium rounded-md hover:bg-white hover:text-black transition-colors duration-300"
          >
            Let's Connect
          </a>
        </div>
      </div>

      {/* Enhanced Floating shapes with blur effect */}
      <div className="absolute w-full h-full z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-12 h-12 ${isLoaded ? "opacity-30" : "opacity-0"} transition-opacity duration-1000`}
            style={{
              top: `${15 + (i * 4) % 70}%`,
              left: `${10 + (i * 5) % 80}%`,
              animationDelay: `${i * 0.4}s`,
              filter: 'blur(1px)'
            }}
          >
            <div
              className="w-full h-full border border-blue-300/40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full backdrop-blur-sm"
              style={{
                animation: `floatShape ${18 + i % 12}s infinite linear`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 20px rgba(147, 197, 253, 0.2)'
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Enhanced Skill badges with improved blur effects */}
      {windowWidth > 768 && (
        <div className="absolute w-full h-full z-15">
          {[
            {
              Icon: FaReact,
              text: "React",
              top: "25%",
              left: "25%",
              delay: "0.2s",
              color: "from-cyan-400/20 to-blue-500/20"
            },
            {
              Icon: FaNodeJs,
              text: "Node.js",
              top: "40%",
              right: "10%",
              delay: "1.3s",
              color: "from-green-400/20 to-green-600/20"
            },
            {
              Icon: SiTensorflow,
              text: "TensorFlow",
              bottom: "38%",
              left: "14%",
              delay: "0.6s",
              color: "from-orange-400/20 to-red-500/20"
            },
            {
              Icon: FaFigma,
              text: "Figma",
              top: "70%",
              right: "20%",
              delay: "1.8s",
              color: "from-purple-400/20 to-pink-500/20"
            },
            {
              Icon: FaAws,
              text: "AWS",
              top: "80%",
              right: "63%",
              delay: "1s",
              color: "from-yellow-400/20 to-orange-500/20"
            }
          ].map((skill, i) => (
            <div
              key={i}
              className={`absolute px-5 py-3 rounded-xl border border-white/20 bg-gradient-to-r ${skill.color} flex items-center gap-3 cursor-pointer transform ${isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"} transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:border-white/40`}
              style={{
                top: skill.top,
                left: skill.left,
                right: skill.right,
                bottom: skill.bottom,
                transitionDelay: skill.delay,
                backdropFilter: "blur(12px)",
                animation: `floatBadge ${12 + i * 2}s infinite ease-in-out`,
                animationDelay: skill.delay,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <skill.Icon className="text-white text-lg" />
              <span className="text-sm font-semibold text-white">{skill.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Animated Particles */}
      <div className="absolute w-full h-full pointer-events-none z-10">
        {particles.map((particle) => {
          const particleAnimationName = `particle-${particle.id}`;
          const particleBlinkName = `particle-blink-${particle.id}`;
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
                  ${particleAnimationName} ${particle.duration}s infinite alternate ease-in-out, 
                  ${particleBlinkName} ${particle.blinkDuration}s infinite ease-in-out
                `,
                animationDelay: `${particle.delay}s, ${particle.blinkDelay}s`,
                opacity: particle.opacity,
              }}
            >
              <style>
                {`
                @keyframes ${particleAnimationName} {
                  0% { transform: translate(0, 0) rotate(0deg); }
                  25% { transform: translate(${moveX * 0.3}px, ${moveY * 0.3}px) rotate(${particle.movementDirection * 45}deg); }
                  50% { transform: translate(${moveX * 0.7}px, ${moveY * 0.7}px) rotate(${particle.movementDirection * 90}deg); }
                  75% { transform: translate(${moveX * 0.5}px, ${moveY * 0.5}px) rotate(${particle.movementDirection * 45}deg); }
                  100% { transform: translate(${moveX}px, ${moveY}px) rotate(${particle.movementDirection * 180}deg); }
                }
                @keyframes ${particleBlinkName} {
                  0%, 100% { opacity: ${particle.opacity}; }
                  50% { opacity: ${particle.opacity * 0.2}; }
                }
                @keyframes bgFloat {
                  0%, 100% { transform: translate(0, 0) scale(1); }
                  25% { transform: translate(20px, -30px) scale(1.1); }
                  50% { transform: translate(-25px, 20px) scale(0.9); }
                  75% { transform: translate(15px, 35px) scale(1.05); }
                }
                `}
              </style>
              <div
                className="w-full h-full rounded-full bg-gradient-to-r from-white via-blue-200 to-purple-200"
                style={{
                  boxShadow: `0 0 ${particle.size + 5}px rgba(255, 255, 255, ${particle.opacity * 0.8})`
                }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Social media icons */}
      <div className="hidden lg:block z-20">
        <div
          className={`absolute bottom-17 right-10 flex gap-4 z-20 transform ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
            } transition-all duration-1000 ease-out delay-700`}
        >
          <a
            href="https://github.com/sktigpta/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sktigpta/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://twitter.com/sktigpta"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div
        onClick={() => navigateToSection?.(1)}
        className={`absolute bottom-15 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer ${isLoaded ? "translate-y-0 opacity-70" : "translate-y-8 opacity-0"} transition-all duration-1000 ease-out delay-1000 hover:opacity-100`}
      >
        <div className="relative group inline-block overflow-hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm text-xs text-gray-400 tracking-widest uppercase font-semibold mb-3">
          <span className="relative z-10">Scroll Down</span>
          <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero