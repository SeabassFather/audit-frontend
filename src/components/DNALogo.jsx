import React from 'react';

const DNALogo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      {/* DNA Helix SVG inspired by the image reference */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer DNA helix structure */}
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#1e88e5" />
            <stop offset="100%" stopColor="#8bc34a" />
          </linearGradient>
          <linearGradient id="dnaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8bc34a" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* DNA Helix Left Strand */}
        <path
          d="M25 10 Q35 25 25 40 Q15 55 25 70 Q35 85 25 95"
          stroke="url(#dnaGradient)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
        />
        
        {/* DNA Helix Right Strand */}
        <path
          d="M75 10 Q65 25 75 40 Q85 55 75 70 Q65 85 75 95"
          stroke="url(#dnaGradient)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
        />
        
        {/* DNA Base Pairs */}
        {[15, 30, 45, 60, 75, 90].map((y, i) => (
          <g key={i}>
            <line
              x1="28"
              y1={y}
              x2="72"
              y2={y}
              stroke="url(#dnaGlow)"
              strokeWidth="2"
              opacity="0.7"
            />
            <circle cx="30" cy={y} r="2" fill="#00d4ff" />
            <circle cx="70" cy={y} r="2" fill="#8bc34a" />
          </g>
        ))}
        
        {/* Central glow effect */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="url(#dnaGlow)"
          strokeWidth="1"
          opacity="0.3"
          className="animate-spin"
          style={{ animationDuration: '8s' }}
        />
      </svg>
    </div>
  );
};

export default DNALogo;