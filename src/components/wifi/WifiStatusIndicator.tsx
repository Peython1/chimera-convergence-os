
import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { hybridWifi } from '@/services/wifiService';
import { NetworkStatus } from '@/components/desktop/types';
import { Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

interface WifiStatusIndicatorProps {
  onOpenWifiManager: () => void;
}

const WifiStatusIndicator: React.FC<WifiStatusIndicatorProps> = ({ onOpenWifiManager }) => {
  const [status, setStatus] = useState<NetworkStatus>({ connected: false });
  const [wifiEnabled, setWifiEnabled] = useState(true);

  useEffect(() => {
    // Initial status
    setStatus(hybridWifi.getCurrentConnection());

    // Poll for status updates
    const intervalId = setInterval(() => {
      setStatus(hybridWifi.getCurrentConnection());
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleWifi = () => {
    if (wifiEnabled) {
      // Disable Wi-Fi
      if (status.connected) {
        hybridWifi.disconnect();
      }
      setWifiEnabled(false);
      toast.info("Wi-Fi disabled");
    } else {
      // Enable Wi-Fi
      setWifiEnabled(true);
      hybridWifi.scanNetworks();
      toast.info("Wi-Fi enabled");
    }
  };

  const handleDisconnect = () => {
    hybridWifi.disconnect();
    setStatus({ connected: false });
    toast.success("Disconnected from network");
  };

  // Get signal quality text
  const getSignalQuality = (signal?: number) => {
    if (!signal) return "Unknown";
    if (signal >= 80) return "Excellent";
    if (signal >= 60) return "Good";
    if (signal >= 40) return "Fair";
    return "Poor";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200">
          {wifiEnabled ? (
            <Wifi size={16} className={status.connected ? "text-blue-600" : "text-gray-600"} />
          ) : (
            <WifiOff size={16} className="text-gray-600" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Wi-Fi</h3>
            <Switch checked={wifiEnabled} onCheckedChange={toggleWifi} />
          </div>

          {wifiEnabled && (
            <>
              {status.connected && status.network ? (
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{status.network.ssid}</div>
                      <div className="text-sm text-muted-foreground">
                        {getSignalQuality(status.network.signal)} signal
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleDisconnect}>
                      Disconnect
                    </Button>
                  </div>

                  {status.details && (
                    <div className="mt-2 pt-2 border-t text-xs text-gray-600">
                      <div className="grid grid-cols-2 gap-1">
                        <span>IP Address:</span>
                        <span className="font-mono">{status.details.ip}</span>
                        
                        {status.details.speed && (
                          <>
                            <span>Speed:</span>
                            <span>{status.details.speed}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-600 italic">
                  Not connected to any network
                </div>
              )}

              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={onOpenWifiManager}
                >
                  <Wifi className="mr-2 h-4 w-4" />
                  Open Wi-Fi Manager
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WifiStatusIndicator;
