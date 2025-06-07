import { WindowData } from './types';
import { generateId } from '@/lib/utils';
import Browser from '../browser/Browser';
import Terminal from '../terminal/Terminal';
import SystemMonitor from '../system/SystemMonitor';
import Settings from '../settings/Settings';
import FileExplorer from '../file_explorer/FileExplorer';
import Store from '../store/Store';
import WifiManager from '../wifi/WifiManager';
import React from 'react';
import SystemDiagnostics from '../diagnostics/SystemDiagnostics';

export const generateWindow = (windowType: string, existingWindows: WindowData[]): WindowData | null => {
  const nextZIndex = existingWindows.length > 0
    ? existingWindows.reduce((max, window) => Math.max(max, window.zIndex || 0), 0) + 1
    : 1;

  if (windowType === 'browser' || windowType === 'Browser') {
    return {
      id: generateId(),
      title: 'Browser',
      content: 'browser',
      position: { x: 50, y: 50 },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: nextZIndex
    };
  } else if (windowType === 'terminal' || windowType === 'Terminal') {
    return {
      id: generateId(),
      title: 'Terminal',
      content: 'terminal',
      position: { x: 75, y: 75 },
      size: { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: nextZIndex
    };
  } else if (windowType === 'systemMonitor' || windowType === 'monitor') {
    return {
      id: generateId(),
      title: 'System Monitor',
      content: 'systemMonitor',
      position: { x: 100, y: 100 },
      size: { width: 700, height: 500 },
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: nextZIndex
    };
  } else if (windowType === 'settings' || windowType === 'Settings') {
    return {
      id: generateId(),
      title: 'Settings',
      content: 'settings',
      position: { x: 125, y: 125 },
      size: { width: 650, height: 550 },
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: nextZIndex
    };
  } else if (windowType === 'fileExplorer' || windowType === 'explorer') {
    return {
      id: generateId(),
      title: 'File Explorer',
      content: 'fileExplorer',
      position: { x: 150, y: 150 },
      size: { width: 850, height: 650 },
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: nextZIndex
    };
  } else if (windowType === 'store' || windowType === 'Store') {
    return {
      id: generateId(),
      title: 'App Store',
      content: 'store',
      position: { x: 175, y: 175 },
      size: { width: 750, height: 600 },
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: nextZIndex
    };
  } else if (windowType === 'wifiManager' || windowType === 'wifi') {
    return {
      id: generateId(),
      title: 'WiFi Manager',
      content: 'wifiManager',
      position: { x: 200, y: 200 },
      size: { width: 600, height: 500 },
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: nextZIndex
    };
  } else if (windowType === 'systemDiagnostics' || windowType === 'diagnostics') {
    return {
      id: generateId(),
      title: 'System Diagnostics',
      content: 'systemDiagnostics',
      position: { x: 100, y: 100 },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      zIndex: nextZIndex
    };
  }

  console.warn('Unknown window type:', windowType);
  return null;
};
