
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MythologicalNotificationProps {
  isVisible: boolean;
  title: string;
  message: string;
  type: 'oracle' | 'warning' | 'blessing';
  onClose: () => void;
}

export const MythologicalNotification: React.FC<MythologicalNotificationProps> = ({
  isVisible,
  title,
  message,
  type,
  onClose
}) => {
  const getThemeColors = () => {
    switch (type) {
      case 'oracle':
        return {
          bg: 'from-purple-900 to-indigo-800',
          border: 'border-purple-400',
          glow: 'shadow-purple-500/50'
        };
      case 'warning':
        return {
          bg: 'from-red-900 to-orange-800',
          border: 'border-red-400',
          glow: 'shadow-red-500/50'
        };
      case 'blessing':
        return {
          bg: 'from-yellow-900 to-amber-800',
          border: 'border-yellow-400',
          glow: 'shadow-yellow-500/50'
        };
      default:
        return {
          bg: 'from-gray-900 to-gray-800',
          border: 'border-gray-400',
          glow: 'shadow-gray-500/50'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -100, rotateX: -90 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className={`fixed top-4 right-4 z-50 max-w-md p-6 rounded-lg border-2 ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-sm ${colors.glow} shadow-2xl ancient-text`}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 0L24 16L40 20L24 24L20 40L16 24L0 20L16 16Z" fill="rgba(255,215,0,0.1)"/%3E%3C/svg%3E")'
          }}
        >
          {/* Papyrus-like texture overlay */}
          <div className="absolute inset-0 rounded-lg opacity-10 bg-gradient-to-br from-yellow-200 to-amber-300" 
               style={{
                 backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,.1) 2px, rgba(0,0,0,.1) 4px)'
               }} 
          />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-golden ancient-text">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-golden hover:text-yellow-300 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-golden-200 leading-relaxed ancient-text">
              {message}
            </p>
            
            {/* Decorative elements */}
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-golden to-transparent" />
            </div>
          </div>
          
          {/* Glowing border animation */}
          <div className="absolute inset-0 rounded-lg border border-golden-400 opacity-50 animate-pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
