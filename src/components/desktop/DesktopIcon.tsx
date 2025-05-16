
import React from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  onClick
}) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-2 hover:bg-white/10 rounded cursor-pointer mb-6"
      onClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-1">
        {icon}
      </div>
      <div className="text-xs text-center text-white font-medium drop-shadow-md">{label}</div>
    </div>
  );
};
