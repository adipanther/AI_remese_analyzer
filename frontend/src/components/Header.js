import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <span className="icon-bounce">🎯</span> AI Resume Analyzer
      </h1>
      <p>Upload your resume and get instant job match insights powered by AI</p>
      <style jsx>{`
        .icon-bounce {
          display: inline-block;
          animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(-5deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(-5px) rotate(5deg);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
