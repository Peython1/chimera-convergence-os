
import React, { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timerId);
    };
  }, []);
  
  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const formattedDate = time.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="text-right">
      <div className="text-white text-3xl font-light">{formattedTime}</div>
      <div className="text-blue-100/70 text-sm">{formattedDate}</div>
    </div>
  );
};
