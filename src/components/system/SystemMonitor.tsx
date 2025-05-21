
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Monitor } from "lucide-react";

interface ProcessInfo {
  id: string;
  name: string;
  cpuUsage: number;
  memoryUsage: number;
  status: 'running' | 'suspended' | 'background';
}

const SystemMonitor: React.FC = () => {
  const [processes, setProcesses] = useState<ProcessInfo[]>([]);
  const [systemResources, setSystemResources] = useState({
    cpuTotal: 0,
    memoryTotal: 0,
    uptime: 0
  });

  // Simulate system resource usage
  useEffect(() => {
    // Initial processes
    setProcesses([
      { id: '1', name: 'System', cpuUsage: 1, memoryUsage: 120, status: 'running' },
      { id: '2', name: 'Explorer', cpuUsage: 0.5, memoryUsage: 85, status: 'running' },
      { id: '3', name: 'Browser', cpuUsage: 12, memoryUsage: 450, status: 'running' },
      { id: '4', name: 'Terminal', cpuUsage: 0.2, memoryUsage: 35, status: 'running' },
      { id: '5', name: 'ChimeraStore', cpuUsage: 0, memoryUsage: 15, status: 'background' },
      { id: '6', name: 'Settings', cpuUsage: 0.1, memoryUsage: 45, status: 'background' },
      { id: '7', name: 'HybridService', cpuUsage: 0.8, memoryUsage: 110, status: 'running' },
      { id: '8', name: 'NetworkManager', cpuUsage: 0.3, memoryUsage: 65, status: 'running' },
    ]);

    // Update system resources
    const timer = setInterval(() => {
      // Simulate fluctuating system usage
      const randomCpu = 5 + Math.random() * 20; // 5-25%
      const randomMemory = 35 + Math.random() * 15; // 35-50%
      const currentUptime = systemResources.uptime;

      setSystemResources({
        cpuTotal: randomCpu,
        memoryTotal: randomMemory,
        uptime: currentUptime + 1
      });

      // Update process stats randomly
      setProcesses(prev => 
        prev.map(process => ({
          ...process,
          cpuUsage: Math.max(0.1, process.cpuUsage + (Math.random() - 0.5) * 2),
          memoryUsage: Math.max(10, process.memoryUsage + (Math.random() - 0.5) * 10)
        }))
      );
    }, 2000);

    return () => clearInterval(timer);
  }, [systemResources.uptime]);

  // Format uptime to HH:MM:SS
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium mb-3">System Monitor</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="text-sm text-gray-500 mb-1">CPU Usage</div>
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{systemResources.cpuTotal.toFixed(1)}%</div>
            </div>
            <Progress value={systemResources.cpuTotal} className="h-2" />
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="text-sm text-gray-500 mb-1">Memory Usage</div>
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{systemResources.memoryTotal.toFixed(1)}%</div>
            </div>
            <Progress value={systemResources.memoryTotal} className="h-2" />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-500">System Uptime:</span> {formatUptime(systemResources.uptime)}
          </div>
          <div>
            <span className="text-gray-500">Processes:</span> {processes.length}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2 border-b pb-2 text-sm font-medium text-gray-500">
              <div className="w-1/3">Process Name</div>
              <div className="w-1/6 text-right">CPU</div>
              <div className="w-1/6 text-right">Memory</div>
              <div className="w-1/6 text-right">Status</div>
            </div>
            
            {processes.map((process) => (
              <div 
                key={process.id} 
                className="flex items-center justify-between py-2 border-b border-gray-100 text-sm"
              >
                <div className="w-1/3 font-medium">{process.name}</div>
                <div className="w-1/6 text-right">{process.cpuUsage.toFixed(1)}%</div>
                <div className="w-1/6 text-right">{process.memoryUsage.toFixed(0)} MB</div>
                <div className="w-1/6 text-right">
                  <span 
                    className={`inline-block w-2 h-2 rounded-full mr-1 ${
                      process.status === 'running' ? 'bg-green-500' : 
                      process.status === 'suspended' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                  />
                  {process.status}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SystemMonitor;
