
import React from 'react';
import { DesktopIcon } from './DesktopIcon';
import { Terminal, Folder, Settings, Store, MonitorPlay } from 'lucide-react';

interface DesktopIconsProps {
  onCreateWindow: (windowType: string) => void;
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({ onCreateWindow }) => {
  const iconConfigs = [
    { icon: <Terminal size={28} className="text-white" />, label: "Terminal", type: "terminal" },
    { icon: <Folder size={28} className="text-white" />, label: "File Explorer", type: "fileexplorer" },
    { icon: <Settings size={28} className="text-white" />, label: "Settings", type: "settings" },
    { icon: <Store size={28} className="text-white" />, label: "App Store", type: "store" },
    { icon: <MonitorPlay size={28} className="text-white" />, label: "System Monitor", type: "systemmonitor" },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 w-28">
      {iconConfigs.map((config, index) => (
        <DesktopIcon
          key={index}
          icon={config.icon}
          label={config.label}
          onClick={() => onCreateWindow(config.type)}
        />
      ))}
    </div>
  );
};

export default DesktopIcons;
