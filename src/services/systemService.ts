
import { supabase } from '@/integrations/supabase/client';

export interface SystemConfig {
  id: string;
  key: string;
  value: any;
  created_at: string;
  updated_at: string;
}

export interface SystemMetric {
  id: string;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_usage: number;
  temperature: number;
  recorded_at: string;
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high';
  category: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

class SystemService {
  async getConfig(key: string): Promise<any> {
    const { data, error } = await supabase
      .from('system_config')
      .select('value')
      .eq('key', key)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching config:', error);
      return null;
    }

    return data?.value || null;
  }

  async setConfig(key: string, value: any): Promise<void> {
    const { error } = await supabase
      .from('system_config')
      .upsert({ 
        key, 
        value,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error setting config:', error);
      throw error;
    }
  }

  async recordMetrics(metrics: Omit<SystemMetric, 'id' | 'recorded_at'>): Promise<void> {
    const { error } = await supabase
      .from('system_metrics')
      .insert({
        ...metrics,
        recorded_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error recording metrics:', error);
    }
  }

  async getRecentMetrics(limit: number = 50): Promise<SystemMetric[]> {
    const { data, error } = await supabase
      .from('system_metrics')
      .select('*')
      .order('recorded_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching metrics:', error);
      return [];
    }

    return data || [];
  }

  async createNotification(notification: Omit<NotificationData, 'id' | 'created_at' | 'is_read' | 'is_archived'>): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .insert({
        ...notification,
        is_read: false,
        is_archived: false,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async markNotificationAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  // Simulate system metrics generation
  generateMockMetrics(): Omit<SystemMetric, 'id' | 'recorded_at'> {
    return {
      cpu_usage: Math.random() * 100,
      memory_usage: Math.random() * 100,
      disk_usage: 45 + Math.random() * 30,
      network_usage: Math.random() * 1000,
      temperature: 35 + Math.random() * 30
    };
  }
}

export const systemService = new SystemService();
