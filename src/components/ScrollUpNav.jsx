import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollUpNav = ({ visible }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Shaktidhar_Gupta_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            top: 50,
            left: 0,
            right: 0,
            zIndex: 900,
          }}
        >
          <div className="w-full backdrop-blur-md bg-black/70 border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              {/* Left: Profile, name, description */}
              <div className="flex items-center gap-3">
                <img
                  src="/projects/profile/profile.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-semibold text-sm sm:text-base">Shaktidhar Gupta</span>
                  <span className="text-white/70 text-xs sm:text-sm">I Build What Matters!</span>
                </div>
              </div>

              {/* Right: Download resume */}
              <div>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollUpNav;


