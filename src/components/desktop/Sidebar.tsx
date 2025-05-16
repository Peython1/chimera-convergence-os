
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Bell, Calendar, Wifi, Moon, Sun, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <motion.div
      className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg border-l z-50"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-medium">Notifications & Actions</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4">
        <div className="mb-2 text-sm text-gray-500">Quick Actions</div>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors">
            <Wifi size={20} />
            <div className="text-xs mt-1">WiFi</div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors">
            <Moon size={20} />
            <div className="text-xs mt-1">Night</div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors">
            <Sun size={20} />
            <div className="text-xs mt-1">Bright</div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors">
            <Bell size={20} />
            <div className="text-xs mt-1">Focus</div>
          </div>
        </div>
      </div>
      
      {/* Brightness Slider */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-500">Brightness</div>
          <Sun size={16} className="text-gray-500" />
        </div>
        <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
      </div>
      
      {/* Volume Slider */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-500">Volume</div>
          <Volume2 size={16} className="text-gray-500" />
        </div>
        <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
      </div>
      
      {/* Notifications */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">Notifications</div>
          <Button variant="outline" size="sm" className="text-xs h-7">Clear all</Button>
        </div>
        
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="flex justify-between">
              <div className="text-sm font-medium">System Update</div>
              <div className="text-xs text-gray-500">10:30 AM</div>
            </div>
            <div className="text-xs text-gray-600 mt-1">Kernel update 5.15-hybrid is available. Install to enhance system performance.</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="flex justify-between">
              <div className="text-sm font-medium">Security Alert</div>
              <div className="text-xs text-gray-500">Yesterday</div>
            </div>
            <div className="text-xs text-gray-600 mt-1">Windows driver integrity checks completed successfully.</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="flex justify-between">
              <div className="text-sm font-medium">Calendar</div>
              <div className="text-xs text-gray-500">Yesterday</div>
            </div>
            <div className="text-xs text-gray-600 mt-1">Meeting with Development Team at 2:00 PM.</div>
          </div>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="p-4 border-t">
        <div className="flex items-center mb-3">
          <Calendar size={16} className="mr-2 text-gray-600" />
          <div className="font-medium">Calendar</div>
        </div>
        
        <div className="text-sm">
          <div className="font-medium">June 16, 2025</div>
          <div className="text-gray-500 mt-1">No upcoming events today</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
