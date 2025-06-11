
import { useEffect, useState } from 'react';
import { systemService, SystemMetric } from '@/services/systemService';

export function useSystemMetrics() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<SystemMetric | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial metrics
    fetchMetrics();

    // Generate and record new metrics every 5 seconds
    const metricsInterval = setInterval(async () => {
      const newMetrics = systemService.generateMockMetrics();
      await systemService.recordMetrics(newMetrics);
      
      // Update current metrics display
      const currentMetric: SystemMetric = {
        ...newMetrics,
        id: 'current',
        recorded_at: new Date().toISOString()
      };
      setCurrentMetrics(currentMetric);
      
      // Add to metrics array
      setMetrics(prev => [currentMetric, ...prev.slice(0, 49)]);
    }, 5000);

    return () => {
      clearInterval(metricsInterval);
    };
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const data = await systemService.getRecentMetrics();
      setMetrics(data);
      if (data.length > 0) {
        setCurrentMetrics(data[0]);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    currentMetrics,
    loading,
    refetch: fetchMetrics
  };
}
