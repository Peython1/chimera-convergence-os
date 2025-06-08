
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  isRead: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'system' | 'app' | 'security' | 'update';
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'default' | 'destructive';
}

export interface NotificationSettings {
  enabled: boolean;
  showDesktopNotifications: boolean;
  soundEnabled: boolean;
  categories: {
    system: boolean;
    app: boolean;
    security: boolean;
    update: boolean;
  };
  priority: {
    low: boolean;
    medium: boolean;
    high: boolean;
  };
}
