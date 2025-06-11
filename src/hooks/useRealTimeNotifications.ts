
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { systemService, NotificationData } from '@/services/systemService';

export function useRealTimeNotifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch initial notifications
    fetchNotifications();

    // Set up real-time subscription
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const newNotification = payload.new as NotificationData;
          setNotifications(prev => [newNotification, ...prev]);
          if (!newNotification.is_read) {
            setUnreadCount(prev => prev + 1);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const updatedNotification = payload.new as NotificationData;
          setNotifications(prev => 
            prev.map(notif => 
              notif.id === updatedNotification.id ? updatedNotification : notif
            )
          );
          
          // Recalculate unread count
          setNotifications(current => {
            const unread = current.filter(n => !n.is_read).length;
            setUnreadCount(unread);
            return current;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching notifications:', error);
      return;
    }

    setNotifications(data || []);
    setUnreadCount(data?.filter(n => !n.is_read).length || 0);
  };

  const markAsRead = async (id: string) => {
    await systemService.markNotificationAsRead(id);
  };

  const createNotification = async (notification: Omit<NotificationData, 'id' | 'created_at' | 'is_read' | 'is_archived'>) => {
    await systemService.createNotification(notification);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    createNotification,
    refetch: fetchNotifications
  };
}
