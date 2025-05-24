
import React, { useEffect, useState } from 'react';

export const ChimeraCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-all duration-300 ${
        isHovering ? 'scale-150' : 'scale-100'
      }`}
      style={{
        left: position.x - 16,
        top: position.y - 16,
        width: 32,
        height: 32,
      }}
    >
      <div className="relative w-full h-full">
        {/* Lion Head */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80" />
        
        {/* Goat Horns */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-3 bg-amber-600 rounded transform -rotate-12 absolute -left-1" />
          <div className="w-1 h-3 bg-amber-600 rounded transform rotate-12 absolute left-1" />
        </div>
        
        {/* Serpent Tail */}
        <div className="absolute bottom-0 right-0 w-2 h-4 bg-green-600 rounded-full transform rotate-45" />
        
        {/* Fire Effect */}
        {isHovering && (
          <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-50" />
        )}
      </div>
    </div>
  );
};
