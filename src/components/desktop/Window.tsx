import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { WindowData } from './types';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WindowProps {
  data: WindowData;
  onActivate: () => void;
  onClose: () => void;
  onMaximize: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
}

const Window: React.FC<WindowProps> = ({
  data,
  onActivate,
  onClose,
  onMaximize,
  onPositionChange,
  onSizeChange
}) => {
  const dragControls = useDragControls();
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
    setOriginalSize({ width: data.size.width, height: data.size.height });
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const deltaX = e.clientX - resizeStartPos.x;
        const deltaY = e.clientY - resizeStartPos.y;
        
        const newWidth = Math.max(300, originalSize.width + deltaX);
        const newHeight = Math.max(200, originalSize.height + deltaY);
        
        onSizeChange({ width: newWidth, height: newHeight });
      }
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <motion.div
      className={`absolute rounded-lg overflow-hidden shadow-xl border border-gray-200 flex flex-col ${
        data.isActive ? 'z-10' : 'z-0'
      }`}
      style={{
        width: data.isMaximized ? '100vw' : data.size.width,
        height: data.isMaximized ? 'calc(100vh - 56px)' : data.size.height,
        top: data.isMaximized ? 0 : data.position.y,
        left: data.isMaximized ? 0 : data.position.x,
      }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      drag={!data.isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={(event, info) => {
        onPositionChange({ 
          x: data.position.x + info.offset.x, 
          y: data.position.y + info.offset.y 
        });
      }}
      onMouseDown={onActivate}
    >
      {/* Title bar */}
      <div 
        className={`h-10 flex items-center justify-between px-3 ${
          data.isActive ? 'bg-white' : 'bg-gray-100'
        }`}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.button === 0 && !data.isMaximized) {
            // Fix type issue by using the correct event type
            dragControls.start(e as unknown as React.PointerEvent<Element>);
          }
        }}
      >
        <div className="flex items-center">
          <div className="mr-2">{data.icon}</div>
          <div className="text-sm font-medium">{data.title}</div>
        </div>
        
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full hover:bg-gray-200"
          >
            <Minimize2 size={14} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full hover:bg-gray-200"
            onClick={onMaximize}
          >
            <Maximize2 size={14} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full hover:bg-red-100 hover:text-red-600"
            onClick={onClose}
          >
            <X size={14} />
          </Button>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 bg-white overflow-hidden">
        {data.content}
      </div>
      
      {/* Resize handle */}
      {!data.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </motion.div>
  );
};

export default Window;
