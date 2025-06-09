import { useState, useCallback, useEffect } from 'react';
import type { Notification, NotificationSettings } from '../types';
import { generateId } from '@/lib/utils';

const defaultSettings: NotificationSettings = {
  enabled: true,
  showDesktopNotifications: true,
  soundEnabled: true,
  categories: {
    system: true,
    app: true,
    security: true,
    update: true,
  },
  priority: {
    low: true,
    medium: true,
    high: true,
  },
};

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'System Update Available',
    message: 'A new system update is available for download.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    isArchived: false,
    priority: 'medium',
    category: 'update',
  },
  {
    id: '2',
    title: 'Security Alert',
    message: 'Suspicious login attempt detected from unknown device.',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: false,
    isArchived: false,
    priority: 'high',
    category: 'security',
  },
  {
    id: '3',
    title: 'App Installed',
    message: 'Visual Studio Code has been successfully installed.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isRead: true,
    isArchived: false,
    priority: 'low',
    category: 'app',
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

  const addNotification = useCallback((
    title: string,
    message: string,
    type: Notification['type'] = 'info',
    priority: Notification['priority'] = 'medium',
    category: Notification['category'] = 'system'
  ) => {
    const notification: Notification = {
      id: generateId(),
      title,
      message,
      type,
      timestamp: new Date(),
      isRead: false,
      isArchived: false,
      priority,
      category,
    };

    setNotifications(prev => [notification, ...prev]);

    // Show desktop notification if enabled
    if (settings.showDesktopNotifications && settings.enabled) {
      if ('Notification' in window) {
        new Notification(title, {
          body: message,
          icon: '/favicon.ico',
        });
      }
    }

    return notification.id;
  }, [settings]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  const archiveNotification = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isArchived: true, isRead: true }
          : notification
      )
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead && !n.isArchived).length;
  const visibleNotifications = notifications.filter(n => !n.isArchived);

  return {
    notifications: visibleNotifications,
    unreadCount,
    settings,
    addNotification,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    deleteNotification,
    clearAll,
    updateSettings,
  };
};
