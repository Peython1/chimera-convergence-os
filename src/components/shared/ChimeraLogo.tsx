
import React from 'react';

interface ChimeraLogoProps {
  className?: string;
}

export const ChimeraLogo: React.FC<ChimeraLogoProps> = ({ className = "" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Windows-style square (bottom-left) */}
      <rect 
        x="10" 
        y="50" 
        width="40" 
        height="40" 
        rx="5" 
        fill="#0078D7" 
        className="animate-float"
        style={{ animationDelay: '0.5s' }} 
      />
      
      {/* Linux penguin-inspired shape (top-right) */}
      <path 
        d="M50,10 L90,10 C92.7614,10 95,12.2386 95,15 L95,45 C95,47.7614 92.7614,50 90,50 L65,50 C60,50 50,40 50,35 Z" 
        fill="#4CAF50" 
        className="animate-float"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Convergence element (center) */}
      <circle 
        cx="50" 
        cy="50" 
        r="15" 
        fill="#FF4081" 
        className="animate-float"
        style={{ animationDelay: '1s' }}
      />
      
      {/* Connecting lines representing integration */}
      <path 
        d="M50,50 L50,35 M50,50 L35,50 M50,50 L65,50" 
        stroke="white" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
};
