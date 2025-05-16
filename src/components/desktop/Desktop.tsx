
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Taskbar from './Taskbar';
import Sidebar from './Sidebar';
import Window from './Window';
import { DesktopIcon } from './DesktopIcon';
import { 
  FileText, 
  Folder, 
  Monitor, 
  Settings, 
  Terminal, 
  Store, 
  HardDrive, 
  Package 
} from 'lucide-react';

export interface WindowData {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  isActive: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
}

const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const createNewWindow = (windowType: string) => {
    let newWindow: WindowData;
    const id = `window-${Date.now()}`;
    const basePosition = { x: 100 + (windows.length * 20), y: 50 + (windows.length * 20) };
    
    switch(windowType) {
      case 'terminal':
        newWindow = {
          id,
          title: 'Chimera Terminal',
          icon: <Terminal size={16} />,
          content: <TerminalContent />,
          isActive: true,
          position: basePosition,
          size: { width: 800, height: 500 },
          isMaximized: false
        };
        break;
      case 'fileExplorer':
        newWindow = {
          id,
          title: 'File Explorer',
          icon: <Folder size={16} />,
          content: <FileExplorerContent />,
          isActive: true,
          position: basePosition,
          size: { width: 900, height: 600 },
          isMaximized: false
        };
        break;
      case 'settings':
        newWindow = {
          id,
          title: 'System Settings',
          icon: <Settings size={16} />,
          content: <SettingsContent />,
          isActive: true,
          position: basePosition,
          size: { width: 850, height: 650 },
          isMaximized: false
        };
        break;
      case 'store':
        newWindow = {
          id,
          title: 'Chimera Store',
          icon: <Store size={16} />,
          content: <StoreContent />,
          isActive: true,
          position: basePosition,
          size: { width: 1000, height: 700 },
          isMaximized: false
        };
        break;
      default:
        newWindow = {
          id,
          title: 'New Window',
          icon: <FileText size={16} />,
          content: <div className="p-4">Window Content</div>,
          isActive: true,
          position: basePosition,
          size: { width: 600, height: 400 },
          isMaximized: false
        };
    }
    
    // Set all other windows to inactive
    const updatedWindows = windows.map(window => ({
      ...window,
      isActive: false
    }));
    
    setActiveWindowId(id);
    setWindows([...updatedWindows, newWindow]);
    setShowStartMenu(false);
  };
  
  const activateWindow = (id: string) => {
    const updatedWindows = windows.map(window => ({
      ...window,
      isActive: window.id === id
    }));
    
    setActiveWindowId(id);
    setWindows(updatedWindows);
  };
  
  const closeWindow = (id: string) => {
    const filteredWindows = windows.filter(window => window.id !== id);
    setWindows(filteredWindows);
    
    if (activeWindowId === id && filteredWindows.length > 0) {
      setActiveWindowId(filteredWindows[filteredWindows.length - 1].id);
      
      // Set the last window to active
      const updatedWindows = [...filteredWindows];
      updatedWindows[updatedWindows.length - 1].isActive = true;
      setWindows(updatedWindows);
    } else if (filteredWindows.length === 0) {
      setActiveWindowId(null);
    }
  };
  
  const toggleMaximize = (id: string) => {
    const updatedWindows = windows.map(window => {
      if (window.id === id) {
        return {
          ...window,
          isMaximized: !window.isMaximized
        };
      }
      return window;
    });
    
    setWindows(updatedWindows);
  };
  
  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    const updatedWindows = windows.map(window => {
      if (window.id === id) {
        return {
          ...window,
          position
        };
      }
      return window;
    });
    
    setWindows(updatedWindows);
  };
  
  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    const updatedWindows = windows.map(window => {
      if (window.id === id) {
        return {
          ...window,
          size
        };
      }
      return window;
    });
    
    setWindows(updatedWindows);
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-gradient-to-br from-chimera-light to-blue-50 flex flex-col"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%235D4FD8' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Desktop Icons */}
      <div className="flex-1 p-4 grid grid-cols-12 gap-2">
        <div className="col-span-1">
          <DesktopIcon 
            icon={<Folder size={32} />}
            label="File Explorer"
            onClick={() => createNewWindow('fileExplorer')}
          />
          
          <DesktopIcon 
            icon={<Terminal size={32} />}
            label="Terminal"
            onClick={() => createNewWindow('terminal')}
          />
          
          <DesktopIcon 
            icon={<Store size={32} />}
            label="Chimera Store"
            onClick={() => createNewWindow('store')}
          />
          
          <DesktopIcon 
            icon={<Settings size={32} />}
            label="Settings"
            onClick={() => createNewWindow('settings')}
          />
          
          <DesktopIcon 
            icon={<Monitor size={32} />}
            label="System Monitor"
            onClick={() => createNewWindow('systemMonitor')}
          />
        </div>
        
        {/* Windows */}
        {windows.map((window) => (
          <Window
            key={window.id}
            data={window}
            onActivate={() => activateWindow(window.id)}
            onClose={() => closeWindow(window.id)}
            onMaximize={() => toggleMaximize(window.id)}
            onPositionChange={(position) => updateWindowPosition(window.id, position)}
            onSizeChange={(size) => updateWindowSize(window.id, size)}
          />
        ))}
      </div>
      
      {/* Sidebar (slide in from right) */}
      {showSidebar && (
        <Sidebar onClose={() => setShowSidebar(false)} />
      )}
      
      {/* Taskbar */}
      <Taskbar 
        windows={windows}
        activeWindowId={activeWindowId}
        onActivateWindow={activateWindow}
        onCreateWindow={createNewWindow}
        showStartMenu={showStartMenu}
        onToggleStartMenu={() => setShowStartMenu(!showStartMenu)}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
      />
    </div>
  );
};

// Terminal Content Component
const TerminalContent: React.FC = () => {
  const [output, setOutput] = useState<string[]>([
    'Chimera OS [Version 1.0.0-hybrid]',
    '(c) 2025 Chimera OS Team. All rights reserved.',
    '',
    'user@chimera-os:~$ _'
  ]);
  
  return (
    <div className="bg-black text-green-500 p-4 h-full font-mono text-sm overflow-y-auto">
      {output.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

// File Explorer Content Component
const FileExplorerContent: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Navigation bar */}
      <div className="bg-gray-100 p-2 flex items-center space-x-2 border-b">
        <button className="p-1 hover:bg-gray-200 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 9 12 18 21 9"/>
          </svg>
        </button>
        <div className="bg-white flex-1 border rounded px-3 py-1 text-sm flex items-center">
          /home/user
        </div>
        <button className="p-1 hover:bg-gray-200 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r p-2 overflow-y-auto">
          <div className="text-xs text-gray-500 mb-1 uppercase font-semibold">Quick Access</div>
          <div className="space-y-1">
            <div className="flex items-center p-1 hover:bg-gray-200 rounded cursor-pointer text-sm">
              <svg className="mr-1 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 3v18"/>
                <path d="M13 3v18"/>
              </svg>
              Desktop
            </div>
            <div className="flex items-center p-1 hover:bg-gray-200 rounded cursor-pointer text-sm">
              <svg className="mr-1 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Users
            </div>
            <div className="flex items-center p-1 hover:bg-gray-200 rounded cursor-pointer text-sm">
              <svg className="mr-1 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Downloads
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mb-1 mt-4 uppercase font-semibold">Devices</div>
          <div className="space-y-1">
            <div className="flex items-center p-1 hover:bg-gray-200 rounded cursor-pointer text-sm">
              <svg className="mr-1 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 5H3v14h18V5z"/>
                <path d="M16 2v3"/>
                <path d="M8 2v3"/>
                <path d="M3 10h18"/>
              </svg>
              System (C:)
            </div>
            <div className="flex items-center p-1 hover:bg-gray-200 rounded cursor-pointer text-sm">
              <svg className="mr-1 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 5H3v14h18V5z"/>
                <path d="M16 2v3"/>
                <path d="M8 2v3"/>
                <path d="M3 10h18"/>
              </svg>
              Data (D:)
            </div>
          </div>
        </div>
        
        {/* File list */}
        <div className="flex-1 p-2 overflow-auto grid grid-cols-5 gap-2">
          <div className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded cursor-pointer">
            <div className="w-16 h-16 flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
            </div>
            <div className="text-xs mt-1 text-center">Documents</div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded cursor-pointer">
            <div className="w-16 h-16 flex items-center justify-center text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className="text-xs mt-1 text-center">Projects</div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded cursor-pointer">
            <div className="w-16 h-16 flex items-center justify-center text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="text-xs mt-1 text-center">report.xlsx</div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded cursor-pointer">
            <div className="w-16 h-16 flex items-center justify-center text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="text-xs mt-1 text-center">presentation.pptx</div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded cursor-pointer">
            <div className="w-16 h-16 flex items-center justify-center text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 13v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/>
                <path d="M19 9l-7 6-7-6"/>
              </svg>
            </div>
            <div className="text-xs mt-1 text-center">Downloads</div>
          </div>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="bg-gray-100 p-1 text-xs border-t flex justify-between text-gray-600">
        <div>5 items</div>
        <div>203.5 MB available</div>
      </div>
    </div>
  );
};

// Settings Content Component
const SettingsContent: React.FC = () => {
  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4 overflow-y-auto">
        <div className="text-lg font-medium mb-4">Settings</div>
        <div className="space-y-1">
          <div className="flex items-center p-2 bg-blue-100 text-blue-800 rounded cursor-pointer">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            System
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
              <rect x="9" y="9" width="6" height="6"/>
              <line x1="9" y1="1" x2="9" y2="4"/>
              <line x1="15" y1="1" x2="15" y2="4"/>
              <line x1="9" y1="20" x2="9" y2="23"/>
              <line x1="15" y1="20" x2="15" y2="23"/>
              <line x1="20" y1="9" x2="23" y2="9"/>
              <line x1="20" y1="14" x2="23" y2="14"/>
              <line x1="1" y1="9" x2="4" y2="9"/>
              <line x1="1" y1="14" x2="4" y2="14"/>
            </svg>
            Kernel & Virtualization
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Accounts
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Personalization
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Updates
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Display
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            Time & Language
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Privacy
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">System Settings</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Kernel Configuration</h2>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-medium">Hybrid Kernel Mode</div>
                <div className="text-sm text-gray-500">Windows NT + Linux kernel integration</div>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full p-1 flex justify-end cursor-pointer">
                <div className="bg-white w-4 h-4 rounded-full"></div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="font-medium mb-2">Memory Allocation Priority</div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-full w-3/5 bg-blue-600 rounded"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <div>Windows Apps</div>
                <div>Linux Processes</div>
              </div>
            </div>
            
            <div>
              <div className="font-medium mb-2">Virtualization Technology</div>
              <select className="w-full p-2 border rounded">
                <option>Auto (Recommended)</option>
                <option>Hyper-V Compatible</option>
                <option>KVM Compatible</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">System Information</h2>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-600">OS Name</td>
                  <td className="py-2 font-medium">Chimera OS</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Version</td>
                  <td className="py-2 font-medium">1.0.0-hybrid</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Kernel</td>
                  <td className="py-2 font-medium">Hybrid 5.15</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">System Type</td>
                  <td className="py-2 font-medium">64-bit Operating System</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Processor</td>
                  <td className="py-2 font-medium">Intel Core i7-13700K</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">RAM</td>
                  <td className="py-2 font-medium">32.0 GB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Store Content Component
const StoreContent: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Chimera Store</h1>
        <p className="opacity-80">Universal package manager for Windows and Linux applications</p>
        
        {/* Search bar */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search apps, packages, and libraries..."
            className="w-full p-3 pl-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60"
          />
          <svg 
            className="absolute top-3.5 left-3 text-white/70"
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Categories */}
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          <div className="p-2 px-4 bg-blue-100 text-blue-800 rounded-full text-sm font-medium whitespace-nowrap">
            All Apps
          </div>
          <div className="p-2 px-4 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 cursor-pointer whitespace-nowrap">
            Featured
          </div>
          <div className="p-2 px-4 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 cursor-pointer whitespace-nowrap">
            Windows Apps
          </div>
          <div className="p-2 px-4 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 cursor-pointer whitespace-nowrap">
            Linux Packages
          </div>
          <div className="p-2 px-4 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 cursor-pointer whitespace-nowrap">
            Developer Tools
          </div>
          <div className="p-2 px-4 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 cursor-pointer whitespace-nowrap">
            Productivity
          </div>
          <div className="p-2 px-4 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 cursor-pointer whitespace-nowrap">
            Entertainment
          </div>
        </div>
        
        {/* Featured */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Software</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                </svg>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Chimera Studio</h3>
                    <div className="text-sm text-gray-500">Development IDE</div>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Free</div>
                </div>
                <div className="mt-2 text-sm">Universal development environment with Windows and Linux tools integration.</div>
                <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Install</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  <path d="M18 14h-8"/>
                  <path d="M15 18h-5"/>
                  <path d="M10 6h8v4h-8V6Z"/>
                </svg>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Hybrid Office</h3>
                    <div className="text-sm text-gray-500">Productivity Suite</div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Free Trial</div>
                </div>
                <div className="mt-2 text-sm">Complete office suite that works with all document formats.</div>
                <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Install</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-green-600 to-green-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Chimera Secure</h3>
                    <div className="text-sm text-gray-500">Security & Antivirus</div>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Premium</div>
                </div>
                <div className="mt-2 text-sm">Combines Windows Defender and Linux security for complete protection.</div>
                <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Purchase</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recently Updated */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recently Updated</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center">
              <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M7 7h.01"/>
                  <path d="M11 7h.01"/>
                  <path d="M15 7h.01"/>
                  <path d="M7 11h.01"/>
                  <path d="M11 11h.01"/>
                  <path d="M15 11h.01"/>
                  <path d="M7 15h.01"/>
                  <path d="M11 15h.01"/>
                  <path d="M15 15h.01"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">TensorFlow for Chimera</h3>
                  <div className="text-xs text-gray-500">Updated 2 days ago</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Machine learning framework optimized for hybrid kernel</div>
              </div>
              <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/>
                  <line x1="9" y1="9" x2="9" y2="21"/>
                  <line x1="15" y1="9" x2="15" y2="21"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Visual Studio Chimera Edition</h3>
                  <div className="text-xs text-gray-500">Updated 3 days ago</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">IDE with integrated Linux debugging and WSL support</div>
              </div>
              <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">GIMP Pro</h3>
                  <div className="text-xs text-gray-500">Updated 5 days ago</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Image editor with enhanced Windows GPU acceleration</div>
              </div>
              <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
