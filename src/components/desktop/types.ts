
import React from 'react';

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  icon: React.ReactNode;
}
