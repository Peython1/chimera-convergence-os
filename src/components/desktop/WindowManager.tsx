
import React from 'react';
import Window from './Window';
import { WindowData } from './types';

interface WindowManagerProps {
  windows: WindowData[];
  activeWindowId: string | null;
  onActivateWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
  onUpdateSize: (id: string, size: { width: number; height: number }) => void;
}

const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  activeWindowId,
  onActivateWindow,
  onCloseWindow,
  onMaximizeWindow,
  onUpdatePosition,
  onUpdateSize,
}) => {
  return (
    <>
      {windows.map(window => !window.isMinimized && (
        <Window
          key={window.id}
          data={window}
          onClose={() => onCloseWindow(window.id)}
          onMaximize={() => onMaximizeWindow(window.id)}
          onPositionChange={(newPos) => onUpdatePosition(window.id, newPos)}
          onSizeChange={(newSize) => onUpdateSize(window.id, newSize)}
          onActivate={() => onActivateWindow(window.id)}
        />
      ))}
    </>
  );
};

export default WindowManager;
