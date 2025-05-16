
import React from 'react';
import { WindowData } from './types';
import {
  Terminal,
  Folder,
  Settings,
  Store,
  MonitorPlay,
  FileText,
  ImageIcon
} from 'lucide-react';

export const generateWindowId = (): string => 
  `window-${Math.random().toString(36).substr(2, 9)}`;

export const generateWindow = (windowType: string, windows: WindowData[]): WindowData | null => {
  const id = generateWindowId();
  const windowOffset = windows.length * 30;
  
  switch (windowType.toLowerCase()) {
    case 'terminal':
      return {
        id,
        title: 'Terminal',
        content: (
          <div className="bg-black text-green-400 h-full p-2 font-mono overflow-auto">
            <div>chimera@os:~$ _</div>
          </div>
        ),
        position: { x: 100 + windowOffset, y: 100 + windowOffset },
        size: { width: 600, height: 400 },
        isMinimized: false,
        isMaximized: false,
        isActive: true,
        icon: <Terminal size={16} />
      };
    
    case 'fileexplorer':
      return {
        id,
        title: 'File Explorer',
        content: (
          <div className="bg-white h-full p-2 overflow-auto">
            <div className="flex items-center space-x-4 border-b pb-2">
              <button className="p-1 hover:bg-gray-200 rounded">
                <Folder size={16} />
              </button>
              <div className="flex-1 bg-gray-100 rounded px-2 py-1 text-sm">
                /home/user
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-2">
              {['Documents', 'Downloads', 'Pictures', 'Music'].map((folder) => (
                <div 
                  key={folder}
                  className="flex flex-col items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <Folder size={32} className="text-blue-500 mb-1" />
                  <span className="text-xs">{folder}</span>
                </div>
              ))}
            </div>
          </div>
        ),
        position: { x: 150 + windowOffset, y: 120 + windowOffset },
        size: { width: 700, height: 500 },
        isMinimized: false,
        isMaximized: false,
        isActive: true,
        icon: <Folder size={16} />
      };
    
    case 'settings':
      return {
        id,
        title: 'Settings',
        content: (
          <div className="bg-gray-100 h-full p-4 overflow-auto">
            <h2 className="text-xl font-bold mb-4">System Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer">
                <h3 className="font-medium mb-1">Appearance</h3>
                <p className="text-sm text-gray-500">Theme, colors, and effects</p>
              </div>
              <div className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer">
                <h3 className="font-medium mb-1">Security</h3>
                <p className="text-sm text-gray-500">Passwords and authentication</p>
              </div>
              <div className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer">
                <h3 className="font-medium mb-1">Network</h3>
                <p className="text-sm text-gray-500">WiFi, ethernet, and VPN</p>
              </div>
              <div className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer">
                <h3 className="font-medium mb-1">Storage</h3>
                <p className="text-sm text-gray-500">Drives and file systems</p>
              </div>
            </div>
          </div>
        ),
        position: { x: 200 + windowOffset, y: 140 + windowOffset },
        size: { width: 650, height: 450 },
        isMinimized: false,
        isMaximized: false,
        isActive: true,
        icon: <Settings size={16} />
      };
    
    case 'store':
      return {
        id,
        title: 'App Store',
        content: (
          <div className="bg-white h-full overflow-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <h2 className="text-xl font-bold">Chimera App Store</h2>
              <p className="text-sm opacity-90">Compatible with Windows and Linux apps</p>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-3">Featured Apps</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Code Editor', icon: <FileText size={32} className="mb-1" /> },
                  { name: 'Media Player', icon: <MonitorPlay size={32} className="mb-1" /> },
                  { name: 'Photo Suite', icon: <ImageIcon size={32} className="mb-1" /> }
                ].map((app, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center bg-gray-50 p-3 rounded border hover:border-blue-400 cursor-pointer"
                  >
                    {app.icon}
                    <span className="text-sm">{app.name}</span>
                    <button className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
                      Install
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
        position: { x: 250 + windowOffset, y: 160 + windowOffset },
        size: { width: 720, height: 480 },
        isMinimized: false,
        isMaximized: false,
        isActive: true,
        icon: <Store size={16} />
      };
    
    case 'systemmonitor':
      return {
        id,
        title: 'System Monitor',
        content: (
          <div className="bg-black h-full p-4 text-green-400 font-mono overflow-auto">
            <h2 className="text-xl mb-4 border-b border-green-600 pb-2">System Resources</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>CPU Usage:</span>
                  <span>32%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Memory:</span>
                  <span>2.4GB / 8GB</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Disk:</span>
                  <span>120GB / 500GB</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm border-b border-green-600 mt-4 pb-1 mb-2">Processes</h3>
                <div className="text-xs">
                  <div className="grid grid-cols-4 gap-2 font-bold mb-1">
                    <div>PID</div>
                    <div>Process</div>
                    <div>CPU</div>
                    <div>Memory</div>
                  </div>
                  {[
                    { pid: 1234, name: 'system', cpu: '0.2%', mem: '120MB' },
                    { pid: 2345, name: 'browser', cpu: '12%', mem: '450MB' },
                    { pid: 3456, name: 'terminal', cpu: '0.1%', mem: '45MB' },
                    { pid: 4567, name: 'chimera-core', cpu: '1.5%', mem: '280MB' },
                  ].map((proc, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 hover:bg-gray-800">
                      <div>{proc.pid}</div>
                      <div>{proc.name}</div>
                      <div>{proc.cpu}</div>
                      <div>{proc.mem}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
        position: { x: 300 + windowOffset, y: 180 + windowOffset },
        size: { width: 650, height: 450 },
        isMinimized: false,
        isMaximized: false,
        isActive: true,
        icon: <MonitorPlay size={16} />
      };
      
    case 'browser':
      return {
        id,
        title: 'Web Browser',
        content: (
          <div className="bg-white h-full flex flex-col">
            <div className="flex items-center bg-gray-100 p-2 space-x-2">
              <div className="flex-1 bg-white rounded-full px-3 py-1 border text-sm">
                https://chimera-os.com
              </div>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">Welcome to Chimera OS</h2>
                <p className="text-gray-600 mb-4">The power of Windows and Linux combined</p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">Documentation</button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        ),
        position: { x: 350 + windowOffset, y: 200 + windowOffset },
        size: { width: 800, height: 600 },
        isMinimized: false,
        isMaximized: false,
        isActive: true,
        icon: <FileText size={16} />
      };
    
    default:
      return null;
  }
};
