import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        <span style={{fontSize: '1.2rem', marginRight: '8px'}}>✨</span>
        AI Resume Analyzer &copy; 2026 
        <span style={{margin: '0 10px'}}>|</span>
        Built with <span style={{color: '#ff6b6b', fontSize: '1.2rem'}}>♥</span> using MERN Stack
      </p>
      <p style={{marginTop: '10px', fontSize: '0.9rem', opacity: 0.8}}>
        Empowering careers with AI-driven insights
      </p>
    </footer>
  );
};

export default Footer;
