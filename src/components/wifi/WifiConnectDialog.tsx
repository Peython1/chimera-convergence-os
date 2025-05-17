
import React, { useState } from 'react';
import { Network } from '@/components/desktop/types';
import { hybridWifi } from '@/services/wifiService';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface WifiConnectDialogProps {
  network: Network;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnected: () => void;
}

const WifiConnectDialog: React.FC<WifiConnectDialogProps> = ({
  network,
  open,
  onOpenChange,
  onConnected
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberNetwork, setRememberNetwork] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    if ((network.security !== 'open' && !password)) {
      toast.error("Please enter a password");
      return;
    }

    setConnecting(true);

    try {
      const result = await hybridWifi.connect(network, password);
      
      if (result.connected) {
        toast.success(`Connected to ${network.ssid}`);
        onConnected();
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to connect to network");
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("An error occurred while connecting");
    } finally {
      setConnecting(false);
    }
  };

  const requiresPassword = network.security !== 'open';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect to {network.isHidden ? "Hidden Network" : network.ssid}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {network.isHidden && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ssid" className="text-right">
                Network Name
              </Label>
              <Input
                id="ssid"
                className="col-span-3"
                value={network.ssid === "Hidden-Network" ? "" : network.ssid}
                placeholder="Enter network name (SSID)"
                disabled={connecting}
              />
            </div>
          )}

          {requiresPassword && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter network password"
                  disabled={connecting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-start-2 col-span-3 flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberNetwork} 
                onCheckedChange={(checked) => setRememberNetwork(checked === true)}
                disabled={connecting}
              />
              <Label htmlFor="remember" className="text-sm">
                Connect automatically
              </Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={connecting}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={connecting}>
            {connecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting
              </>
            ) : (
              "Connect"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WifiConnectDialog;
