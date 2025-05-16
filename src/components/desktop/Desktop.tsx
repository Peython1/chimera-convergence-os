
import React, { useState } from 'react';
import Taskbar from './Taskbar';
import Sidebar from './Sidebar';
import WindowManager from './WindowManager';
import DesktopIcons from './DesktopIcons';
import { WindowData } from './types';
import { generateWindow } from './windowUtils';

const Desktop: React.FC = () => {
  // State for windows, active window, start menu and sidebar
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Create new window function
  const createWindow = (windowType: string) => {
    const newWindow = generateWindow(windowType, windows);
    
    if (newWindow) {
      setWindows([...windows, newWindow]);
      setActiveWindowId(newWindow.id);
    }
  };

  // Close window function
  const closeWindow = (id: string) => {
    setWindows(windows.filter(window => window.id !== id));
    if (activeWindowId === id) {
      const remainingWindows = windows.filter(window => window.id !== id);
      setActiveWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  // Minimize/maximize window
  const toggleMinimize = (id: string) => {
    setWindows(windows.map(window => 
      window.id === id 
        ? { ...window, isMinimized: !window.isMinimized }
        : window
    ));
    
    if (activeWindowId === id) {
      const unminimizedWindows = windows.filter(window => !window.isMinimized && window.id !== id);
      setActiveWindowId(unminimizedWindows.length > 0 ? unminimizedWindows[unminimizedWindows.length - 1].id : null);
    }
  };

  // Toggle maximize window
  const toggleMaximize = (id: string) => {
    setWindows(windows.map(window => 
      window.id === id 
        ? { ...window, isMaximized: !window.isMaximized }
        : window
    ));
  };

  // Update window position
  const updateWindowPosition = (id: string, position: { x: number, y: number }) => {
    setWindows(windows.map(window => 
      window.id === id 
        ? { ...window, position }
        : window
    ));
  };

  // Update window size
  const updateWindowSize = (id: string, size: { width: number, height: number }) => {
    setWindows(windows.map(window => 
      window.id === id 
        ? { ...window, size }
        : window
    ));
  };

  // Set active window
  const setActiveWindow = (id: string) => {
    setActiveWindowId(id);
    
    // Update the isActive state for all windows
    setWindows(windows.map(window => ({
      ...window,
      isActive: window.id === id
    })));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[url('/wallpaper.jpg')] bg-cover bg-center relative flex flex-col">
      {/* Desktop area with icons */}
      <div className="flex-1 overflow-hidden p-4">
        <DesktopIcons onCreateWindow={createWindow} />
        
        {/* Windows */}
        <WindowManager
          windows={windows}
          activeWindowId={activeWindowId}
          onActivateWindow={setActiveWindow}
          onCloseWindow={closeWindow}
          onMaximizeWindow={toggleMaximize}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        />
      </div>
      
      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onActivateWindow={setActiveWindow}
        onCreateWindow={createWindow}
        showStartMenu={showStartMenu}
        onToggleStartMenu={() => {
          setShowStartMenu(!showStartMenu);
          if (!showStartMenu) setShowSidebar(false);
        }}
        onToggleSidebar={() => {
          setShowSidebar(!showSidebar);
          if (!showSidebar) setShowStartMenu(false);
        }}
      />
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)} 
      />
    </div>
  );
};

export default Desktop;
