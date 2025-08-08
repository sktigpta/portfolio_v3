import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full mt-5 py-5">
      <div className="w-full max-w-6xl mx-auto px-4 flex justify-center items-center">
        <p className="text-white text-opacity-70 text-sm text-center tracking-wide font-light hover:text-opacity-90 transition-colors">
          © {currentYear} Shaktidhar Gupta. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;