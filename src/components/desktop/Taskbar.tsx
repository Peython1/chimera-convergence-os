
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowData } from './types';
import { 
  ChevronUp, 
  Bell, 
  Volume2,
  LayoutGrid,
  Monitor,
  Terminal,
  Settings,
  Folder,
  Store,
  Search,
  Wifi
} from 'lucide-react';
import { Clock } from '../shared/Clock';
import { ChimeraLogo } from '../shared/ChimeraLogo';
import { Button } from '@/components/ui/button';
import WifiStatusIndicator from '../wifi/WifiStatusIndicator';

interface TaskbarProps {
  windows: WindowData[];
  activeWindowId: string | null;
  onActivateWindow: (id: string) => void;
  onCreateWindow: (windowType: string) => void;
  showStartMenu: boolean;
  onToggleStartMenu: () => void;
  onToggleSidebar: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onActivateWindow,
  onCreateWindow,
  showStartMenu,
  onToggleStartMenu,
  onToggleSidebar
}) => {
  return (
    <div className="h-14 bg-white border-t flex items-center px-4 z-50">
      {/* Start button */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/10"
          onClick={onToggleStartMenu}
        >
          <ChimeraLogo className="w-7 h-7" />
        </Button>
      </div>
      
      {/* Search */}
      <div className="ml-2 relative">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center px-3"
          onClick={() => {}}
        >
          <Search size={16} className="mr-1" />
          <span className="text-sm">Search</span>
        </Button>
      </div>
      
      {/* Running apps */}
      <div className="ml-4 flex items-center space-x-1 flex-1">
        {[
          { icon: <Monitor size={18} />, type: 'fileExplorer' },
          { icon: <Terminal size={18} />, type: 'terminal' },
          { icon: <Store size={18} />, type: 'store' },
          { icon: <Settings size={18} />, type: 'settings' },
          { icon: <Wifi size={18} />, type: 'wifiManager' }
        ].map((app, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`rounded-md hover:bg-gray-200 relative ${
              windows.some(window => window.title.toLowerCase().includes(app.type)) ? 'bg-gray-100' : ''
            }`}
            onClick={() => {
              const existingWindow = windows.find(window => window.title.toLowerCase().includes(app.type));
              if (existingWindow) {
                onActivateWindow(existingWindow.id);
              } else {
                onCreateWindow(app.type);
              }
            }}
          >
            {app.icon}
            {windows.some(window => window.title.toLowerCase().includes(app.type)) && (
              <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
            )}
          </Button>
        ))}
      </div>
      
      {/* System tray */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-200"
          onClick={onToggleSidebar}
        >
          <Bell size={18} />
        </Button>
        
        <WifiStatusIndicator 
          onOpenWifiManager={() => {
            const existingWindow = windows.find(window => window.title.toLowerCase().includes('wifi'));
            if (existingWindow) {
              onActivateWindow(existingWindow.id);
            } else {
              onCreateWindow('wifiManager');
            }
          }} 
        />
        
        <div className="flex items-center px-2 py-1 rounded-md hover:bg-gray-200 cursor-pointer mx-1">
          <Volume2 size={16} className="text-gray-600" />
        </div>
        
        <div className="ml-2 border-l pl-2">
          <Clock />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 rounded-full hover:bg-gray-200"
        >
          <ChevronUp size={18} />
        </Button>
      </div>
      
      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 bottom-14 w-96 bg-white rounded-lg shadow-xl border overflow-hidden z-50"
          >
            <div className="p-4">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type to search"
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm"
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs uppercase text-gray-500 font-semibold mb-2">Pinned</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Terminal', icon: <Terminal size={24} />, type: 'terminal' },
                    { name: 'File Explorer', icon: <Folder size={24} />, type: 'fileExplorer' },
                    { name: 'Store', icon: <Store size={24} />, type: 'store' },
                    { name: 'Settings', icon: <Settings size={24} />, type: 'settings' },
                    { name: 'Browser', icon: <LayoutGrid size={24} />, type: 'browser' },
                    { name: 'Monitor', icon: <Monitor size={24} />, type: 'systemMonitor' },
                  ].map((app, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        onCreateWindow(app.type);
                        onToggleStartMenu();
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                        {app.icon}
                      </div>
                      <div className="text-xs">{app.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-xs uppercase text-gray-500 font-semibold mb-2">Recommended</div>
                <div className="space-y-1">
                  {[
                    'Visual Studio',
                    'Chimera Office',
                    'Python 3.10',
                    'Docker Desktop',
                    'Firefox Developer'
                  ].map((app, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-500 text-xs">{app.charAt(0)}</span>
                      </div>
                      <span className="text-sm">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-3 flex items-center justify-between mt-2 border-t">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                  U
                </div>
                <span className="text-sm font-medium">User</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-200"
                onClick={() => {
                  onCreateWindow('settings');
                  onToggleStartMenu();
                }}
              >
                <Settings size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Taskbar;
