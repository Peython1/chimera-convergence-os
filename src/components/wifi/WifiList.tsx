
import React, { useState, useEffect } from 'react';
import { hybridWifi } from '@/services/wifiService';
import { Network } from '@/components/desktop/types';
import { Wifi, WifiOff, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import WifiConnectDialog from './WifiConnectDialog';
import { Progress } from "@/components/ui/progress";

export const WifiList: React.FC = () => {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [showConnectDialog, setShowConnectDialog] = useState(false);

  const scanNetworks = async () => {
    setLoading(true);
    try {
      const networkList = await hybridWifi.scanNetworks();
      setNetworks(networkList.sort((a, b) => b.signal - a.signal));
    } catch (error) {
      console.error("Failed to scan networks:", error);
      toast.error("Failed to scan for networks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scanNetworks();
    
    // Set up refresh interval
    const intervalId = setInterval(scanNetworks, 10000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleConnectClick = (network: Network) => {
    setSelectedNetwork(network);
    setShowConnectDialog(true);
  };

  const handleDisconnect = async () => {
    try {
      hybridWifi.disconnect();
      await scanNetworks();
      toast.success("Disconnected from network");
    } catch (error) {
      toast.error("Failed to disconnect");
    }
  };

  const getSignalStrength = (signal: number) => {
    if (signal >= 80) return "Excellent";
    if (signal >= 60) return "Good";
    if (signal >= 40) return "Fair";
    if (signal >= 20) return "Poor";
    return "Very Poor";
  };

  const getSecurityIcon = (security: string) => {
    switch (security) {
      case 'WPA3':
        return <Shield className="h-4 w-4 text-green-500" />;
      case 'WPA2':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'WPA':
        return <Shield className="h-4 w-4 text-yellow-500" />;
      case 'WEP':
        return <Shield className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Available Networks</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={scanNetworks}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {loading && (
        <div className="flex flex-col items-center py-8">
          <div className="animate-pulse mb-2">
            <Wifi className="h-10 w-10 text-blue-500" />
          </div>
          <p className="text-sm text-muted-foreground">Scanning for networks...</p>
        </div>
      )}

      {!loading && networks.length === 0 && (
        <div className="flex flex-col items-center py-8">
          <WifiOff className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-muted-foreground">No networks found</p>
        </div>
      )}

      <div className="space-y-2">
        {networks.map((network) => (
          <div
            key={network.ssid}
            className={`p-3 border rounded-lg hover:bg-accent/40 transition-colors ${
              network.connected ? 'bg-accent/20 border-accent' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Wifi 
                    className={`h-5 w-5 ${
                      network.signal > 70 ? 'text-blue-500' : 
                      network.signal > 40 ? 'text-yellow-500' : 
                      'text-red-500'
                    }`} 
                  />
                  {network.isHidden && (
                    <div className="absolute -top-1 -right-1">
                      <Lock className="h-3 w-3 text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{network.isHidden ? "Hidden Network" : network.ssid}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-2">{getSignalStrength(network.signal)}</span>
                    {getSecurityIcon(network.security)}
                    <span className="ml-1">{network.security}</span>
                    {network.frequency && <span className="ml-2">{network.frequency}</span>}
                  </div>
                </div>
              </div>

              <div>
                <Progress value={network.signal} className="w-16 h-2 mb-1" />
                {network.connected ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleConnectClick(network)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedNetwork && (
        <WifiConnectDialog
          network={selectedNetwork}
          open={showConnectDialog}
          onOpenChange={setShowConnectDialog}
          onConnected={scanNetworks}
        />
      )}
    </div>
  );
};

export default WifiList;
