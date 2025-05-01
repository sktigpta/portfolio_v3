"use client"

import { useState, useEffect } from "react"
import { FaGithub, FaLinkedinIn, FaTwitter, FaDribbble } from "react-icons/fa"
import { FaReact, FaNodeJs, FaFigma, FaAws } from "react-icons/fa"
import { SiTensorflow} from "react-icons/si"

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

  const [particles, setParticles] = useState(() => generateParticles(50)) // Increased particle count for more visual interest

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

  // Function to handle navigation to projects section
  const handleViewWork = () => {
    navigateToSection?.(3) // Index 3 for projects
  }

  return (
    <div className={`relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>
      {/* Main content */}
      <div className={`relative z-10 text-center max-w-3xl px-5 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} transition-all duration-1000 ease-out`}>
        <div className="mb-5 flex justify-center overflow-hidden">
          <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tighter transform ${isLoaded ? "translate-y-0" : "translate-y-full"} transition-transform duration-1000 ease-out bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent`}>
            Shaktidhar Gupta
          </h1>
        </div>

        <div className="h-8 overflow-hidden mb-6">
          <div className="animate-cycleText">
            <p className="h-8 flex items-center justify-center text-lg uppercase tracking-widest text-gray-300">Full-Stack Developer</p>
            <p className="h-8 flex items-center justify-center text-lg uppercase tracking-widest text-gray-300">UX Designer</p>
            <p className="h-8 flex items-center justify-center text-lg uppercase tracking-widest text-gray-300">Creative Coder</p>
          </div>
        </div>

        <p className={`text-lg mb-10 opacity-80 max-w-lg mx-auto transform ${isLoaded ? "translate-y-0 opacity-80" : "translate-y-5 opacity-0"} transition-all duration-1000 ease-out delay-300`} style={{ fontFamily: '"DM Serif Display", serif' }}>
          Crafting digital experiences that blend aesthetics with functionality
        </p>

        <div className={`flex flex-wrap justify-center gap-5 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"} transition-all duration-1000 ease-out delay-500`}>
          <button
            onClick={handleViewWork}
            className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors duration-300"
          >
            View My Work
          </button>
          <a
            href="https://www.linkedin.com/in/shaktidhar-gupta/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border border-white font-medium rounded-md hover:bg-white hover:text-black transition-colors duration-300"
          >
            Let's Connect
          </a>
        </div>
      </div>

      {/* Floating shapes */}
      <div className="absolute w-full h-full">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-10 h-10 ${isLoaded ? "opacity-20" : "opacity-0"} transition-opacity duration-1000`}
            style={{
              top: `${15 + (i * 5) % 70}%`,
              left: `${10 + (i * 6) % 80}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div
              className="w-full h-full border border-gray-700 bg-gray-900 bg-opacity-10 rounded-full"
              style={{
                animation: `floatShape ${20 + i % 10}s infinite linear`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Skill badges - hidden on tablets and phones */}
      {windowWidth > 768 && (
        <div className=" absolute w-full h-full">
          {[
            {
              Icon: FaReact,
              text: "React",
              top: "25%",
              left: "15%",
              delay: "0.2s"
            },
            {
              Icon: FaNodeJs,
              text: "Node.js",
              top: "40%",
              right: "20%",
              delay: "1.3s"
            },
            {
              Icon: SiTensorflow,
              text: "TensorFlow",
              bottom: "30%",
              left: "23%",
              delay: "0.6s"
            },
            {
              Icon: FaFigma,
              text: "Figma",
              top: "70%",
              right: "32%",
              delay: "1.8s"
            },
            {
              Icon: FaAws,
              text: "AWS",
              top: "75%",
              right: "60%",
              delay: "1s"
            }
          ].map((skill, i) => (
            <div
              key={i}
              className={`absolute px-4 py-2 rounded-full border border-gray-700 bg-gray-900 bg-opacity-30 flex items-center gap-2 cursor-pointer transform ${isLoaded ? "scale-100 opacity-100 " : "scale-75 opacity-0"} transition-all duration-500 hover:scale-110 hover:shadow-lg`}
              style={{
                top: skill.top,
                left: skill.left,
                right: skill.right,
                bottom: skill.bottom,
                transitionDelay: skill.delay,
                backdropFilter: "blur(8px)",
                animation: `floatBadge ${12 + i * 2}s infinite ease-in-out`,
                animationDelay: skill.delay
              }}
            >
              <skill.Icon className="text-white" />
              <span className="text-sm font-medium">{skill.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Animated Particles with Random Movement and Opacity */}
      <div className="absolute w-full h-full pointer-events-none">
        {particles.map((particle) => {
          // Create unique animation name for each particle
          const particleAnimationName = `particle-${particle.id}`;
          const particleBlinkName = `particle-blink-${particle.id}`;

          // Define custom keyframes for this particle
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
                `}
              </style>
              <div
                className="w-full h-full rounded-full bg-white"
                style={{
                  boxShadow: `0 0 ${particle.size + 3}px rgba(255, 255, 255, ${particle.opacity * 0.7})`
                }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Social media icons */}
      <div className="hidden lg:block">
        <div className={`absolute bottom-10 right-10 flex gap-4 z-10 transform ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"} transition-all duration-1000 ease-out delay-700 md:flex`}>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-900 bg-opacity-30 border border-gray-700 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:translate-y-1 transition-all duration-300">
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/shaktidhar-gupta/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-900 bg-opacity-30 border border-gray-700 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:translate-y-1 transition-all duration-300"
          >
            <FaLinkedinIn />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-900 bg-opacity-30 border border-gray-700 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:translate-y-1 transition-all duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-900 bg-opacity-30 border border-gray-700 flex items-center justify-center text-lg hover:transform hover:scale-110 hover:translate-y-1 transition-all duration-300">
            <FaDribbble />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        onClick={() => navigateToSection?.(1)}
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer ${isLoaded ? "translate-y-0 opacity-70" : "translate-y-8 opacity-0"} transition-all duration-1000 ease-out delay-1000 hover:opacity-100`}
      >
        <div className="text-xs tracking-widest uppercase mb-2">Scroll Down</div>
      </div>
    </div>
  )
}

export default Hero