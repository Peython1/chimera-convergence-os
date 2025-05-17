import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  FolderOpen, 
  Terminal as TerminalIcon, 
  Code, 
  MonitorSmartphone, 
  Settings as SettingsIcon,
  Wifi
} from 'lucide-react';
import WifiManager from '../wifi/WifiManager';
import { WindowData } from './types';

export const generateWindow = (windowType: string, existingWindows: WindowData[]): WindowData | null => {
  // Check for existing window of this type
  const existingWindowOfType = existingWindows.find(window => 
    window.title.toLowerCase().includes(windowType.toLowerCase())
  );
  
  if (existingWindowOfType) {
    // If window already exists, return null - caller should focus the existing one
    return null;
  }
  
  // Calculate offset for cascade positioning
  const windowCount = existingWindows.length;
  const offsetX = (windowCount * 20) % 200;
  const offsetY = (windowCount * 20) % 200;
  
  // Default window properties
  const defaultProps = {
    id: uuidv4(),
    position: { x: 100 + offsetX, y: 100 + offsetY },
    size: { width: 800, height: 600 },
    isMinimized: false,
    isMaximized: false,
    isActive: true
  };
  
  // Return window configuration based on type
  switch (windowType.toLowerCase()) {
    case 'fileexplorer':
      return {
        ...defaultProps,
        title: 'File Explorer',
        icon: <FolderOpen size={16} />,
        content: (
          <div className="p-4">
            <h2 className="text-xl font-bold">File Explorer</h2>
            <p className="mt-2">This is a placeholder for the file explorer.</p>
          </div>
        )
      };
      
    case 'terminal':
      return {
        ...defaultProps,
        title: 'Terminal',
        icon: <TerminalIcon size={16} />,
        content: (
          <div className="bg-black text-green-400 h-full p-2 font-mono overflow-auto">
            <div>chimera@os:~$ _</div>
          </div>
        )
      };
      
    case 'store':
      return {
        ...defaultProps,
        title: 'App Store',
        icon: <Code size={16} />,
        content: (
          <div className="p-4">
            <h2 className="text-xl font-bold">App Store</h2>
            <p className="mt-2">Browse and install applications.</p>
          </div>
        )
      };
      
    case 'systemmonitor':
      return {
        ...defaultProps,
        title: 'System Monitor',
        icon: <MonitorSmartphone size={16} />,
        content: (
          <div className="p-4">
            <h2 className="text-xl font-bold">System Monitor</h2>
            <p className="mt-2">View system performance and resources.</p>
          </div>
        )
      };
      
    case 'settings':
      return {
        ...defaultProps,
        title: 'Settings',
        icon: <SettingsIcon size={16} />,
        content: (
          <div className="p-4">
            <h2 className="text-xl font-bold">Settings</h2>
            <p className="mt-2">Configure system settings.</p>
          </div>
        )
      };
      
    case 'wifimanager':
      return {
        ...defaultProps,
        title: 'Wi-Fi Manager',
        icon: <Wifi size={16} />,
        content: <WifiManager />
      };
      
    default:
      return {
        ...defaultProps,
        title: 'New Window',
        icon: <Code size={16} />,
        content: (
          <div className="p-4">
            <h2 className="text-xl font-bold">Unknown Window Type</h2>
            <p className="mt-2">Window type {windowType} is not recognized.</p>
          </div>
        )
      };
  }
};
