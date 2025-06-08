
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Settings, 
  Search, 
  Trash2, 
  Archive, 
  CheckCheck,
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useNotifications } from './hooks/useNotifications';
import { Notification } from './types';
import { format } from 'date-fns';

const NotificationCenter: React.FC = () => {
  const {
    notifications,
    unreadCount,
    settings,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    deleteNotification,
    clearAll,
    updateSettings,
  } = useNotifications();

  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'error':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Info className="text-blue-500" size={16} />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => (
    <div className={`p-4 border-b hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {getNotificationIcon(notification.type)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                {notification.title}
              </h4>
              <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                {notification.priority}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {notification.category}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
            <div className="text-xs text-gray-400">
              {format(notification.timestamp, 'MMM dd, yyyy HH:mm')}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          {!notification.isRead && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => markAsRead(notification.id)}
              className="w-6 h-6"
            >
              <CheckCheck size={12} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => archiveNotification(notification.id)}
            className="w-6 h-6"
          >
            <Archive size={12} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteNotification(notification.id)}
            className="w-6 h-6 text-red-500 hover:text-red-700"
          >
            <X size={12} />
          </Button>
        </div>
      </div>
    </div>
  );

  if (showSettings) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Notification Settings</h2>
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
            <X size={16} />
          </Button>
        </div>
        
        <div className="flex-1 p-4 space-y-6">
          <div>
            <h3 className="font-medium mb-3">General Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => updateSettings({ enabled: e.target.checked })}
                  className="rounded"
                />
                <span>Enable notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.showDesktopNotifications}
                  onChange={(e) => updateSettings({ showDesktopNotifications: e.target.checked })}
                  className="rounded"
                />
                <span>Show desktop notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                  className="rounded"
                />
                <span>Sound notifications</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-3">
              {Object.entries(settings.categories).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateSettings({
                      categories: { ...settings.categories, [key]: e.target.checked }
                    })}
                    className="rounded"
                  />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Priority Levels</h3>
            <div className="space-y-3">
              {Object.entries(settings.priority).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateSettings({
                      priority: { ...settings.priority, [key]: e.target.checked }
                    })}
                    className="rounded"
                  />
                  <span className="capitalize">{key} priority</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Bell size={20} />
          <h2 className="text-lg font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
            <Settings size={16} />
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-b">
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck size={14} className="mr-1" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Trash2 size={14} className="mr-1" />
              Clear All
            </Button>
          </div>
          <span className="text-sm text-gray-500">
            {filteredNotifications.length} notifications
          </span>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="flex-1 overflow-y-auto mt-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Bell size={48} className="mx-auto mb-4 opacity-50" />
                <p>No notifications found</p>
              </div>
            </div>
          ) : (
            <div>
              {filteredNotifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unread" className="flex-1 overflow-y-auto mt-0">
          <div>
            {filteredNotifications
              .filter(n => !n.isRead)
              .map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="flex-1 overflow-y-auto mt-0">
          <div>
            {filteredNotifications
              .filter(n => n.category === 'system')
              .map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="flex-1 overflow-y-auto mt-0">
          <div>
            {filteredNotifications
              .filter(n => n.category === 'security')
              .map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
